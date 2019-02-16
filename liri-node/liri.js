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
var uQuery = process.argv[3];

// userInput/uQuery function. userInput uses specific commands to get the response they need.
//uQuerym is the users search parameters which is more flexible.
function userIn(userInput, uQuery){
    switch (userInput) {
        case "concert-this":
            concertThis(uQuery);
            break;
        case "spotify-this-song":
            spotifyThisSong();
            break;
        case "movie-this":
            movieThis();
            break;
        case "do-what-it-says":
            doThis(uQuery);
            break;
            default:
            console.log("better choices please");
    }
}
console.log(uQuery);
userIn(userInput, uQuery);

// concert-this function
function concertThis(uQuery) {
   axios.get("https://rest.bandsintown.com/artists/" + uQuery + "/events?app_id=codingbootcamp")
    .then(function(response) {
        if (true) {
            // CAPTURE DATA
            console.log(response.data.length);
            var userBand = response.data;
            if (userBand.length > 0) {

                for (i = 0; i < 1; i++) {
                    console.log(userBand[i].venue.name);
                    console.log('Location: ' + response.data[i].venue.city);

                    var concertDate = moment(response.data[i].datetime).format("MM/DD/YYYY hh:00 A");
                    console.log('ConcertDate: ' + concertDate + '\n' );
                    

                };
            };
        }
    });
};
//concert this DONE!

//spotify-this-song function
function spotifyThisSong(uQuery) {
    if (!uQuery) {
        uQuery = "The Sign by Ace of Base"
        console.log("The Sign by Ace of Base");
    };
    // search query
    spotify.search({
        type: 'track',
        query: uQuery,
        limit: 1
    }, function (error, data) {
        if (error) {
            return console.log('Error occurred: ' + error);
        }
        var spotDataArr = data.tracks.items;
        for (i = 0; i < spotDataArr.length; i++) {
        console.log("Artist Name: " + data.tracks.items[0].album.artists[0].name);
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Album Name: " + data.tracks.items[0].album.name);
        console.log("Link for Song: " + data.tracks.items[0].external_urls.spotify + "\n");
        };
    });
}