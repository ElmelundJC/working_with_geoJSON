const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/userModel');


const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost/OoonoDB'); 
mongoose.Promise = global.Promise;

// // ROUTES - with DB
// app.use('/api/v1/places', require('./routes/places'));

// mongoose.connect(process.env.MONGO_URI, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
// })
// .then(() => console.log(`MongoDB connected successfully!`))
// .catch( (error) => {
//     console.log(error)
//     process.exit(1);
// });


// body parser
app.use(bodyParser.json());


// Dummy User
app.get('/me', (req, res) => {
    res.send({ "Dummy" : "User" });
});



// app.get('/places', (req, res) => {
    
//     res.send(users);
// });

// app.get('/places/:id', (req, res) => {
//     const user = users.find(c => c.id === parseInt(req.params.id));

//     if (!user) res.status(404).send('The user with the given ID was not found')
//     res.send(user);
// });


// Add new user to DB
app.post('/places', (req, res, next) => {
    User.create(req.body).then((user) => {
        res.send(user);
    }).catch(next);
});

// app.patch('/api/places/:id', (req, res) => {
//     const user = users.find(c => c.id === parseInt(req.params.id));
//     if (!user) return res.status(404).send('The user with the given ID was not found.');
//     user.id = users.length; // maybe not implement this line. since we dont want to update the userID.
//     user.name = req.body.name;
//     // user.geoJSON = req.body.geoJSON;
//     res.send(user);
// });

// app.delete('/api/places/:id', (req, res) => {
//     const user = users.find(c => c.id === parseInt(req.params.id));

//     const index = users.indexOf(user);
//     users.splice(index, 1);

//     res.send(user);
// });


// error handling middleware
app.use((err, req, res, next) => {
    //console.log(err);
    res.status(422).send({ error: err.message });
});

const server = app.listen(process.env.PORT || 8080, (error) => {
if (error) {
    console.log("Something went wrong: ", error);
}
    console.log(`Server is running on port: `, server.address().port);
});