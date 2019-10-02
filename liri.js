require("dotenv").config();
var moment = require('moment');
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var nodeArgs = process.argv;
var fs = require("fs");
var userCommand = process.argv[2];
var userInput = "";

for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length && userCommand === "concert-this" || i > 3 && i < nodeArgs.length && userCommand === "movie-this") {
        userInput = userInput + "+" + nodeArgs[i];
    } else if (i > 3 && i < nodeArgs.length && userCommand === "spotify-this-song") {
        userInput = userInput + " " + nodeArgs[i];
    } else {
        userInput += nodeArgs[i];
    }
}

// console.log(userInput);
// console.log(queryUrl);

function getBand() {
    var queryUrl = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(
        function(response) {
            // console.log(response.data[0].venue.name);
            // console.log(response.data.length);
            var events = response.data;
            
            console.log("UPCOMING EVENTS");
            console.log("==================");
            // for (i=0; i<events.length; i++) {
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
            // var venues = [];
            // var locations = [];
            // var
        }
    ).catch(function(error) {
        console.log(error);
    });
}

function getSpotify() {
    if(process.argv[3] = undefined) {
        userInput = "The Sign";
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

function getMovie() {
    var queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";
    axios.get(queryUrl).then(
        function(response) {
        //   console.log("Release Year: " + response.data.Year);
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

function runLiri() {
    if (userCommand === "concert-this") {
        getBand();
    }
    
    if(userCommand === "spotify-this-song") {
        getSpotify();
    }
    
    if(userCommand === "movie-this") {
        getMovie();
    }
    
    if(userCommand === "do-what-it-says") {
        Random();
    }
}

function Random() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if(error) {
            return console.log(error);
        }
        var randomArray = data.split(",");
        userCommand = randomArray[0];
        userInput = randomArray[1];
        // console.log(userCommand);
        // console.log(userInput);
        runLiri();
    })
}

runLiri();

