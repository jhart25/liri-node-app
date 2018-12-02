require("dotenv").config();

var axios = require("axios");
var keys = require("./keys");
var fs = require("fs");
var moment = require("moment");
var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);
var search = process.argv[2];
var term = process.argv.slice(3).join(" ");

function searchType() {
    switch(search) {
        case 'concert-this':
        concertThis();
        break;

        case 'spotify-this-song':
        spotifySong();
        break;

        case 'movie-this':
        movieThis();
        break;

        case 'do-what-it-says':
        doWhat();
    }
};

function concertThis(){
    if (!term) {
        term = "Kiss"
    }

    var queryURL = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp";

    axios.get(queryURL).then(function(response) {
        for (var i = 0; i < response.data.length; i++){
          
          console.log("Venue: " + response.data[i].venue.name);
          console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
          console.log("Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
          console.log("----------------------------------------------------------");
        }
        })
        .catch(function(error) {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log("Error", error.message);
            }
            console.log(error.config);
          });
};

function spotifySong() {

    //If no song, default to "Aces High" by Iron Maiden.
    if (!term){
        term= "Aces High";
    }

    spotify.search({ type: "track", query: term })
    .then(function(response) {
        
        var songs = response.tracks.items[0];
        console.log("----------------------------------------------------------");
        console.log("Artist(s): " + songs.album.artists[0].name);
        console.log("Song Name: "+ songs.name);
        console.log("Preview Link: " + songs.preview_url);
        console.log("Album: " + songs.album.name);
        console.log("----------------------------------------------------------");     
    })
    .catch(function(err) {
    console.log(err);
    });
};

function movieThis(){
    //If no movie, default to Mr. Nobody
    if (!term){ 
        term = "Mr. Nobody";
    }
    var queryURL = "http://www.omdbapi.com/?t=" + term + "&y=&plot=short&apikey=trilogy";

    axios.get(queryURL).then(function(response) {
        console.log("----------------------------------------------------------");
        console.log("Title: " + response.data.Title);
        console.log("Year: " + response.data.Year);
        console.log("IMDB Rating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes Rating: " + response.data.Metascore);
        console.log("Country: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
        console.log("----------------------------------------------------------");
        })
        .catch(function(error) {
            if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            } else if (error.request) {
            console.log(error.request);
            } else {
            console.log("Error", error.message);
            }
            console.log(error.config);
        });
};

function doWhat() {
    fs.readFile("random.txt", "utf8", function(err, data) {
        var textFile = data.split(",");

        search = textFile[0];
        term = textFile[1];
        spotifySong();

        if (err) {
            return console.log(err);
        }
    });
};

searchType();

