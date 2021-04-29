// Standard function to get just the time from a DateTime object with AM/PM attached
export function getFormattedTime(time) {
    return new Date(time).toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
}

//form control date format: yyyy-mm-dd
// NOT USED: once a simple solution to convert a dateString to yyyy-mm-dd, replaced with getFormattedDate
export function getEventCardFormattedDate(date) {
    var eventCardFormattedDate = date.substring(0, 10);
    return eventCardFormattedDate;
}

// NOT USED: replaced by getFormattedTime
export function getEventCardFormattedTime(date) {
    return new Date(date).toLocaleTimeString('en-US', { hour12: false }).replace(/(.*)\D\d+/, '$1');
}

// Same as getFormattedDate() except ALWAYS displays output in CST 
// used to set the Form.Control date pickers on the edit events page
// outputs yyyy-mm-dd
export function getCSTFormattedDate(date) {
    if(date == null || date === '') return null
    var CSTDateString = new Date(date).toLocaleDateString('en-US', { timeZone: 'America/Chicago', day: '2-digit', month: '2-digit', year: 'numeric' });
    const regex = /(\d{2})\/(\d{2})\/(\d{4})/gm;
    const match = regex.exec(CSTDateString);
    return `${match[3]}-${match[1]}-${match[2]}`
}

// formats DateTime objects for use as default value with Form.Control datepicker
// outputs yyyy-mm-dd
export function getFormattedDate(date) {
    if(date == null || date === '') return null
    var dateString = new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })
    const regex = /(\d{2})\/(\d{2})\/(\d{4})/gm;
    const match = regex.exec(dateString);
    return `${match[3]}-${match[1]}-${match[2]}`
}

// Same as getFormattedTime() except ALWAYS displays output in CST 
// used to set the Form.Control time pickers 
export function getCSTFormattedTime(date) {
    if(date == null || date === '') return null
    return new Date(date).toLocaleTimeString('en-US', { hour12: false, timeZone: 'America/Chicago' }).replace(/(.*)\D\d+/, '$1');
}

// get the CURRENT time and format it correctly for the Back end
// used to auto fill the lastUpdated field when creating or updating an event
export function lastUpdatedToISO() {
    return (new Date()).toISOString().split('.')[0] + "Z"
}

// This function takes a date and returns it in the format expected by the Backend
// for the GET call with start and end times
export function getAPIFormattedISOString(date) {
    return date.toISOString().split('.')[0] + "Z"
}

// The event card has separate inputs for Date, startTime and endTime
// This function takes the Date and one of the times (generally startTime) and creates an ISO-formatted string
// used when saving/editing events in admin portal
export function eventCardFormatToISO(date, time) {
    if(date == null || date === '' || time == null || time === '') return null
    var CSTDateTime = date + 'T' + time;
    var CSTDate = new Date(CSTDateTime)
    if (CSTDate.isDstObserved()) {
        CSTDateTime = CSTDateTime.concat('-05:00');
    } else {
        CSTDateTime = CSTDateTime.concat('-06:00');
    }
    return (new Date(CSTDateTime)).toISOString().split('.')[0] + "Z"
}

// Helper function to check two different times of the year and see which one applies right now
Date.prototype.stdTimezoneOffset = function () {
    var jan = new Date(this.getFullYear(), 0, 1);
    var jul = new Date(this.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}

// Helper function to return boolean for whether it is daylight savings or not
Date.prototype.isDstObserved = function () {
    return this.getTimezoneOffset() < this.stdTimezoneOffset();
}

// This function is to format our lastUpdated string used mainly on the Event Info Card on the home page
export function lastUpdatedToString(time) {
    var lastUpdatedUnixTime = Date.parse(time);
    // difference in milliseconds
    var milliDiff = Date.now() - lastUpdatedUnixTime;
    var minutes = Math.floor(milliDiff / 60000);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);
    var months = Math.floor(days / 30);
    var years = Math.floor(months / 12);

    if (minutes === 1)
        return '1 minute ago.'
    else if (minutes < 60)
        return String(minutes) + ' minutes ago.'
    else if (hours < 24)
        return String(hours) + ' hours ago.'
    else if (days < 30)
        return String(days) + ' days ago.'
    else if (months < 12)
        return String(months) + ' months ago.'
    else
        return String(years) + ' years ago.'

}