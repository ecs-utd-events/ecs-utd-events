
// oneDayInMilliseconds calculates the difference needed for 2 dateTime objects to be considered greater than 24 hours
// with a 1s margin of error
export const oneDayInMilliseconds = 86400000 - 1000;

// helper function to format an event from our back-end db to the FullCalendar format
export function parseEventsToFullCalendarFormat(eventData) {
  return eventData.map(event => {

    console.log("hi pretty")
    console.log(typeof event.startTime)
    console.log("EVENT: " + new Date(event.startTime))

    const allDay = new Date(event.endTime) - (new Date(event.startTime)) >= oneDayInMilliseconds ? true : false;
    return {
      id: event.id,
      title: event.title,
      start: event.startTime,
      end: event.endTime,
      allDay: allDay,
      // extendedProps are all properties not used directly by FullCalendar but info we still want readily available
      extendedProps: {
        description: event.description,
        org: event.orgs,
        location: event.location,
        link: event.link,
        tags: event.tags,
        // used for EventInfoCard "last updated"
        lastUpdated: event.lastUpdated
      }
    }
  })
}

// helper function to convert an event from the FullCalendar format back to our back-end db format
export function formatFCEventToDB(event) {
  return {
    id: event.id,
    title: event.title,
    startTime: event.start,
    endTime: event.end,
    description: event.extendedProps.description,
    orgs: event.extendedProps.org,
    location: event.extendedProps.location,
    link: event.extendedProps.link,
    tags: event.extendedProps.tags,
    lastUpdated: event.extendedProps.lastUpdated
  }
}
