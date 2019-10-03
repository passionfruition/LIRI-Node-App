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
    if (!input) {
        input = "Slander";
    }
    var queryUrl = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=" + keys.bandsintown.id;
    axios.get(queryUrl).then(
        function (response) {
            var events = response.data;
            console.log("UPCOMING EVENTS");
            console.log("==================");

            // Only returns first 5 events
            for (i = 0; i < 5; i++) {
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
    ).catch(function (error) {
        console.log(error);
    });
}

// Renders when "spotify-this-song" command is called to get the Spotify API
function getSpotify(input) {
    // If no user input
    if (!input) {
        input = "The Sign by Ace of Base";
    }
    spotify
        .search({ type: 'track', query: userInput, limit: 1 })
        .then(function (response) {
            var song = response.tracks.items[0];

            // Store artists in an array
            var artistArray = [];
            for (i = 0; i < song.artists.length; i++) {
                artistArray.push(song.artists[i].name);
            }

            // Store response data in an array  
            var dataArray = [
                "Name: " + song.name,
                "Artist(s): " + artistArray.join(", "),
                "Link: " + song.external_urls.spotify,
                "Album: " + song.album.name
            ].join("\n\n");

            console.log(dataArray);
        })
        .catch(function (err) {
            console.log(err);
        });
}

// Renders when "movie-this" command is called to get the OMDb API
function getMovie(input) {
    if (!input) {
        input = "Mr. Nobody";
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=" + keys.omdb.id;
    axios.get(queryUrl).then(
        function (response) {
            var movie = response.data;

            // Store response data in an array
            var dataArray = [
                "Name: " + movie.Title,
                "Year Released: " + movie.Year,
                "IMDb Rating: " + movie.imdbRating,
                "Rotten Tomatoes Rating: " + movie.Ratings[1].Value,
                "Country Produced: " + movie.Country,
                "Language: " + movie.Language,
                "Plot: " + movie.Plot,
                "Actors: " + movie.Actors
            ].join("\n\n");

            console.log(dataArray);
        })
        .catch(function (error) {
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
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var randomArray = data.split(",");
        userCommand = randomArray[0];
        userInput = randomArray[1];
        runLiri(userInput);
    })
}

// Initial run
runLiri(userInput);

