# Back-End

## API Documentation
### Events
- Get all events: HTTP GET localhost:XXXXX/api/events/all
- Get single event: HTTP GET localhost:XXXXX/api/events/{event_id}
- Create event: HTTP POST localhost:XXXXX/api/events
  - Event object in JSON format in body of HTTP request (all fields except id)
  - To see fields required for an event object, look at JSON received from HTTP GET
- Delete event: HTTP DELETE localhost:XXXXX/api/events/{event_id}

### Orgs
- Get all orgs: HTTP GET localhost:XXXXX/api/orgs
- Create org: HTTP POST localhost:XXXXX/api/orgs
  - Organization object in JSON format in body of HTTP request (here, slug (id) REQUIRED)
  - To see fields required for an organization object, look at JSON received from HTTP GET
- Delete org: HTTP DELETE localhost:XXXXX/api/events/{org_id}

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
