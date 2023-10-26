////////////////////////////////////////
//                                    //
//         DEPENDENCIES CONFIG        //
//                                    //
////////////////////////////////////////

require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose')
const cors = require("cors");
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const dbUri = process.env.DBURL;
const app = express();



////////////////////////////////////////
//                                    //
//            MongoDB SETUP           //
//                                    //
////////////////////////////////////////

// app.use(cookieparser())
const corsOptions = {
    // Replace with your client-side URL
    origin: ['http://localhost:3000', 'http://localhost:8080'],
    // Enable credentials (cookies)
    credentials: true,
};
app.use(bodyParser.json());
app.use(cors(corsOptions));

mongoose.connect(dbUri)
    .then(() => {
        app.listen(8080)
        console.log("[DB Config] MongoDB Connected 🥰");
        console.log(`Server started on port ${PORT} 😍`);
    })
    .catch((err) => {
        console.error('🤯 '+err)
    });



////////////////////////////////////////
//                                    //
//               ROUTES               //
//                                    //
////////////////////////////////////////
// const bookingRoutes = require('./routes/bookingRoutes');
const roomRoutes = require('./routes/roomRoutes'); // Include room routes
const timeslotRoutes = require('./routes/timeslotRoutes'); 
const bookingRoutes = require('./routes/bookingRoutes');
const searchRoutes = require('./routes/searchRoutes');
const userRoutes = require('./routes/userRoutes');
// app.use('/api/bookings', bookingRoutes);
app.use('/api/rooms', roomRoutes); // Use the room routes
app.use('/api/timeslots', timeslotRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/users', userRoutes);





////////////////////////////////////////
//                                    //
//               TEST API             //
//                                    //
////////////////////////////////////////

app.get("/ping", (req, res) => {
    res.send('pong!')
});

app.get("/api/home", (req, res) => {
    res.json({ message: "hello" });
});
