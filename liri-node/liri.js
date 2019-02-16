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
var spotify = new Spotify(keys.spotify);




