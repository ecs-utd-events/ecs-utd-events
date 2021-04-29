# API Documentation
All API calls go through the base URL `https://ecsutdevents.azurewebsites.net/`. For example, you can GET all events by visiting or using an HTTP GET request on `https://ecsutdevents.azurewebsites.net/api/events/all`.

!!! note
    All times are stored server-side in UTC. Convert them to your local time zone.

!!! note
    You must have proper cloud firestore authentication headers to perform POST, PUT, or DELETE requests. We do not currently have plans to allow organizations access to these headers, as it may introduce a security vulnerability.

## Events
### Data Model
```
{
    "id": "string",
    "title": "string",
    "location": "string",
    "link": "string",
    "startTime": "DateTime",
    "endTime": "DateTime",
    "description": "string",
    "orgs": [
        "org_slug: string",
        "ACM"
    ],
    "tags": [
        "name: string",
        "combinatorial-graph-algorithms"
    ],
    "lastUpdated": "DateTime"
}
```
where `DateTime` is a string of the form ``"yyyy-mm-ddThh:mm:ssZ"`` (UTC time).

### Controller
|Command|	Method|	Route|	Description|
|-------|-------|------|-------------|
|Create|	POST|	`/api/events`|	Create an event. Event must be specified as JSON in **body** of request (`id` not required). `id` returned on successful POST|
|Find all|	GET|	`/api/events/all`|	Retrieve all events in the database|
|Find single|	GET|	`/api/events/{event_id}`|	Retrieves the event with id `{event_id}`|
|Find all events by an org| GET| `/api/events/org={org_slug}`| Retrieves events where at least one of the orgs matches `{org_slug}`|
|Find events within date range| GET| `/api/events/date/start={startTime}&end={endTime}`| Get all events within a specific date range, must provide both `startTime` and `endTime` in the following format: `"yyyy-mm-ddThh:mm:ssZ"`. You can supply "none" to ONE of the variables to fallback to a default that encapsulates all past or future events.|
|Update|	PUT|	`/api/events`|	Update an event. **All fields of the event must be specified as JSON in body of request (INCLUDING id)**. `id` returned on successful PUT|
|Delete|	DELETE|	`/api/events/{event_id}`|	Deletes the event with id `{event_id}`|

<br/>

## Organizations
### Data Model
```
{
    "uId": "string",
    "slug": "string",
    "name": "string",
    "shortName": "string",
    "website": "string",
    "description": "string",
    "imageUrl": "string"
    "socialMedia": {
        "key:string": "value:string"
        "facebook": "fb",
        "twitter": "tw"
    }
}
```

!!! note
    `uId` is the `id` of the organization. This must be the same `uId` received after logging in.

### Controller
|Command|	Method|	Route|	Description|
|-------|-------|------|-------------|
|Create|	POST|	`/api/orgs`|	Create an organization. Organization must be specified as JSON in **body** of request (**`uId` REQUIRED**). `uId` returned on successful POST|
|Find all|	GET|	`/api/orgs/all`	|Retrieve all organizations in the database|
|Find single by uid|	GET|	`/api/orgs/{org_id}`	|Retrieve the organization with id `{org_id}`|
|Find single by slug|	GET|	`/api/orgs/slug={org_slug}`	|Retrieve the organization with slug `{org_slug}`|
|Update|	PUT|	`/api/orgs`|	Update an organization. **All fields of organization must be specified as JSON in body (`uId` REQUIRED**). `uId` returned on successful PUT|
|Delete|	DELETE|	/api/orgs/{org_uId}|	Deletes the organization with id `{org_uId}`|

<br>

## Tags
### Data Model
```
{
    "id": "string",
    "name": "string"
}
```

### Controller
|Command|	Method|	Route|	Description|
|-------|-------|------|-------------|
|Create|	POST|	`/api/tags`|	Create a tag. Tag must be specified as JSON in **body** of request (id not required). `id` returned on successful POST|
|Find all|	GET|	`/api/tags/all`	|Retrieve all tags in the database|
|Update|	PUT|	`/api/tags`|	Update a tag. **Id and name of tag must be specified as JSON in body (Id REQUIRED**). `id` returned on successful PUT|
|Delete|	DELETE|	`/api/tags/{tag_id}`|	Deletes the tag with id `{tag_id}`|

<br>
