# room-reservation

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

### Get All Bookings

- **HTTP Method**: GET
- **Endpoint**: `/`
- **Description**: Retrieve a list of all bookings.
- **Response**: Returns a list of all bookings with room, user, and timeslot details.
- **Error Response**:
  - 500 Internal Server Error: If an error occurs while fetching bookings.

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

### Get a Single Booking

- **HTTP Method**: GET
- **Endpoint**: `/:id`
- **Description**: Retrieve a single booking by its unique identifier.
- **Response**: Returns the booking with room, user, and timeslot details.
- **Error Responses**:
  - 404 Not Found: If the booking with the specified ID does not exist.
  - 500 Internal Server Error: If an error occurs while fetching the booking.

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

### Delete a Booking

- **HTTP Method**: DELETE
- **Endpoint**: `/:id`
- **Description**: Delete a booking by its unique identifier.
- **Response**: Returns a message indicating successful deletion.
- **Error Responses**:
  - 404 Not Found: If the booking with the specified ID does not exist.
  - 500 Internal Server Error: If an error occurs while deleting the booking.

### Error Handling

All endpoints handle errors and return appropriate status codes and error messages when needed.

## Conclusion

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

### Get All Rooms

- **HTTP Method**: GET
- **Endpoint**: `/`
- **Description**: Retrieve a list of all rooms.
- **Response**: Returns a list of all rooms sorted by creation date.
- **Error Response**:
  - 500 Internal Server Error: If an error occurs while fetching rooms.

### Get a Single Room by ID

- **HTTP Method**: GET
- **Endpoint**: `/:id`
- **Description**: Retrieve a single room by its unique identifier.
- **Response**: Returns the room details.
- **Error Responses**:
  - 404 Not Found: If the room with the specified ID does not exist.
  - 500 Internal Server Error: If an error occurs while fetching the room.

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

### Delete a Room by ID

- **HTTP Method**: DELETE
- **Endpoint**: `/:id`
- **Description**: Delete a room by its unique identifier.
- **Response**: Returns a message indicating successful deletion.
- **Error Responses**:
  - 404 Not Found: If the room with the specified ID does not exist.
  - 500 Internal Server Error: If an error occurs while deleting the room.

## Error Handling

All endpoints handle errors and return appropriate status codes and error messages when needed.

## Conclusion

This API allows you to create, retrieve, update, and delete room information, making it a useful tool for managing room details in your application.

