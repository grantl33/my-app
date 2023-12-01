export function isBlank(value) {
    return value === null || value === undefined || `${value}`.trim() === "";
}

export function isNotBlank(value) {
    return !isBlank(value);
}

export function getTodaysDate() {
    const today = new Date();
    return `${today.getFullYear()}-${zeroPad(today.getMonth() + 1)}-${zeroPad(today.getDate())}`;
}

export function getTodaysDatetime() {
    const today = new Date();
    const timeStr = (`${zeroPad(today.getHours())}:${zeroPad(today.getMinutes())}:00`)
    return `${getTodaysDate()} ${timeStr}`;
}

export function zeroPad(value) {
    value = `0${value}`;
    return value.substring(value.length - 2);
}