import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Reservations from "./components/Reservations";
import { useReducer } from "react";

export const WEEKEND_AVAILABLE_TIMES = [
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00"
];

export const WEEKDAY_AVAILABLE_TIMES = [
    "18:00",
    "19:00",
    "20:00",
    "21:00",
];

// Available times are determined by whether it is a weekend
function getAvailableTimes(dateObj) {
    const dayOfWeek = dateObj.getDay();
    const isWeekend = (dayOfWeek === 6 || dayOfWeek === 0);
    return {
        availableTimes: (isWeekend)
            ? WEEKEND_AVAILABLE_TIMES
            : WEEKDAY_AVAILABLE_TIMES
    }
}
// Initial value will be based on today's date
function initializeTimes() {
    return getAvailableTimes(new Date());
}
// This is the reducer logic and there is an action to updateTimes 
// whenever the selectedDate changes
function updateTimes(state, action) {
    switch (action.type) {
        case "updateTimes":
            // date value format: "yyyy-mm-dd"
            const dateParts = action.selectedDate.split("-");
            const dateObj = new Date();
            dateObj.setDate(dateParts[2]);
            dateObj.setMonth(dateParts[1] - 1);
            dateObj.setFullYear(dateParts[0]);
            const updatedValues = getAvailableTimes(dateObj);
            const returnObj = {
                ...state,
                ...updatedValues
            };
            return returnObj;
        default:
            throw new Error(`Unknown action: ${action.type}`);
    }
}
function Main() {
    const [main, dispatch] = useReducer(updateTimes, initializeTimes());
    const { availableTimes } = main;

    return (
        <main>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/reservations" element={
                    <Reservations
                        availableTimes={availableTimes}
                        dispatch={dispatch}
                    />} />
            </Routes>
        </main>
    )
}
export default Main;