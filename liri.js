//Liri takes the following arguments
// * my-tweets
// * spotify-this-song
// * movie-this
// * do-what-it-says


var twitter = function()
{
	var stuffINeed = require("./key.js");
	var fs = require('fs');
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

	    if(!songName){
			songName = "The Sign";

				var defaultResult = 
	        	"Artist: " + "Ace of Base" + "\r\n" + 
		        "Song: " + songName + "\r\n";


		        console.log(defaultResult);
		}

	   	spotify.search({ type: 'track', query: songName }, function(err, data) {

	    if (!err) {

	    	var songInfo = data.tracks.items;

	    	for (var i = 2; i < songInfo.length; i++) {
	        
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
	
}


var request = require('request');

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
};

runThis(process.argv[2]);



