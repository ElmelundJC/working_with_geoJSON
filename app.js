const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Dummy = require('./models/userModel');


const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost/ooonoDB'); 

// body parser
app.use(bodyParser.json());

// error handling middleware
app.use((err, req, res, next) => {
    //console.log(err);
    res.status(422).send({ error: err.message });
});

// Dummy User
app.get('/me', (req, res) => {
    res.send({ "Dummy" : "User" });
});


// Get all users
app.get('/places', (req, res) => {
    Dummy.find({}).then((dummys) => {
        res.send(dummys)
    })
});

// Get user by ID
app.get('/places/:id', (req, res) => {
    Dummy.findOne({ _id: req.params.id }).then((dummy) => {
        console.log(dummy);
        console.log(`DummyUser with the id ${dummy._id} was found`);
        res.send(dummy);
    });
});

// Get users withing a certain range (lat and lng specified in query-string) - placed on another route
app.get('/near', (req, res, next) => {
    Dummy.aggregate([
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
            },
            distanceField: "dist.calculated",
            maxDistance: 50000,
            spherical: true
          },
        },
      ])
        .then((dummy) => {
          res.send(dummy);
        })
        .catch(next);
});

// Add new user to DB
app.post('/places', (req, res, next) => {
    console.log(req.body);
    Dummy.create(req.body).then((dummy) => {
        res.send(dummy);
    }).catch(next);
});

// Update User 
app.patch('/places/:id', (req, res, next) => {
    Dummy.findByIdAndUpdate({ _id: req.params.id }, req.body).then((dummy) => {
        Dummy.findOne({ _id: req.params.id }).then((dummy) => {
            console.log(dummy);
            res.send(dummy);
        }).catch(next);
    });
});

// Delete user
app.delete('/places/:id', (req, res) => {
    Dummy.findByIdAndRemove({ _id: req.params.id }, req.body).then((dummy) => {
        console.log(dummy);
        console.log(`Dummy user with the name: ${dummy.name} was deleted`);
        res.send(dummy);
    }).catch(next);
});



const server = app.listen(process.env.PORT || 8080, (error) => {
if (error) {
    console.log("Something went wrong: ", error);
}
    console.log(`Server is running on port: `, server.address().port);
});