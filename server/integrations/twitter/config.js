//config.js
    module.exports = {
        
		//engine config variables
						
		//config variables
		integration_name : 'Twitter',
		collection_autostart : false,
		collection_demo_mode : false,
		collection_interval : '5', //every X seconds
		create_intelligence_measurement_on_tweets : true,
		send_intelligence_measurement_interval : '1', //every X minutes
		create_intelligence_event_on_tweet : true,
		twitter_api: 'https://api.twitter.com/',
		twitter_oauth_context: 'oauth2/token',
		twitter_main_hashtags : 'Orange,Sosh',
		twitter_secondary_hashtags : [ 'sms', 'mms', 'image', 'photo', 'texto', 'message' ],
		twitter_selected_languages : 'fr',
		dictionary: require('./i18n/AFINN.json'),
		twitter_authorization : { 'consumerKey': 'DRfREmdIjIsEDzoJM947rjysr', 
								  'consumerSecret': 'xlRsvB2dNKqjJGG4skWgk05LCGLQP5EgSzKpZf06JLj1gWwHAs', 
								  'accessToken': '114487744-AyTaeg9ymAkYDqoKJP3pEkvf6FZgKP536g5XwVIS', 
								  'accessTokenSecret': 'BQxBSBx17Ha7R59vsuLWqPOUXPQn67FeAJw03CTwckZyJ', 
								  'callBackUrl': '' },
		application_type_authentication: false,
		twitter_Oauth : { 'consumer_key': 'DRfREmdIjIsEDzoJM947rjysr', 
						  'consumer_secret': 'xlRsvB2dNKqjJGG4skWgk05LCGLQP5EgSzKpZf06JLj1gWwHAs', 
						  'access_token_key': '114487744-AyTaeg9ymAkYDqoKJP3pEkvf6FZgKP536g5XwVIS', 
						  'access_token_secret': 'BQxBSBx17Ha7R59vsuLWqPOUXPQn67FeAJw03CTwckZyJ' },			  
		source : 'Twitter',
		type : 'SOCIAL NETWORKS',
		include_tweet_metadata_in_event : true,
		metric_prefix: 'ORANGE.DERS.TWITTER.',
		app_id : 'Orange-Mobile'
			
    };
