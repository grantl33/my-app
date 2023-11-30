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
        : `${baseUrl}/data-api/rest/${entityName}/`;
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
        default:
            throw new Error(`Unknown action: ${action.type}`);
    }
}

function Main() {
    const [main, dispatch] = useReducer(mainReducer, {
        availableTimes: [],
        loadingAvailableTimes: false,
        savingReservation: false
    });
    const {
        availableTimes,
        loadingAvailableTimes,
        savingReservation
    } = main;

    useEffect(() => {
        loadAvailableReservations();
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
                const availableTimes = availableReservations.filter((reservationObj) => {
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

    const submitReservation = (reservationData) => {
        dispatch({
            type: "setSavingReservation",
            savingReservation: true
        });

        fetch(getAPI("MyReservations"), {
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
            })
            .catch((error) => {
                console.log(error);
                alert("There was an error saving your reservation, please try again.");
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
                        loadingAvailableTimes={loadingAvailableTimes}
                        savingReservation={savingReservation}
                    />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </main>
    )
}
export default Main;