"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data
var pg = require('pg');

var app = express();

var config = {
    token: process.env.TOKEN ||'', // get from https://api.slack.com/web#basics
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
        response.sendStatus(401);
        response.end();
        return;
    }

    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        client.query('insert into slack_log(channel_name, channel_id, user_id, user_name, text) values($1, $2, $3, $4, $5)', 
            [playload.channel_name, playload.channel_id, playload.user_id, playload.user_name, playload.text],
            function(err, result) {
              done();
              if (err)
               { console.error(err); response.send("Error " + err); }
        });
    });

    response.sendStatus(200);
    response.end('done');
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


