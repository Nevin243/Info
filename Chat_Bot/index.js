// dependencies
var restify = require('restify');
var builder = require('botbuilder');
var request = require('request');
//var natural = require('natural');
// Arrays
var postitve = ["https://media.giphy.com/media/l0Nwz1ehUndfqL9MQ/giphy.gif", "https://media.giphy.com/media/4Z3DdOZRTcXPa/giphy.gif", "https://media.giphy.com/media/imRu0Oqh6kzdK/giphy.gif", "https://media.giphy.com/media/xT9DPCU60mRbtGw7Ys/giphy.gif"]
var negative = ["https://media.giphy.com/media/26ybwvTX4DTkwst6U/giphy.gif", "https://media.giphy.com/media/l0Iy0ss0qJb0bCHHG/giphy.gif", "https://media.giphy.com/media/8OlT82jKm6Ugg/giphy.gif"]
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
//entry point for branches and receving an image
var bot = new builder.UniversalBot(connector, function(session){
    var msg = "Sourcing your positivity index for social media!";
    session.send(msg);
    session.beginDialog('Username');
});
// Listen for messages from users 
server.post('/SocialSource', connector.listen());
// Main Dialog
bot.dialog('Username', [
    function (session) {
         var msg = "Enter a users twitter handle to find their positivity index i.e @KainosAcademy";
         builder.Prompts.text(session, msg);
    },
    function (session, results) {
        session.dialogData.twitterName = results.response;
        var msg = "Checking the index for: " + session.dialogData.twitterName;
        session.send(msg);
        postData(session.dialogData.twitterName, function (msg) {
            console.log(msg)
            
            session.beginDialog('Display');
        });
    }
]).triggerAction({
    matches: /^[Us]sername$/i
});
bot.dialog('Display', [
    function (session) {
        console.log("Display Dialog");
        var msg = new builder.Message(session).addAttachment(createHeroCard(session));
        var msg1 = new builder.Message(session).addAttachment(createAnimationCard(session));
        var msg2 = "Want to check another name? yes / no"
        
        session.send(msg);
        session.send(msg1);
        builder.Prompts.text(session, msg2);
        //session.beginDialog('DisplayGif');
        
    },
    function(session, results){
        session.dialogData.another_run = results.response;
        if (session.dialogData.another_run == 'yes'){
            session.beginDialog('Username');
        } else {
            var msg = "Thanks for using Social Source!";
            session.endDialog(msg);
        }
    }
]);
// bot.dialog('DisplayGif', [
//  function(session){
//      console.log("Display GIF");
//      var msg1 = new builder.Message(session).addAttachment(createCard(AnimationCardName, session));
//      session.send(msg1);
//      //session.beginDialog('YesOrNo');
//  }
// ]);
// bot.dialog('YesOrNo', [
//  function(session) {
//      console.log("Display Yes/No");
//      var msg = "Want to check another name? yes / no"
//      builder.Prompts.text(msg);
//      session.beginDialog('Done');
//  },
//  function(session, results){
//      session.dialogData.another_run = results.response;
//      if (session.dialogData.another_run == 'yes'){
//          session.beginDialog('Username');
//      } else {
//          var msg = "Thanks for using Social Source!";
//          session.endDialog(msg);
//      }
//  }
// ]);
//get request example
//usage
//       getData('', function (msg) {
//            console.log(msg)
//         });
function getData(data, cb){
    request('http://localhost:5000/predict_get', function (error, response, body) {
        cb(body);
    });
}
//post request example
//you can also post images! if sending image form a chatbot use 'fs' module to load the image url and then send it.
//usage
    //  postData('data', function (msg) {
    //         console.log(msg)
    //     });
function postData(data, cb){
    request.post({
    url:     'http://localhost:5000/predict_post',
        body:    data
    }, function(error, response, body){
        cb(body)
    });
}
var HeroCardName = 'Hero card';
var AnimationCardName = "Animation card";
var ReceiptCardName = "Reciept card";
var CardNames = [HeroCardName, AnimationCardName];
function createCard(selectedCardName, session) {
    switch (selectedCardName) {
        case HeroCardName:
            return createHeroCard(session);
        case AnimationCardName:
            return createAnimationCard(session);
        case ReceiptCardName:
            return createReceiptCard(session);
        default:
            return createHeroCard(session);
    }
}
function createHeroCard(session) {
    return new builder.HeroCard(session)
        .title('@KainosAcademy')
        .subtitle('Let\'s see their score')
        //.text('Build and connect intelligent bots to interact with your users naturally wherever they are, from text/sms to Skype, Slack, Office 365 mail and other popular services.')
        .images([
            builder.CardImage.create(session, 'https://pbs.twimg.com/profile_images/857560358944464896/rzhq0MtJ_400x400.jpg')
        ])
        .buttons([
            builder.CardAction.openUrl(session, 'https://twitter.com/KainosAcademy', 'Go to Twitter!')
        ]);
}
function createAnimationCard(session) {
    return new builder.AnimationCard(session)
        .title('Our Reaction:')
        .image(builder.CardImage.create(session, reactionGif(session)))
        .media([
            { url: reactionGif(session) }
        ]);
}
// var order = 1234;
// function createReceiptCard(session) {
//     return new builder.ReceiptCard(session)
//         .title('John Doe')
//         .facts([
//             builder.Fact.create(session, order++, 'Order Number'),
//             builder.Fact.create(session, 'VISA 5555-****', 'Payment Method')
//         ])
//         .items([
//             builder.ReceiptItem.create(session, '$ 38.45', 'Data Transfer')
//                 .quantity(368)
//                 .image(builder.CardImage.create(session, 'https://github.com/amido/azure-vector-icons/raw/master/renders/traffic-manager.png')),
//             builder.ReceiptItem.create(session, '$ 45.00', 'App Service')
//                 .quantity(720)
//                 .image(builder.CardImage.create(session, 'https://github.com/amido/azure-vector-icons/raw/master/renders/cloud-service.png'))
//         ])
//         .tax('$ 7.50')
//         .total('$ 90.95')
//         .buttons([
//             builder.CardAction.openUrl(session, 'https://azure.microsoft.com/en-us/pricing/', 'More Information')
//                 .image('https://raw.githubusercontent.com/amido/azure-vector-icons/master/renders/microsoft-azure.png')
//         ]);
// }
function reactionGif(session){
    var x = 1.0;
    if (x >= 0.5){
        return postitve[getRandomInt(1,3)];
    } else {
        return negative[getRandomInt(1,3)];
    }
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
