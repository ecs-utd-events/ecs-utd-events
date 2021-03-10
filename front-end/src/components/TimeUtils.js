
export function getFormattedTime(time) {
    return new Date(time).toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
}

//form control date format: yyyy-mm-dd
export function getEventCardFormattedDate(date) {
    var eventCardFormattedDate = date.substring(0, 10);
    return eventCardFormattedDate;
}

export function getEventCardFormattedTime(date) {
    return new Date(date).toLocaleTimeString('en-US', { hour12: false }).replace(/(.*)\D\d+/, '$1');
}
//form control date format: yyyy-mm-dd

export function lastUpdatedToISO() {
    return (new Date()).toISOString().split('.')[0] + "Z"
}

export function eventCardFormatToISO(date, time) {
    var dbFormat = date + 'T' + time;
    return (new Date(dbFormat)).toISOString().split('.')[0] + "Z"
}

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