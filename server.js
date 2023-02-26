// Require the 'express' module
const server = require("express");

// Require all routes from the 'routes' directory
const apiRoutes = require("./routes");

// Require the 'path' module
const directoryPath = require("path");

// Create an instance of the server
const app = server();

// Set the server port
const serverPort = 4000;

// Utilize the JSON middleware
app.use(server.json());

// Utilize the urlencoded middleware
app.use(server.urlencoded({extended: false}));

// Use the static middleware to serve static files from the 'public' directory
app.use(server.static("public"));

// Use all the API routes
app.use(apiRoutes);

// Start the server and listen on the specified port
app.listen(process.env.PORT || serverPort, () => {
    console.log("Server listening on port " + serverPort);
});
