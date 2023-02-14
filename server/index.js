const express = require("express");
const ParseServer = require("parse-server").ParseServer;
const app = express();
require("dotenv").config();

const databaseURI = process.env.MONGO_DB_URI;

const server = new ParseServer({
  databaseURI: databaseURI || "mongodb://localhost:27017/dev", // Connection string for your MongoDB database
  cloud: "./cloud/main.js", // Path to your Cloud Code
  appId: "myAppId",
  masterKey: process.env.MASTER_KEY || "myMasterKey", // Keep this key secret!
  fileKey: "optionalFileKey",
  serverURL: "http://localhost:1337/parse", // Don't forget to change to https if needed
  allowClientClassCreation: false,
  allowExpiredAuthDataToken: false,
});

// Start server

// Serve the Parse API on the /parse URL prefix
app.use("/parse", server);

app.listen(1337, function () {
  console.log("parse-server-example running on port 1337.");
});
