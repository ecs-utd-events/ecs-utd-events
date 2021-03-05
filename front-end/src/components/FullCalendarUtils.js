
export const oneDayInMilliseconds = 86400000 - 1000;
export function parseEventsToFullCalendarFormat(eventData) {
  return eventData.map(event => {
    const allDay = new Date(event.endTime) - (new Date(event.startTime)) >= oneDayInMilliseconds ? true : false;
    return {
      id: event.id,
      title: event.title,
      start: event.startTime,
      end: event.endTime,
      allDay: allDay,
      extendedProps: {
        description: event.description,
        org: event.orgs,
        location: event.location,
        link: event.link,
        // default tags until sid implements tags
        tags: event.tags,
        // used for EventInfoCard "last updated"
        lastUpdated: event.lastUpdated
      }
    }
  })
}
