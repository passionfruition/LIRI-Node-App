require("dotenv").config();
var moment = require('moment');
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");

// Registers user inputs
var userCommand = process.argv[2];
var userInput = process.argv.slice(3).join(" ");


// Renders when "concert-this" command is called to get the BandsInTown API
function getBand(input) {
    // If no user input
    if(!input) {
        input = "Slander";
    }
    var queryUrl = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(
        function(response) {
            var events = response.data;
            
            console.log("UPCOMING EVENTS");
            console.log("==================");
            // Returns all given events
            // for (i=0; i<events.length; i++) {

            // Only returns first 5 events
            for (i=0; i<5; i++) {
                var venue = events[i].venue.name;
                var location = events[i].venue.city + ", " + events[i].venue.country;
                var time = events[i].datetime;
                time = time.substring(0, time.indexOf("T"));
                var convertedTime = moment(time, 'YYYY-MM-DD');
                convertedTime = convertedTime.format('MM/DD/YYYY');
                
                console.log("Venue: " + venue);
                console.log("Location: " + location);
                console.log("Date: " + convertedTime);
                console.log(" ");
            }
        }
    ).catch(function(error) {
        console.log(error);
    });
}

// Renders when "spotify-this-song" command is called to get the Spotify API
function getSpotify(input) {
    // If no user input
    if(!input) {
        input = "The Sign by Ace of Base";
    }
    spotify
        .search({ type: 'track', query: userInput, limit: 1})
        .then(function(response) {

            var song = response.tracks.items[0];
            var artists = song.artists;

            console.log("ARTIST(S)");
            console.log("=============");
            for(i=0; i<artists.length; i++) {
                console.log(artists[i].name);
            }
            console.log(" ");

            console.log("SONG NAME");
            console.log("=============");
            console.log(song.name);
            console.log(" ");

            console.log("SONG LINK");
            console.log("=============");
            console.log(song.external_urls.spotify);
            console.log(" ");

            console.log("ALBUM NAME");
            console.log("=============");
            console.log(song.album.name);

        })
        .catch(function(err) {
            console.log(err);
        });
}

// Renders when "movie-this" command is called to get the OMDb API
function getMovie(input) {
    if(!input) {
        input = "Mr. Nobody";
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";
    axios.get(queryUrl).then(
        function(response) {
        var movie = response.data;

        console.log("NAME");
        console.log("=============");
        console.log(movie.Title);
        console.log(" ");

        console.log("YEAR RELEASED");
        console.log("=============");
        console.log(movie.Year);
        console.log(" ");

        console.log("IMDB RATING");
        console.log("=============");
        console.log(movie.imdbRating);
        console.log(" ");

        console.log("ROTTEN TOMATOES RATING");
        console.log("=============");
        console.log(movie.Ratings[1].Value);
        console.log(" ");

        console.log("COUNTRY PRODUCED");
        console.log("=============");
        console.log(movie.Country);
        console.log(" ");

        console.log("LANGUAGE");
        console.log("=============");
        console.log(movie.Language);
        console.log(" ");

        console.log("PLOT");
        console.log("=============");
        console.log(movie.Plot);
        console.log(" ");

        console.log("ACTORS");
        console.log("=============");
        console.log(movie.Actors);
        console.log(" ");
        
        })
        .catch(function(error) {
          console.log(error);
        });
}

// Chooses which function to run based on user input command
function runLiri(input) {
    switch (userCommand) {
        case "concert-this": 
            getBand(input);
            break;
        case "spotify-this-song":
            getSpotify(input);
            break;
        case "movie-this":
            getMovie(input);
            break;
        case "do-what-it-says": 
            Random();
            break;
    }
}

// Renders when "do-what-it-says" command is run and reads the random.txt file
function Random() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        var randomArray = data.split(",");
        userCommand = randomArray[0];
        userInput = randomArray[1];
        runLiri(userInput);
    })
}

runLiri(userInput);

