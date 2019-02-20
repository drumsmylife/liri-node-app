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
//uQuery is the users search parameters which is more flexible.
function userIn(userInput, uQuery){
    switch (userInput) {
        case "concert-this":
            concertThis(uQuery);
            break;
        case "spotify-this-song":
            spotifyThisSong();
            break;
        case "movie-this":
            movieThis(uQuery);
            break;
        case "do-what-it-says":
            doThis(uQuery);
            break;
            default:
            console.log("better choices please");
            break;
    }
}
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
                    console.log('Location: ' + response.data[i].venue.city);
                    console.log('Name: ' + response.data[i].venue.name);

                    var concertDate = moment(response.data[i].datetime).format("MM/DD/YYYY hh:00 A");
                    console.log('ConcertDate: ' + concertDate + '\n' );
                    

                }
            }
        }
    })
};
//concert this DONE!

//spotify-this-song function
function spotifyThisSong() {
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
        }
    })
};
//spotiify-this DONE

// movie-this function
function movieThis(uQuery) {
    axios.get( "http://www.omdbapi.com/?t=" + uQuery + "&apikey=trilogy")
    .then(function(response){
        if (!uQuery) {
            return console.log ("mr nobody");
        } else if(uQuery){
      
            console.log("Movie Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country Produced In: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors + "\n");
                
        
    }
}
    )};



//do-what-it-says function
function doThis() {
    // UTILIZE THE BUILT IN READFILE METHOD TO ACCESS RANDOM.TXT
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return error;
        }
        // CATCH DATA AND USE THE .SPLIT() METHOD TO SEPARATE OBJECTS WITHIN OUR NEW ARRAY
        var dataArr = data.split(",");

        // TAKE OBJECTS FROM RANDOM.TXT TO PASS AS PARAMETERS
        userInput = dataArr[0];
        uQuery = dataArr[1];
        // CALL OUR FUNCTION WITH OUR NEW PARAMETERS...
        userIn(userInput, uQuery);
    })
};
//do-what-it-says function DONE!!!!


    

