const express = require('express');
const app = express();

app.use(express.json());

let users = [
    {
        id: 1,
        name: "Lars",
        // GEOJSON
    },
    {
        id: 2,
        name: "Bob",
        //GEOJSON
    }
]

app.get('/me', (req, res) => {
    res.send({ "Dummy" : "User" });
});

app.get('/places', (req, res) => {
    res.send(users);
});

app.get('/places/:id', (req, res) => {
    const user = users.find(c => c.id === parseInt(req.params.id));

    if (!user) res.status(404).send('The user with the given ID was not found')
    res.send(user);
});

app.post('/places', (req, res) => {
    const user = {
        id: users.length + 1,
        name: req.body.name,
        // GEOJSON
    }

    users.push(user);
    res.send(user);
});

app.patch('/places/:id', (req, res) => {
    const user = users.find(c => c.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('The user with the given ID was not found.');
    user.id = users.length; // maybe not implement this line. since we dont want to update the userID.
    user.name = req.body.name;
    // user.geoJSON = req.body.geoJSON;
    res.send(user);
});

app.delete('/places/:id', (req, res) => {
    const user = users.find(c => c.id === parseInt(req.params.id));

    const index = users.indexOf(user);
    users.splice(index, 1);

    res.send(user);
});




const server = app.listen(process.env.PORT || 8080, (error) => {
if (error) {
    console.log("Something went wrong: ", error);
}
    console.log(`Server is running on port: `, server.address().port);
});