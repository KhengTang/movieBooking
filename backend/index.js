// To connect with your mongoDB database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/', {
    dbName: 'movieBooking',
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => err ? console.log(err) : 
    console.log('Connected to movieBooking database'));

// Schema for users of app
const UserSchema = new mongoose.Schema({
    theaterName: {
        type: String,
    },
    movieName: {
        type: String,
    },
    seatsIndex: {
        type: Array,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
const User = mongoose.model('booking', UserSchema);
User.createIndexes();

// For backend and express
const express = require('express');
const app = express();
const cors = require("cors");
const { Int32 } = require('mongodb');
console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());
app.get("/bookings", (req, resp) => {

    // resp.send("App is Working");
    // You can check backend is working or not by 
    // entering http://loacalhost:5000
    
    // If you see App is working means
    // backend working properly
    User.findOne({}, {}, {sort: {'date' : -1} }, function(err, result) {
        console.log(result.seatsIndex);
        resp.send(result.seatsIndex);
    });
});

app.put("/bookings", async (req, resp) => {
    try {
        const user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        if (result) {
            delete result.password;
            resp.send(req.body);
            console.log(result);
        } else {
            console.log("User already register");
        }

    } catch (e) {
        console.log(e)
        resp.send("Something Went Wrong");
    }
});
app.listen(5000);