require("dotenv").config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

node liri.js spotify-this-song <artist/band name here>`
