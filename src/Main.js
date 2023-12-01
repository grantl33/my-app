import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import About from "./components/About";
import Menu from "./components/Menu";
import Login from "./components/Login";
import Reservations from "./components/Reservations";
import { useEffect, useReducer } from "react";
import { isNotBlank } from "./utils";

function getAPI(entityName, entityId) {
    const baseUrl = (window.location.hostname === "localhost")
        ? "http://localhost:4280" // dev server
        : ""
    return (isNotBlank(entityId))
        ? `${baseUrl}/data-api/rest/${entityName}/Id/${entityId}`
        : `${baseUrl}/data-api/rest/${entityName}`;
}

// Main reducer logic
const mainReducer = (state, action) => {
    switch (action.type) {
        case "setLoadingAvailableTimes":
            const returnObj = {
                ...state,
                ...{
                    loadingAvailableTimes: action.loadingAvailableTimes
                }
            };
            return returnObj;
        case "setAvailableTimes":
            return {
                ...state,
                ...{
                    availableTimes: action.availableTimes,
                    loadingAvailableTimes: false,
                }
            };
        case "setSavingReservation":
            return {
                ...state,
                ...{
                    savingReservation: action.savingReservation,
                }
            };
        case "setGuestReservations":
            return {
                ...state,
                ...{
                    guestReservations: action.guestReservations,
                    loadingGuestReservations: false,
                }
            };
        case "setLoadingGuestReservations":
            return {
                ...state,
                ...{
                    loadingGuestReservations: action.loadingGuestReservations,
                }
            };
        case "setDeletingReservation":
            return {
                ...state,
                ...{
                    deletingReservation: action.deletingReservation,
                    deletingReservationId: action.deletingReservationId
                }
            };

        default:
            throw new Error(`Unknown action: ${action.type}`);
    }
}

function Main() {
    const [main, dispatch] = useReducer(mainReducer, {
        availableTimes: [],
        loadingAvailableTimes: false,
        savingReservation: false,
        guestReservations: [],
        loadingGuestReservations: false,
        deletingReservation: false,
        deletingReservationId: null
    });
    const {
        availableTimes,
        loadingAvailableTimes,
        savingReservation,
        loadingGuestReservations,
        guestReservations,
        deletingReservation,
        deletingReservationId
    } = main;

    useEffect(() => {
        loadAvailableReservations();
        loadGuestReservations();
    }, []);

    const loadAvailableReservations = (selectedDate) => {
        // load available reservations from database and set via reducer
        dispatch({
            type: "setLoadingAvailableTimes",
            loadingAvailableTimes: true
        });

        fetch(getAPI("Reservations"))
            .then((response) => response.json())
            .then((jsonData) => {
                // usually the api would return the filtered results
                const availableReservations = jsonData.value || [];
                const availableReservationDates = availableReservations.map((reservation) => {
                    const datetimeParts = reservation.ReservationDatetime.split("T");
                    return {
                        ...reservation,
                        ...{
                            ReservationDate: datetimeParts[0],
                            ReservationTime: datetimeParts[1]
                        }
                    }
                });
                const availableTimes = availableReservationDates.filter((reservationObj) => {
                    return reservationObj.ReservationDate === selectedDate;
                }).sort((a, b) => {
                    return a < b ? -1 : 1
                });
                dispatch({
                    type: "setAvailableTimes",
                    availableTimes
                });
            })
            .catch((error) => console.log(error));
    }


    const loadGuestReservations = () => {
        // load existing reservations from database and set via reducer
        dispatch({
            type: "setLoadingGuestReservations",
            loadingGuestReservations: true
        });

        fetch(getAPI("GuestReservations"))
            .then((response) => response.json())
            .then((jsonData) => {
                // usually the api would return the filtered results
                const guestReservationsData = jsonData.value || [];
                const guestReservations = guestReservationsData.map((reservation) => {
                    const datetimeParts = reservation.ReservationDatetime.split("T");
                    const timeParts = datetimeParts[1].split(":");
                    return {
                        ...reservation,
                        ...{
                            ReservationDate: datetimeParts[0],
                            ReservationTime: `${timeParts[0]}:${timeParts[1]}`
                        }
                    }
                });
                dispatch({
                    type: "setGuestReservations",
                    guestReservations
                });
            })
            .catch((error) => console.log(error));
    }

    const submitReservation = (reservationData) => {
        dispatch({
            type: "setSavingReservation",
            savingReservation: true
        });

        fetch(getAPI("GuestReservations"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reservationData)
        })
            .then((response) => response.json())
            .then((jsonData) => {
                dispatch({
                    type: "setSavingReservation",
                    savingReservation: false
                });
                if (jsonData.error) {
                    console.log("Error", JSON.stringify(jsonData.error));
                    throw new Error();
                }
                alert("Your reservation is confirmed, thank you!");
                loadGuestReservations();
            })
            .catch((error) => {
                console.log(error);
                alert("There was an error saving your reservation, please try again.");
            });
    }

    const deleteReservation = (reservationId) => {
        dispatch({
            type: "setDeletingReservation",
            deletingReservation: true,
            deletingReservationId: reservationId
        });

        fetch(getAPI("GuestReservations", reservationId), {
            method: "DELETE"
        })
            .then((response) => {
                dispatch({
                    type: "setDeletingReservation",
                    deletingReservation: false,
                    deletingReservationId: null
                });
                if (!response.ok) {
                    console.log("Error", JSON.stringify(response));
                    throw new Error();
                }
                alert("Your reservation has been deleted.");
                loadGuestReservations();
            })
            .catch((error) => {
                console.log(error);
                alert("There was an error deleting your reservation, please try again.");
            });
    }

    return (
        <main>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<About />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/reservations" element={
                    <Reservations
                        availableTimes={availableTimes}
                        dateChangeHandler={loadAvailableReservations}
                        submitReservationHandler={submitReservation}
                        deleteReservationHandler={deleteReservation}
                        loadingAvailableTimes={loadingAvailableTimes}
                        savingReservation={savingReservation}
                        guestReservations={guestReservations}
                        loadingGuestReservations={loadingGuestReservations}
                        deletingReservation={deletingReservation}
                        deletingReservationId={deletingReservationId}
                    />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </main>
    )
}
export default Main;