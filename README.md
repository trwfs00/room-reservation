# room-reservation

## Search API Documentation

The Search API provides endpoints for searching available rooms, timeslots, and booking history based on specified criteria. This API is built using Node.js and the Express framework, with data storage managed through MongoDB using Mongoose.

### Routes

#### Search Available Rooms

- **HTTP Method**: POST
- **Endpoint**: `/available-rooms`
- **Description**: Find available rooms for a specific date and timeslot.
- **Request Body**:
  - `date`: The date for which availability is checked (in string format).
  - `timeslotId`: The unique identifier of the timeslot.
- **Response**:
  - Returns a list of available rooms.
- **Error Responses**:
  - 500 Internal Server Error: If an error occurs during the search for available rooms.
- **Example URL**:
  - POST: `localhost:8080/api/search/available-rooms`

### Search Available Timeslots

- **HTTP Method**: POST
- **Endpoint**: `/available-timeslots`
- **Description**: Find available timeslots for a specific date and room.
- **Request Body**:
  - `date`: The date for which availability is checked (in string format).
  - `roomId`: The unique identifier of the room.
- **Response**:
  - Returns a list of available timeslots.
- **Error Responses**:
  - 500 Internal Server Error: If an error occurs during the search for available timeslots.
- **Example URL**:
  - POST: `localhost:8080/api/search/available-timeslots`

### Search Booking History

- **HTTP Method**: POST
- **Endpoint**: `/history`
- **Description**: Retrieve booking history for a specific user.
- **Request Body**:
  - `userId`: The unique identifier of the user.
- **Response**:
  - Returns a list of booking history for the user.
- **Error Responses**:
  - 404 Not Found: If no bookings are found for the user.
  - 500 Internal Server Error: If an error occurs during the search for booking history.
- **Example URL**:
  - POST: `localhost:8080/api/search/history`

### Error Handling

All endpoints handle errors and return appropriate status codes and error messages when needed.

### Conclusion

This API provides search functionality to find available rooms and timeslots based on specific criteria and retrieve booking history for a user, making it a valuable tool for managing reservations and bookings in your application.


## Booking API Documentation

The Booking API provides endpoints for managing bookings for rooms with associated users, dates, and timeslots. This API is built using Node.js and the Express framework, with data storage managed through MongoDB using Mongoose.

### Models

#### Booking

This is the booking model defined in `./models/Booking.js`.

- **RoomID**: The unique identifier for the room the booking is associated with.
- **UserID**: The unique identifier for the user making the booking.
- **BookingDate**: The date for which the booking is made (in string format).
- **TimeslotID**: The unique identifier for the timeslot associated with the booking.

## Routes

### Create a Booking

- **HTTP Method**: POST
- **Endpoint**: `/create`
- **Description**: Create a new booking.
- **Request Body**:
  - `RoomID`: The unique identifier of the room.
  - `UserID`: The unique identifier of the user.
  - `BookingDate`: The date for which the booking is made (in string format).
  - `TimeslotID`: The unique identifier of the timeslot.
- **Response**:
  - If successful, returns the created booking.
- **Error Responses**:
  - 400 Bad Request: If the booking date is in the past or a booking already exists for the same date, timeslot, and room.
  - 500 Internal Server Error: If an error occurs during booking creation.
- **Example URL**:
  - POST: `localhost:8080/api/bookings/create`

### Get All Bookings

- **HTTP Method**: GET
- **Endpoint**: `/`
- **Description**: Retrieve a list of all bookings.
- **Response**: Returns a list of all bookings with room, user, and timeslot details.
- **Error Response**:
  - 500 Internal Server Error: If an error occurs while fetching bookings.
- **Example URL**:
  - GET: `localhost:8080/api/bookings`


### Find Bookings by Date

- **HTTP Method**: POST
- **Endpoint**: `/findByDate`
- **Description**: Retrieve bookings for a specified date.
- **Request Body**:
  - `bookingDate`: The date for which to retrieve bookings (in string format).
- **Response**: Returns a list of bookings for the specified date with room, user, and timeslot details.
- **Error Responses**:
  - 400 Bad Request: If the `bookingDate` is not provided in the request body.
  - 500 Internal Server Error: If an error occurs while fetching bookings.
- **Example URL**:
  - POST: `localhost:8080/api/bookings/findByDate`

### Get a Single Booking

- **HTTP Method**: GET
- **Endpoint**: `/:id`
- **Description**: Retrieve a single booking by its unique identifier.
- **Response**: Returns the booking with room, user, and timeslot details.
- **Error Responses**:
  - 404 Not Found: If the booking with the specified ID does not exist.
  - 500 Internal Server Error: If an error occurs while fetching the booking.
