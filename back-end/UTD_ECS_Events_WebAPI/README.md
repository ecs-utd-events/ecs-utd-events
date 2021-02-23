# Back-End

## API Documentation
### Events
#### Data Model
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
        "string",
        "ACM"
    ],
    "lastUpdated": "DateTime"
}
```
#### Controller
| Command  | Method | Route | Description |
| ------------- | ------------- | ------------- | ------------- |
| Create  | POST  | /api/events | Create an event. Event must be specified as JSON in body of request (id not required). Id returned on successful POST |
| Find all | GET  | /api/events/all | Retrieve all events in the database |
| Find single  | GET  | /api/events/{event_id} | Retrieves the event with id {event_id} |
| Delete  | DELETE  | /api/events/{event_id} | Deletes the event with id {event_id} |


### Organizations
#### Data Model
```
{
    "slug": "string",
    "name": "string",
    "shortName": "string",
    "website": "string",
    "description": "string",
    "socialMedia": {
        "key:string": "value:string"
        "facebook": "fb",
        "twitter": "tw"
    }
}
```
Note: ```slug``` is the Id for an Organization object
#### Controller
| Command  | Method | Route | Description |
| ------------- | ------------- | ------------- | ------------- |
| Create  | POST  | /api/orgs | Create an organization. Organization must be specified as JSON in body of request (slug REQUIRED). Id (slug) returned on successful POST |
| Find all | GET  | /api/orgs | Retrieve all organizations in the database |
| Delete  | DELETE  | /api/orgs/{org_slug} | Deletes the organization with id {org_slug} |


## Running on local without Visual Studio
### Prerequisites
First you'll want to ensure you have .NET Core downloaded. You will need at least version 3.1+

You can check your version by running: `dotnet --version`

Download **.NET Core** from here: https://dotnet.microsoft.com/download

### Find the file to run
Whenever the back-end team makes changes and runs their code in Visual Studio they are actually creating build files which we will use to run the code directly rather than recompiling it.

You'll find the file we want to run in the following location: `utd-ecs-events/back-end/UTD_ECS_Events_WebAPI/UTD_ECS_Events_WebAPI/bin/Debug/netcoreapp3.1/UTD_ECS_Events_WebAPI.dll`

Once you find this file you'll want to copy either a relative path or full path and simply run: `dotnet <insert_filepath>`

### Check with Postman
The application will be running at the following URL: **http:localhost:80/**

You can now send requests using [Postman](https://www.postman.com/downloads/).

You can currently (as of 02/18/21 @ 11:27:59 PM) send a GET, POST, or DELETE request to **http:localhost:80/api/events**

If you simply want to check the GET request you can also use any internet browser.
