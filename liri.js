//Liri takes the following arguments
// * my-tweets
// * spotify-this-song
// * movie-this
// * do-what-it-says


var twitter = function()
{
	var stuffINeed = require("./key.js");
	// var fs = require('fs');
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
        	data.push({
            'created at: ' : tweets[i].created_at,
            'Tweets: ' : tweets[i].text,
        	});

	    // console.log(tweets);
	    console.log(data);
	  		}

		};
	});
}

//var spotify = require('spotify');
var spotifythissong = function()
{
	var spotify = require('spotify');
 
	spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }
	    var data = []; //empty array to hold data
	    for (var i = 0; i < songs.length; i++) {
	    	data.push({
	    		'Artist(s):':
				'The song name:':
				'Preview link:':
				'Album:':
	    	})
	    	songs[i]
	    }
	 	
	 	console.log(data);
	    // Do something with 'data' 
	});
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
};

runThis(process.argv[2]);



