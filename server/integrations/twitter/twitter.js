//twitter.js

var decache = require('decache');
var _twitter = require('request');
var OAuth2 = require('oauth').OAuth2
var Twitter = require('twitter-node-client').Twitter;
var _console = require('../../utils/logger.js');
var _conf = require('./config.js');
var _utils = require('../../utils/utils.js')
var Intelligence = require('../../intelligence.js');
var sentiment = require('./sentiment.js');
var Orange = require('./Orange.json');
var subscribed = false;
	
var exports = module.exports = function () { }; 

//_console.raw( Orange.metrics );
//Intelligence.createMetrics( Orange.metrics , function (data) { _console.info("Create Metrics"); _console.raw(data); } )


exports.getHashTags = function(req, res) {
	
	var error = function (err, response, body) {
        _console.error('TWITTER API ERROR : ' + JSON.stringify(err) );
    };
	
    var success_sms = function (data) {
        //_console.log('Data : ' + data);
		
		var json = JSON.parse(data);
		
		var value = json.statuses.length;		
		if ( _conf.collection_demo_mode ) { value = _utils.randomInterval(0,100) }
		
		var measurement = require('./measurement')
				
		measurement.metric = _conf.metric_prefix + "SMS";
		measurement.measure = value;
		
		decache('./measurement')
		
        //_utils.saveToFileJSON('tweets', JSON.stringify(json, null, 4));
		//_console.raw(json.search_metadata);
		//_console.raw(json.statuses.length);
		
		Intelligence.sendMeasurement( measurement , metricsCall )
		
    };

	var success_mms = function (data) {
        
		//_console.log('Data : ' + data);
		
		var json = JSON.parse(data);
		
		var value = json.statuses.length;		
		if ( _conf.collection_demo_mode ) { value = _utils.randomInterval(0,100) }
		
		var measurement = require('./measurement')
				
		measurement.metric = _conf.metric_prefix + "MMS";
		measurement.measure = value;
		
		decache('./measurement')
						
		//_console.raw(json.search_metadata);
		//_console.raw(json.statuses.length);
		
		Intelligence.sendMeasurement( measurement , metricsCall )
		
    };
	
	 var success_texto = function (data) {
        
		//_console.log('Data : ' + data);
		
		var json = JSON.parse(data);
		
		var value = json.statuses.length;		
		if ( _conf.collection_demo_mode ) { value = _utils.randomInterval(0,100) }
		
		var measurement = require('./measurement')
				
		measurement.metric = _conf.metric_prefix + "TEXTO";
		measurement.measure = value;
		
		decache('./measurement')
						
		//_console.raw(json.search_metadata);
		//_console.raw(json.statuses.length);
		
		Intelligence.sendMeasurement( measurement , metricsCall )
		
    };

	var success_photo = function (data) {
        
		//_console.log('Data : ' + data);
		
		var json = JSON.parse(data);
		
		var value = json.statuses.length;		
		if ( _conf.collection_demo_mode ) { value = _utils.randomInterval(0,100) }
		
		var measurement = require('./measurement')
				
		measurement.metric = _conf.metric_prefix + "PHOTO";
		measurement.measure = value;
		
		decache('./measurement')
						
		//_console.raw(json.search_metadata);
		//_console.raw(json.statuses.length);
		
		Intelligence.sendMeasurement( measurement , metricsCall )
		
    };
	 var success_image = function (data) {
        
		//_console.log('Data : ' + data);
		
		var json = JSON.parse(data);
		
		var value = json.statuses.length;		
		if ( _conf.collection_demo_mode ) { value = _utils.randomInterval(0,100) }
		
		var measurement = require('./measurement')
				
		measurement.metric = _conf.metric_prefix + "IMAGE";
		measurement.measure = value;
		
		decache('./measurement')
						
		//_console.raw(json.search_metadata);
		//_console.raw(json.statuses.length);
		
		Intelligence.sendMeasurement( measurement , metricsCall )
		
    };

	var success_message = function (data) {
        
		//_console.log('Data : ' + data);
		
		var json = JSON.parse(data);
		
		var value = json.statuses.length;		
		if ( _conf.collection_demo_mode ) { value = _utils.randomInterval(0,100) }
				
		var measurement = require('./measurement')
				
		measurement.metric = _conf.metric_prefix + "MESSAGE";
		measurement.measure = value;
		
		decache('./measurement')
		
		 
		//_console.raw(json.search_metadata);
		//_console.raw(json.statuses.length);
		
		Intelligence.sendMeasurement( measurement , metricsCall )
		
    };
	
	var metricsCall = function (error, response, body) {
		if (error) _console.raw(error) 
			//if (response) _console.raw(response.statusCode) 
				if (!error && response) { //&& response.statusCode == 200) {
					_console.raw(body) // Show the result.
					}
				
		var event = require('./event')
		
			event.title = "Changed Title";
		
			_console.raw( event );
		
			Intelligence.sendEvent( event , metricsCall2 )
		
		decache('./event')
	} 
	
	var metricsCall2 = function (error, response, body) {
		if (error) _console.raw(error) 
			if (response) _console.raw(response.statusCode) 
				if (!error && response) { //&& response.statusCode == 200) {
					_console.raw(body) // Show the result.
					}
				
	} 
	    
    var twitter = new Twitter(_conf.twitter_authorization);

    		
	twitter.getSearch({'q':'(#Orange OR #Sosh) AND #SMS', 'result\_type':'mixed'}, error, success_sms);
	
	twitter.getSearch({'q':'(#Orange OR #Sosh) AND #MMS', 'result\_type':'mixed'}, error, success_mms);
	
	twitter.getSearch({'q':'(#Orange OR #Sosh) AND #texto', 'result\_type':'mixed'}, error, success_texto);
	
	twitter.getSearch({'q':'(#Orange OR #Sosh) AND "envoi photo"', 'result\_type':'mixed'}, error, success_photo);
	
	twitter.getSearch({'q':'(#Orange OR #Sosh) AND "envoi image"', 'result\_type':'mixed'}, error, success_image);
	
	twitter.getSearch({'q':'(#Orange OR #Sosh) AND #message', 'result\_type':'mixed'}, error, success_message);
	
	
	//Example calls

    //twitter.getUserTimeline({ screen_name: 'BoyCook', count: '10'}, error, success);

    //twitter.getMentionsTimeline({ count: '10'}, error, success);

    //twitter.getHomeTimeline({ count: '10'}, error, success);

    //twitter.getReTweetsOfMe({ count: '10'}, error, success);

    //twitter.getTweet({ id: '1111111111'}, error, success);
		
    //twitter.getSearch({'q':'#Orange #SMS','count': 100}, error, success);

	/*
	twitter.getSearch({'q':'#Orange #MMS','count': 100}, error, success);
	
	twitter.getSearch({'q':'#Orange #texto','count': 100}, error, success);
	
	twitter.getSearch({'q':'#Orange #envoi photo','count': 100}, error, success);

	twitter.getSearch({'q':'#Orange #envoi image','count': 100}, error, success);
	*/
		
    //
    // Get 10 popular tweets with a positive attitude about a movie that is not scary 
    //
    //twitter.getSearch({'q':' movie -scary :) since:2013-12-27', 'count': 1, 'result\_type':'popular'}, error, success);
	

}

