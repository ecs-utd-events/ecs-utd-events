# Back-End

## Deploying the Backend
asd

## Running backend locally and without Visual Studio
If you just want to run the backend build (not front end) on your local computer, here are some instructions.

### Prerequisites
First you'll want to ensure you have .NET Core downloaded. You will need at least version 3.1 or above.
You can check your version by running: `dotnet --version`.
Download **.NET Core** from [here](https://dotnet.microsoft.com/download).

### Find the file to run
Whenever the back-end team makes changes and runs their code in Visual Studio they are actually creating build files which we will use to run the code directly rather than recompiling it.

You'll find the file we want to run in [this repo](https://github.com/ecs-utd-events/ecs-utd-events) at the following location: `ecs-utd-events/backend_build/bin/Debug/netcoreapp3.1/UTD_ECS_Events_WebAPI.dll`.
Once you find this file you'll want to copy either a relative path or full path and simply run: `dotnet <insert_filepath>` to begin running the program.

### Check with Postman
The application will be running at the following URL: `http:localhost:80/`, and you can now send requests using [Postman](https://www.postman.com/downloads/).
You can currently (as of 02/18/21 @ 11:27:59 PM) send a GET, POST, or DELETE request to `http:localhost:80/api/events`.
If you simply want to check the GET request you can also use any internet browser.