- **Example URL**:
  - GET: `localhost:8080/api/bookings/:id`

### Update a Booking

- **HTTP Method**: PUT
- **Endpoint**: `/:id`
- **Description**: Update a booking by its unique identifier.
- **Request Body**:
  - `RoomID`: The unique identifier of the room.
  - `UserID`: The unique identifier of the user.
  - `Date`: The date for which the booking is made (in string format).
  - `TimeslotID`: The unique identifier of the timeslot.
- **Response**: Returns the updated booking.
- **Error Responses**:
  - 404 Not Found: If the booking with the specified ID does not exist.
  - 500 Internal Server Error: If an error occurs while updating the booking.
- **Example URL**:
  - PUT: `localhost:8080/api/bookings/:id`

### Delete a Booking

- **HTTP Method**: DELETE
- **Endpoint**: `/:id`
- **Description**: Delete a booking by its unique identifier.
- **Response**: Returns a message indicating successful deletion.
- **Error Responses**:
  - 404 Not Found: If the booking with the specified ID does not exist.
  - 500 Internal Server Error: If an error occurs while deleting the booking.
- **Example URL**:
  - DELETE: `localhost:8080/api/bookings/:id`

### Error Handling

All endpoints handle errors and return appropriate status codes and error messages when needed.

### Conclusion

This API allows you to create, retrieve, update, and delete bookings for rooms on specific dates and timeslots. It provides endpoints for various booking-related operations, making it a useful tool for managing reservations and bookings in your application.



## Room API Documentation

The Room API allows you to manage rooms with details such as room number, name, description, capacity, and location. This API is built using Node.js and the Express framework, with data storage handled through MongoDB using Mongoose.

### Models

#### Room

This is the room model defined in `./models/Room.js`.

- **Room_No**: The room number, a unique identifier for the room.
- **RoomName**: The name or title of the room.
- **Description**: A brief description of the room.
- **Capacity**: The maximum capacity of the room, represented as a number.
- **Location**: The location or address of the room.

## Routes

### Create a Room

- **HTTP Method**: POST
- **Endpoint**: `/`
- **Description**: Create a new room.
- **Request Body**:
  - `Room_No`: The room number (unique identifier).
  - `RoomName`: The name or title of the room.
  - `Description`: A brief description of the room.
  - `Capacity`: The maximum capacity of the room.
  - `Location`: The location or address of the room.
- **Response**:
  - If successful, returns the created room.
- **Error Responses**:
  - 500 Internal Server Error: If an error occurs during room creation.
- **Example URL**:
  - POST: `localhost:8080/api/rooms`

### Get All Rooms

- **HTTP Method**: GET
- **Endpoint**: `/`
- **Description**: Retrieve a list of all rooms.
- **Response**: Returns a list of all rooms sorted by creation date.
- **Error Response**:
  - 500 Internal Server Error: If an error occurs while fetching rooms.
- **Example URL**:
  - GET: `localhost:8080/api/rooms`

### Get a Single Room by ID

- **HTTP Method**: GET
- **Endpoint**: `/:id`
- **Description**: Retrieve a single room by its unique identifier.
- **Response**: Returns the room details.
- **Error Responses**:
  - 404 Not Found: If the room with the specified ID does not exist.
  - 500 Internal Server Error: If an error occurs while fetching the room.
- **Example URL**:
  - GET: `localhost:8080/api/rooms/:id`


### Update a Room by ID

- **HTTP Method**: PUT
- **Endpoint**: `/:id`
- **Description**: Update a room by its unique identifier.
- **Request Body**:
  - `Room_No`: The room number (unique identifier).
  - `RoomName`: The name or title of the room.
  - `Description`: A brief description of the room.
  - `Capacity`: The maximum capacity of the room.
  - `Location`: The location or address of the room.
- **Response**: Returns the updated room.
- **Error Responses**:
  - 404 Not Found: If the room with the specified ID does not exist.
  - 500 Internal Server Error: If an error occurs while updating the room.
- **Example URL**:
  - PUT: `localhost:8080/api/rooms/:id`

### Delete a Room by ID

- **HTTP Method**: DELETE
- **Endpoint**: `/:id`
- **Description**: Delete a room by its unique identifier.
- **Response**: Returns a message indicating successful deletion.
- **Error Responses**:
  - 404 Not Found: If the room with the specified ID does not exist.
  - 500 Internal Server Error: If an error occurs while deleting the room.
- **Example URL**:
  - DELETE: `localhost:8080/api/rooms/:id`

### Error Handling

All endpoints handle errors and return appropriate status codes and error messages when needed.

### Conclusion

This API allows you to create, retrieve, update, and delete room information, making it a useful tool for managing room details in your application.