exports.getTweetsStream = function(req, res) {

   var tweetsCounter = 0;
   var globalSentimentScore = 0;
   
   _console.info('Twitter Integration searching for : (' + _conf.twitter_main_hashtags.split(',').join(' or ') + ') and (' + _conf.twitter_secondary_hashtags.toString().split(',').join(' or ') + ')');
   
   var apiCallback = function (error, response, body) {
		if (error) _console.raw(error) 
			if (response) _console.raw(response.statusCode) 
				if (!error && response) { //&& response.statusCode == 200) {
					_console.raw(body) // Show the result.
					}
				
	}

	
   function sendMeasurement() {
		
		if ( ! _conf.create_intelligence_measurement_on_tweets ) return;
			
		var measurement = require('./measurement')
		
		_console.info('Sending Tweets Counter Measurement : ' + tweetsCounter);		
		measurement.metric = _conf.metric_prefix + "GLOBAL";
		measurement.measure = tweetsCounter; tweetsCounter = 0;
        if ( _conf.collection_demo_mode ) { measurement.measure = _utils.randomInterval(0,30) }		
		Intelligence.sendMeasurement( measurement , apiCallback );
		
		_console.info('Sending Current Sentiment Measurement : ' + globalSentimentScore);
		measurement.metric = _conf.metric_prefix + "SENTIMENT";
		measurement.measure = globalSentimentScore;
		if ( _conf.collection_demo_mode ) { measurement.measure = _utils.randomInterval(-50,50) }		 		
		Intelligence.sendMeasurement( measurement , apiCallback );
		
		/*
		_console.info('Sending Sentiment Period Average : ' + globalSentimentScore / tweetsCounter);
		measurement.metric = _conf.metric_prefix + "PERIOD.SENTIMENT";
		measurement.measure = globalSentimentScore / tweetsCounter;
		if ( _conf.collection_demo_mode ) { measurement.measure = _utils.randomInterval(-10,10) }		 		
		Intelligence.sendMeasurement( measurement , apiCallback );
		*/
		
		decache('./measurement')
		
		setTimeout(sendMeasurement, _conf.send_intelligence_measurement_interval * 60000);
				
	} 
	
	function sendEvent( tweet ) {
		
		if ( ! _conf.create_intelligence_event_on_tweet ) return;
			
	    var event = require('./event')		
				
		event.title = tweet.text;
		event.severity = sentiment.getTweetSeverity( tweet );
		
		if ( _conf.include_tweet_metadata_in_event ) {
		
    		event.properties.name = tweet.user.name;
			event.properties.screen_name = tweet.user.screen_name;
			//event.properties.description = tweet.user.description;
			//event.properties.url = tweet.user.url;
			event.properties.location = tweet.user.location;
			event.properties.time_zone = tweet.user.time_zone;
			event.properties.lang = tweet.lang;
			event.properties.followers_count = tweet.user.followers_count;
			event.properties.friends_count = tweet.user.friends_count;
			event.properties.retweeted = tweet.retweeted;
			event.properties.possibly_sensitive = tweet.possibly_sensitive;
		}
		
		_console.raw( event );
		_console.raw( sentiment.getTweetSentiment( tweet ) );
			
		 Intelligence.sendEvent( event , apiCallback )
		
		decache('./event')		
	} 
	
	
		
	function invalidateTwitterBearerToken( oAuth ) {
	
	    var auth = "Basic " + new Buffer( oAuth.consumer_key + ":" + oAuth.consumer_secret).toString("base64");
		
		var callOptions = {
						  url : _conf.twitter_api + 'oauth2/invalidate_token',
						  body :  'access_token=AAAAAAAAAAAAAAAAAAAAAFnmugAAAAAAqhCLoZHQCxEU4tL3%2BoFFXHk%2BX9M%3DfMWsCL7lf1WLv84XCcDf7dYSM8zoVGykbJREXFx1WoqbZ02sIT',						  
						  headers: {
								       'Authorization': auth,								
								       'Content-Type' : 'application/x-www-form-urlencoded;charset=UTF-8'						
							}
						}; 
								
	    _console.raw(callOptions);
				
		_twitter.post(callOptions, apiCallback);		
		
	} 
	
	function getTwitterBearerToken( oAuth ) {	
	    /*
		var oauth2 = new OAuth2( _conf.twitter_Oauth.consumer_key, _conf.twitter_Oauth.consumer_secret, _conf.twitter_api, null, _conf.twitter_oauth_context, null);
		oauth2.getOAuthAccessToken('', {
			'grant_type': 'client_credentials'
		  }, function (e, access_token) {
				_console.raw(access_token);				
				return access_token;
		});
		*/
	} 
	

	
	var Twitter = require('twitter')
	var consumer;
    
	//invalidateTwitterBearerToken( _conf.twitter_Oauth );  return; 
	//getTwitterBearerToken( _conf.twitter_Oauth ); return;
	
	
	if ( _conf.application_type_authentication ) { 
	       
		   var token = {
			  consumer_key: _conf.twitter_Oauth.consumer_key,
			  consumer_secret: _conf.twitter_Oauth.consumer_secret,
			  bearer_token: getTwitterBearerToken ( _conf.twitter_Oauth )
			  //'AAAAAAAAAAAAAAAAAAAAAFnmugAAAAAAKw125XQKFfkAWaYO%2F0vdFeBfvKs%3DHXmWouGu8nA4ijj6nACSx2hTtA0jNhmSh6XaX0V8fZRMvwGnFS'
		}
		
		   //_console.raw( getTwitterBearerToken ( _conf.twitter_Oauth ) );
		        
		  consumer = new Twitter( token );
		  
		 } 
	else {
		
		consumer = new Twitter( _conf.twitter_Oauth );
	}
	
	var stream = consumer.stream('statuses/filter', { 'track' : _conf.twitter_main_hashtags, 'language' : _conf.twitter_selected_languages } );
	
	subscribed = true;
	sendMeasurement();
	
	
	stream.on('data', function(tweet) {
	    
		if (! sentiment.isTweetValid( tweet ) ) { return; }
		
		var sentimentAnalysis = sentiment.getTweetSentiment( tweet );
		
		tweetsCounter++;				
		globalSentimentScore += sentimentAnalysis.score;
 		
		_console.info( 'Total Tweets : ' + tweetsCounter);
		_console.info( 'Global Sentiment Score : ' + globalSentimentScore);
		
		sendEvent( tweet ); 
		
        if ( ! _conf.create_intelligence_measurement_on_tweets ) return;		
			
		for (var i = 0, len = _conf.twitter_secondary_hashtags.length; i < len; i++) {
            		   
		   if (sentimentAnalysis.tokens.includes(_conf.twitter_secondary_hashtags[i])) {
			  
			    console.info("String " + _conf.twitter_secondary_hashtags[i] + " found : " + sentimentAnalysis.tokens.includes(_conf.twitter_secondary_hashtags[i]));				
				
				var measurement = require('./measurement');
			    
				measurement.metric = _conf.metric_prefix + _conf.twitter_secondary_hashtags[i].toUpperCase();
				measurement.measure = 1;
				
				if ( _conf.collection_demo_mode ) { measurement.measure = _utils.randomInterval(1,1) }		 		
				
				_console.raw( measurement );
				
				Intelligence.sendMeasurement( measurement , apiCallback )
					
				decache('./measurement')
					   
		   }
		
		}
		
	});
	
	
	stream.on('error', function(error) {
	   
	   throw error;
	   
	});

}

	
exports.getData = function(req, res) {
    	
	//exports.getHashTags(req, res);
	
	try {
	   
	   if ( !subscribed ) exports.getTweetsStream( req, res );	   
	}
	catch(err) { _console.error(err) }
	
}



