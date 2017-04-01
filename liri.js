
//Liri takes the following arguments
// * my-tweets
// * spotify-this-song
// * movie-this
// * do-what-it-says

//require the node npm packages

var fs = require("fs");
var Twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");
var inquirer = require("inquirer");

//grabbing the twitter authentication details from key.js file
var keys = require("./key.js");
var twitterKeys = keys.twitterKeys;

//twitter user-based authentication
var client = new Twitter({
    consumer_key: twitterKeys.consumer_key,
    consumer_secret: twitterKeys.consumer_secret,
    access_token_key: twitterKeys.access_token_key,
    access_token_secret: twitterKeys.access_token_secret
});


//functions to execute based on user command
var twitterID = "Ashmy Selvamony";
var twitterQueryURL = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=" + twitterID + "&count=20";

function myTweets() {
    console.log("________________________________");
    console.log("SHOWING TWEETS");
    console.log("________________________________");

    var params = {screen_name: 'Ashmy Selvamony'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) 
    {
      if (!error) 
        {
            var data = []; //empty array to hold data
            for (var i = 0; i < tweets.length; i++) 
            {
            var twitterResult = 
            tweets[i].user.screen_name + ": " + "\r\n" +
            "created at" + ": " + tweets[i].created_at + "\r\n" + 
            "Tweets" + ": " + tweets[i].text + "\r\n"
            
        console.log(twitterResult);
            }

        }
        else {
                console.log("Error :"+ error);
                return;
            }

    });
fs.appendFile("log.txt", "\nAshmy's Tweets" + "\n************");
}

function spotifyThisSong(song) {
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        } else {
            console.log('=========================');
            console.log("Artists: " + data.tracks.items[0].artists[0].name);
            console.log("Song: " + data.tracks.items[0].name);
            console.log("Preview link: " + data.tracks.items[0].preview_url);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log('=========================');
        }

    });
    fs.appendFile("log.txt", "\nSong Name: " + song + "\n************");
}

function movieDetails(movie) {

    var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&tomatoes=true&r=json";
    request(queryURL, function(error, response, body) {
        console.log('=========================');
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Year: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        console.log("Country of origin: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
        console.log("Rotten Tomatoes Rating:  " + JSON.parse(body).tomatoMeter);
        console.log("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);
        console.log('=========================');
    });
    fs.appendFile("log.txt", "\nMovie Name: " + movie + "\n************");
}


inquirer.prompt([{
    type: "list",
    message: "What would you like to do today?",
    choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"],
    default: ["my-tweets"],
    name: "commands"

}]).then(function(user) {

    fs.appendFile("log.txt", "\n" + user.commands + "\n");

    switch (user.commands) {
        case "my-tweets":
            {
                myTweets();
                break;
            }
        case "spotify-this-song":
            {
                inquirer.prompt([{
                    type: "input",
                    message: "Enter a song: ",
                    name: "songName",
                    default: "The Sign - by ace of base"
                }]).then(function(song) {
                    var song = song.songName;
                    if(song===undefined){
                        song="The Sign";
                    }
                    spotifyThisSong(song);
                });

                break;
            }
        case "movie-this":
             {
                inquirer.prompt([{
                    type: "input",
                    message: "Enter a movie: ",
                    name: "movieName"
                }]).then(function(movie) {
                    var movie = movie.movieName;
                    if (movie === undefined) {
                        movie = "Mr.Nobody";
                    }   
                    movieDetails(movie);
                });

                break;
            }
        case "do-what-it-says":
            {

                fs.readFile("random.txt", "utf-8", function(err, data) {
                    if (err) throw err;

                    data = data.split(",");
                    if (data[0] === "spotify-this-song") {
                        spotifyThisSong(data[1]);
                    } else if (data[0] === "my-tweets") {
                        myTweets();
                    } else if (data[0] === "movie-this") {
                        movieDetails(data[1]);
                    }
                })
                break;
            }
    }
});
