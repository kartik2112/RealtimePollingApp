/*
Reference webpage: https://codeforgeek.com/real-time-notification-system-using-socket-io/
*/

var express = require('express');
var app = express();
var path = require("path");
var http = require("http").Server(app);
var io = require("socket.io")(http);
var router  = express.Router();

var polls = {A:3,B:1};


// Home page will fetch the index.html page
router.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'../Client','/index.html'));
});


// This will return all the polls collected - basically the polls object
router.get('/getPolls',function(req,res){
    return res.json(polls);
}); 





app.use('/',router);

http.listen(3000,function(){
    console.log("Listening on 3000");
});