# room-reservation

## Booking API

The Booking API provides endpoints for managing bookings for rooms with associated users, dates, and timeslots. This API is built using Node.js and the Express framework, with data storage managed through MongoDB using Mongoose.

### Models

#### Booking

This is the booking model defined in `./models/Booking.js`.

- **RoomID**: The unique identifier for the room the booking is associated with.
- **UserID**: The unique identifier for the user making the booking.
- **BookingDate**: The date for which the booking is made (in string format).
- **TimeslotID**: The unique identifier for the timeslot associated with the booking.

### Routes

#### Create a Booking

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

#### Get All Bookings

- **HTTP Method**: GET
- **Endpoint**: `/`
- **Description**: Retrieve a list of all bookings.
- **Response**: Returns a list of all bookings with room, user, and timeslot details.
- **Error Response**:
  - 500 Internal Server Error: If an error occurs while fetching bookings.

#### Find Bookings by Date

- **HTTP Method**: POST
- **Endpoint**: `/findByDate`
- **Description**: Retrieve bookings for a specified date.
- **Request Body**:
  - `bookingDate`: The date for which to retrieve bookings (in string format).
- **Response**: Returns a list of bookings for the specified date with room, user, and timeslot details.
- **Error Responses**:
  - 400 Bad Request: If the `bookingDate` is not provided in the request body.
  - 500 Internal Server Error: If an error occurs while fetching bookings.

#### Get a Single Booking

- **HTTP Method**: GET
- **Endpoint**: `/:id`
- **Description**: Retrieve a single booking by its unique identifier.
- **Response**: Returns the booking with room, user, and timeslot details.
- **Error Responses**:
  - 404 Not Found: If the booking with the specified ID does not exist.
  - 500 Internal Server Error: If an error occurs while fetching the booking.

#### Update a Booking

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

#### Delete a Booking

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
