# SimpleBooking MD
A simple way to book appointments. No login required.

## Install dependencies
1. Clone repo
2. Install Node.js (https://nodejs.org/en/download)
3. Install preferred Java IDE

## Run Webapp
1. From root project folder, go to webapp folder

   ```
   cd simple-booking-webapp
   ```
2. run yarn to install packages

   ```
   yarn
   ```
3. Start frontend server by running

   ```
   yarn dev
   ```
4. Visit webapp on http://localhost:3000

## Run Backend
1. Open `backend` folder inside root project folder in preferred Java IDE
2. Inside IDE, navigate to file `src/main/com.example.backend.BackendApplication.java` and run it
3. Visit backend and test list all function on http://localhost:8080/api/appointments

## List of backend API slugs
1. LIST: http://localhost:8080/api/appointments
2. CREATE: http://localhost:8080/api/appointments/create
   
   Accepts `Content-Type: application/json` body
   
   Sample:
   ```
   {
    "name": "Andy Ang",
    "comments": "Mandatory annual physical examination from workplace",
    "schedule": "2023-12-20T15:00:00",
    "password": "1234"
   }
   ```
   Things to note:
   - schedule time accepts whole hours only (no minutes or seconds)
   - all fields above need to be filled
3. UPDATE: http://localhost:8080/api/appointments/update/{id}
   
   Provide ID of appointment inside `{id}`
   Accepts `Content-Type: application/json` body
   
   Sample:
   ```
   {
    "name": "Andy Ang",
    "comments": "Mandatory annual physical examination from workplace. Changing my comment and schedule",
    "schedule": "2023-12-20T09:00:00",
    "password": "1234"
   }
   ```
   Things to note:
   - schedule time accepts whole hours only (no minutes or seconds)
   - all fields above need to be filled
   - password must match password of the appointment to update
4. DELETE: http://localhost:8080/api/appointments/delete/{id}
   
   Provide ID of appointment inside `{id}`
   Accepts `Content-Type: text/plain` body

   Sample of passing password of above data:
   ```
   1234
   ```
   Things to note:
   - password must match password of the appointment to delete
5. GET: http://localhost:8080/api/appointments/{id}
   
   Provide ID of appointment inside `{id}`
   Returns Appointment data
