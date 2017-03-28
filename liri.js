//Liri takes the following arguments
// * my-tweets
// * spotify-this-song
// * movie-this
// * do-what-it-says


var twitter = function()
{
	var stuffINeed = require("./key.js");
	var fs = require("fs");
	// var twitter = require('twitter');

	console.log("________________________________");
	console.log("SHOWING All");
	console.log("________________________________");

	var Twitter = require('twitter');
	 
	var client = new Twitter(stuffINeed.twitterKeys);
	 
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
}


var spotifythissong = function()
{
	var spotify = require("spotify");
 

	    var songName = process.argv[3]; 

	    if(songName === undefined){
			songName = "The Sign";

			}

		params = songName;

	   	spotify.search({ type: 'track', query: params }, function(err, data) {

	    if (!err) {

	    	var songInfo = data.tracks.items;

	    	for (var i = 0; i < 5; i++) {
	        
	    		if (songInfo[i] != undefined) {

		        	var spotifyResult = 
		        	"Artist: " + songInfo[i].artists[0].name + "\r\n" + 
			        "Song: " + songInfo[i].name + "\r\n" + 
			        "A preview link of the song from Spotify: " + songInfo[i].preview_url + "\r\n" + 
			        "The album that the song is from: " + songInfo[i].album.name + "\r\n";

			        console.log(spotifyResult);

	        	}
	        }
	    }


	    else {
	    	console.log('Error occurred: ' + err);
	        return;
	    }

		});

}


var movieThis = function()
{
	
	var movieName = process.argv[3];

	if(!movieName){
		movieName = "Mr.Nobody";
	}

	var request = require("request");

	var movie = movieName;

	var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json";

	request(queryUrl, function(error, response, body) {

  	if (!error && response.statusCode === 200) {

    // console.log(body);
   	  // * Title of the movie.
	  // * Year the movie came out.
	  // * IMDB Rating of the movie.
	  // * Country where the movie was produced.
	  // * Language of the movie.
	  // * Plot of the movie.
	  // * Actors in the movie.
	  // * Rotten Tomatoes Rating.
	  // * Rotten Tomatoes URL.
	  console.log("Title of the movie: " + JSON.parse(body).Title);

      console.log("Year the movie came out: " + JSON.parse(body).Year);

      console.log("IMDB Rating of the movie: " + JSON.parse(body).imdbRating);

      console.log("Country where the movie was produced: " + JSON.parse(body).Country);

      console.log("Language of the movie: " + JSON.parse(body).Language);

      console.log("Plot of the movie: " + JSON.parse(body).Plot);

      console.log("Actors in the movie: " + JSON.parse(body).Actors);

      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);

      console.log("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);

  	}

  	else {
				console.log("Error :"+ error);
				return;
			}

	});
}

var doWhatitsays = function()
{
var fs = require("fs");
fs.readFile("random.txt", "utf8", function(err, data) {

  // Break the string down by comma separation and store the contents into the output array.
  var output = data.split(",");

  // Loop Through the newly created output array
  for (var i = 0; i < output.length; i++) {

    // Print each element (item) of the array/
    console.log(output[i]);
  }

});

}



//run this on load of js file
var runThis = function(argValue) {
	console.log(argValue);

	if(argValue == "my-tweets")
	{
		twitter();
	}
	else if(argValue == "spotify-this-song")
	{
		spotifythissong();
	}
	else if(argValue == "movie-this")
	{
		movieThis();
	}
	else if(argValue == "do-what-it-says")
	{
		doWhatitsays();
	}
	
};

runThis(process.argv[2]);



