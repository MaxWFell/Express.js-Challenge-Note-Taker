// Require the 'express' module and create a router instance
const serverRouter = require("express").Router();

// Require the 'path' module
const directoryPath = require("path");

// Route for the index.html file
serverRouter.get("/", (request, response) => {
    response.sendFile(directoryPath.join(__dirname, "../../public/index.html"));
});

// Route for the notes.html file
serverRouter.get("/notes", (request, response) => {
    response.sendFile(directoryPath.join(__dirname, "../../public/notes.html"));
});

// Export the router for use in other modules
module.exports = serverRouter;