## Timeslot API Documentation

The Timeslot API allows you to manage timeslots with details such as start time and end time. This API is built using Node.js and the Express framework, with data storage managed through MongoDB using Mongoose.

### Models

#### Timeslot

This is the timeslot model defined in `./models/Timeslot.js`.

- **StartTime**: The start time of the timeslot.
- **EndTime**: The end time of the timeslot.

## Routes

### Create a Timeslot

- **HTTP Method**: POST
- **Endpoint**: `/`
- **Description**: Create a new timeslot.
- **Request Body**:
  - `StartTime`: The start time of the timeslot.
  - `EndTime`: The end time of the timeslot.
- **Response**:
  - If successful, returns the created timeslot.
- **Error Responses**:
  - 500 Internal Server Error: If an error occurs during timeslot creation.
- **Example URL**:
  - POST: `localhost:8080/api/timeslots`

### Get All Timeslots

- **HTTP Method**: GET
- **Endpoint**: `/`
- **Description**: Retrieve a list of all timeslots.
- **Response**: Returns a list of all timeslots.
- **Error Response**:
  - 500 Internal Server Error: If an error occurs while fetching timeslots.
- **Example URL**:
  - GET: `localhost:8080/api/timeslots`

### Get a Single Timeslot by ID

- **HTTP Method**: GET
- **Endpoint**: `/:id`
- **Description**: Retrieve a single timeslot by its unique identifier.
- **Response**: Returns the timeslot details.
- **Error Responses**:
  - 404 Not Found: If the timeslot with the specified ID does not exist.
  - 500 Internal Server Error: If an error occurs while fetching the timeslot.
- **Example:
  - GET: `localhost:8080/api/timeslots/:id`

### Update a Timeslot by ID

- **HTTP Method**: PUT
- **Endpoint**: `/:id`
- **Description**: Update a timeslot by its unique identifier.
- **Request Body**:
  - `StartTime`: The start time of the timeslot.
  - `EndTime`: The end time of the timeslot.
- **Response**: Returns the updated timeslot.
- **Error Responses**:
  - 404 Not Found: If the timeslot with the specified ID does not exist.
  - 500 Internal Server Error: If an error occurs while updating the timeslot.
- **Example URL**:
  - PUT: `localhost:8080/api/timeslots/:id`


### Delete a Timeslot by ID

- **HTTP Method**: DELETE
- **Endpoint**: `/:id`
- **Description**: Delete a timeslot by its unique identifier.
- **Response**: Returns a message indicating successful deletion.
- **Error Responses**:
  - 404 Not Found: If the timeslot with the specified ID does not exist.
  - 500 Internal Server Error: If an error occurs while deleting the timeslot.
- **Example URL**:
  - DELETE: `localhost:8080/api/timeslots/:id`

### Error Handling

All endpoints handle errors and return appropriate status codes and error messages when needed.

### Conclusion

This API allows you to create, retrieve, update, and delete timeslots, making it a useful tool for managing time-based information in your application.



## User API Documentation

The User API allows you to manage user accounts with details such as email, password, full name, phone number, and user role. This API is built using Node.js and the Express framework, with data storage managed through MongoDB using Mongoose.

### Models

#### User

This is the user model defined in `./Models/User.js`.

- **Email**: The user's email address.
- **Password**: The user's password (hashed for security).
- **FullName**: The user's full name.
- **Tel**: The user's phone number.
- **Role**: The user's role, with options 'user' and 'admin'.
- **CreatedAt**: The date the user account was created.

## Routes

### Update User Information

- **HTTP Method**: PUT
- **Endpoint**: `/update/:userId`
- **Description**: Update user information, including full name and phone number.
- **Request Parameters**:
  - `userId`: The unique identifier of the user to update.
- **Request Body**:
  - `fullName`: The user's full name.
  - `tel`: The user's phone number.
- **Response**:
  - If successful, returns a message indicating the successful update.
- **Error Responses**:
  - 404 Not Found: If the user with the specified ID does not exist.
  - 500 Internal Server Error: If an error occurs during the update.
- **Example URL**:
  - PUT: `localhost:8080/api/users/update/:userId`

### Get All Users

- **HTTP Method**: GET
- **Endpoint**: `/`
- **Description**: Retrieve a list of all users.
- **Response**: Returns a list of all user accounts.
- **Error Response**:
  - 500 Internal Server Error: If an error occurs while fetching users.
- **Example URL**:
  - GET: `localhost:8080/api/users`

### Error Handling

All endpoints handle errors and return appropriate status codes and error messages when needed.

### Conclusion

This API allows you to create, retrieve, and update user information, making it a useful tool for managing user accounts in your application.

