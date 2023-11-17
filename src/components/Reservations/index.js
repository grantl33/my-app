import { useState } from "react";
import "./styles.css";

const OCCASIONS = [
    "Birthday",
    "Anniversary"
]
function Reservations(props) {
    const {
        availableTimes,
        dispatch
    } = props;
    const todaysDate = getTodaysDate();
    const [resDate, setResDate] = useState(todaysDate);
    const [resTime, setResTime] = useState(availableTimes[0]);
    const [resGuests, setResGuests] = useState(2);
    const [resOccasion, setResOccasion] = useState(OCCASIONS[0]);

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div className="reservations">
            <h2>Make a Reservation</h2>
            <form>
                <label htmlFor="res-date">Choose date</label>
                <input type="date" id="res-date"
                    data-testid="res-date"
                    defaultValue={resDate}
                    onChange={(e) => {
                        const selectedDate = e.target.value;
                        setResDate(selectedDate);
                        dispatch({
                            type: "updateTimes",
                            selectedDate: selectedDate
                        })
                    }} />
                <label htmlFor="res-time">Choose time</label>
                <select id="res-time"
                    data-testid="res-time"
                    defaultValue={resTime}
                    onChange={(e) =>
                        setResTime(e.target.value)
                    }>
                    {availableTimes.map((item) =>
                        <option key={item} data-testid="res-time-option">{item}</option>
                    )}
                </select>
                <label htmlFor="guests">Number of guests</label>
                <input type="number" placeholder="1" min="1" max="10" id="guests" defaultValue={resGuests} onChange={(e) =>
                    setResGuests(e.target.value)
                } />
                <label htmlFor="occasion">Occasion</label>
                <select id="occasion" defaultValue={resOccasion} onChange={(e) =>
                    setResOccasion(e.target.value)
                }>
                    {OCCASIONS.map((item) =>
                        <option key={item}>{item}</option>
                    )}
                </select>
                <input type="submit" value="Make Your reservation" onClick={handleSubmit} />
            </form>
        </div>
    )
}

function getTodaysDate() {
    const today = new Date();
    return `${today.getUTCFullYear()}-${today.getUTCMonth() + 1}-${today.getUTCDate()}`;
}

export default Reservations;