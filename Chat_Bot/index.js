// dependencies
var restify = require('restify');
var builder = require('botbuilder');
var request = require('request');
var natural = require('natural');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});


// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// create the bot
var bot = new builder.UniversalBot(connector);

// Listen for messages from users 
server.post('/placeholder', connector.listen());

//entry point for branches and receving an image
var bot = new builder.UniversalBot(connector, function(session){

});

//placeholder dialog
bot.dialog('placeholder', [
	function (session) {

    },
    function (session, results) {

    }
]).triggerAction({
    matches: /^placeholder$/i
});


//get request example
//usage
//    	 getData('', function (msg) {
//            console.log(msg)
//         });
function getData(data, cb){
	request('http://localhost:5000/placeholder_get', function (error, response, body) {
		cb(body);
	});
}

//post request example
//you can also post images! if sending image form a chatbot use 'fs' module to load the image url and then send it.
//usage
//    	 postData('data', function (msg) {
//             console.log(msg)
//         });

function postData(data, cb){
	request.post({
  	url:     'http://localhost:5000/placeholder_post',
 	 	body:    data
	}, function(error, response, body){
  	   	cb(body)
	});
}