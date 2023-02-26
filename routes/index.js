// Require the 'express' module and create a router instance
const serverRouter = require("express").Router();

// Require the HTML and API routes
const htmlHandlers = require("./html");
const apiHandlers = require("./api");

// Use the HTML handler
serverRouter.use("/", htmlHandlers);

// Use the API handler
serverRouter.use("/api", apiHandlers);

// Export the router for use in other modules
module.exports = serverRouter;
