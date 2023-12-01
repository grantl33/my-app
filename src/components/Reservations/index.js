import { useEffect, useState } from "react";
import "./styles.css";
import {
    isNotBlank,
    getTodaysDate,
    getTodaysDatetime,
} from "../../utils";
import LoadingSpinner from "../LoadingSpinner";
import chevronup from "../../assets/chevron-up.svg";
import chevrondown from "../../assets/chevron-down.svg";
import trash from "../../assets/trash3-fill.svg";

const OCCASIONS = [
    "Birthday",
    "Anniversary",
    "Celebration",
    "Team Gathering",
    "Other",
]
function Reservations(props) {
    const {
        availableTimes,
        dateChangeHandler,
        submitReservationHandler,
        loadingAvailableTimes,
        guestReservations,
        loadingGuestReservations,
        deleteReservationHandler,
        deletingReservation,
        deletingReservationId
    } = props;
    const todaysDate = getTodaysDate();
    const [resDate, setResDate] = useState(todaysDate);
    const [resTime, setResTime] = useState(null);
    const [resGuests, setResGuests] = useState(2);
    const [resOccasion, setResOccasion] = useState(OCCASIONS[0]);
    const [valid, setValid] = useState(false);
    const [showReservationList, setShowReservationListVisible] = useState(false);

    useEffect(() => {
        const firstTime = availableTimes !== null && availableTimes.length > 0
            ? availableTimes[0].ReservationTime : null;
        setResTime(firstTime);
    }, [availableTimes]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const reservationData = {
            ReservationDatetime: `${resDate} ${resTime}`,
            Guests: resGuests,
            Occasion: resOccasion,
            CreatedOn: getTodaysDatetime()
        }
        submitReservationHandler(reservationData);
    }

    const handleToggleReservations = (e) => {
        setShowReservationListVisible(!showReservationList);
        e.preventDefault();
    }

    useEffect(() => {
        const allFieldsHaveValues = isNotBlank(resDate) &&
            isNotBlank(resTime) &&
            resGuests > 0 &&
            isNotBlank(resOccasion);
        setValid(allFieldsHaveValues);
    }, [resDate, resTime, resGuests, resOccasion]);

    return (
        <div className="reservations">
            <div className="reservations-container">
                <div className="reservations-form">
                    <h2>Make a Reservation</h2>
                    <form>
                        <div className="form-row">
                            <label htmlFor="res-date">
                                <span className="step-number">1</span> Choose date
                            </label>
                            <input type="date" id="res-date"
                                data-testid="res-date"
                                defaultValue={resDate}
                                onChange={(e) => {
                                    const selectedDate = e.target.value;
                                    setResDate(selectedDate);
                                    dateChangeHandler(selectedDate);
                                }} />
                        </div>
                        <div className="form-row">
                            <label htmlFor="res-time">
                                <span className="step-number">2</span>
                                Choose time
                            </label>
                            <select id="res-time"
                                data-testid="res-time"
                                defaultValue={resTime}
                                onChange={(e) =>
                                    setResTime(e.target.value)
                                }>
                                <option key={-1} data-testid="res-time-option" disabled>Please Select</option>
                                {availableTimes && availableTimes.map((item) => {
                                    const datetimeParts = item.ReservationDatetime.split("T");
                                    const timeParts = datetimeParts[1].split(":");
                                    const timeString = `${timeParts[0]}:${timeParts[1]}`
                                    return (
                                        <option key={item.Id} data-testid="res-time-option">{timeString}</option>
                                    )
                                })}
                            </select>
                            {(loadingAvailableTimes) && <LoadingSpinner showText />}
                        </div>
                        <div className="form-row">
                            <label htmlFor="guests">
                                <span className="step-number">3</span>
                                Number of guests
                            </label>
                            <input type="number" placeholder="1" min="1" max="10" id="guests" defaultValue={resGuests} onChange={(e) =>
                                setResGuests(e.target.value)
                            } />
                        </div>
                        <div className="form-row">
                            <label htmlFor="occasion">
                                <span className="step-number">4</span>
                                Occasion
                            </label>
                            <select id="occasion" defaultValue={resOccasion} onChange={(e) =>
                                setResOccasion(e.target.value)
                            }>
                                {OCCASIONS.map((item) =>
                                    <option key={item}>{item}</option>
                                )}
                            </select>
                        </div>
                        <div className="form-row">
                            <input type="submit" value="Make reservation"
                                disabled={!valid}
                                onClick={handleSubmit} />
                        </div>
                    </form>
                </div>
            </div>
            <div className="reservations-container">
                <div className="reservations-list-header">
                    <h2>Existing Reservations</h2>
                    <img src={(showReservationList) ? chevronup : chevrondown}
                        className="toggleicon"
                        onClick={handleToggleReservations}
                        alt="" />
                </div>
                <div className="reservations-list">
                    {showReservationList &&
                        <>
                            {loadingGuestReservations && <LoadingSpinner showText />}
                            {!loadingGuestReservations &&
                                <div className="reservations-list-row header">
                                    <div>Id</div>
                                    <div>Date</div>
                                    <div>Time</div>
                                    <div>Guests</div>
                                    <div>Occasion</div>
                                    <div></div>
                                </div>
                            }
                            {(!loadingGuestReservations && guestReservations.length === 0) &&
                                <div className="emptyset">
                                    <span>No reservations.</span>
                                </div>
                            }
                            {(!loadingGuestReservations && guestReservations.length > 0) && guestReservations.map((item) =>
                                <div className="reservations-list-row data" key={item.Id}>
                                    <div>{item.Id}</div>
                                    <div>{item.ReservationDate}</div>
                                    <div>{item.ReservationTime}</div>
                                    <div>{item.Guests}</div>
                                    <div>{item.Occasion}</div>
                                    <div>
                                        {(deletingReservation && deletingReservationId === item.Id)
                                            && <><LoadingSpinner /></>}
                                        {(!deletingReservation || deletingReservationId !== item.Id)
                                            && <img src={trash} alt=""
                                                className="delete-icon"
                                                onClick={(e) => {
                                                    deleteReservationHandler(item.Id)
                                                }} />}
                                    </div>
                                </div>
                            )}
                        </>
                    }
                </div>
            </div>
            )
        </div>)
}

export default Reservations;