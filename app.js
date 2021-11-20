const express = require('express');
const app = express();

const PORT = 8080;


const server = app.listen(process.env.PORT || 8080, (error) => {
if (error) {
    console.log("Something went wrong: ", error);
}
    console.log(`Server is running on port: `, server.address().port);
});