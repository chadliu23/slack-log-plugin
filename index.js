"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

var app = express();

var config = {
    token: process.env.TOKEN ||'', // get from https://api.slack.com/web#basics
    income_url: process.env.INCOME_URL || '',
    outcome_token: process.env.OUTCOME_TOKEN || '',
    // optionals
    floodProtection: true,
    silent: false // keep the bot quiet
};

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
  response.send('Hello world');
});


app.post('/slack', function(request, response) {
    let playload = request.body;

    if (config.token !== '' && config.token !== playload.token) {
        response.sendStatus(404);
        response.end();
        return;
    }

    console.log('Text: ' + playload.text);
    console.log('user_name: ' + playload.user_name);
    console.log('channel_name: ' + playload.channel_name);
    // console.log('channel_id: ' + playload.channel_id);
    // console.log('user_id: ' + playload.user_id);
    // console.log('team_id: ' + playload.team_id);
    // console.log('token: ' + playload.token);
    response.sendStatus(200);
    response.end();
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


