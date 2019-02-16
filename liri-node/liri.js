//requires .env
require("dotenv").config();

//requires key.js file
var keys = require("./keys.js");

//require moment package
var moment = require("moment");

//require file systems
var fs = require("fs");

//require axios package
var axios = require("axios");

//start spotify
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

//user input
var userInput = process.argv[2];
var response = process.argv[3];



