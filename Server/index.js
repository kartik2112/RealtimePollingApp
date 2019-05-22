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


var noOfUsers = 0;

io.on('connection',function(socket){
    // This function will be called when a new connection is established
    
    console.log('New user connected !');
    noOfUsers++;

    console.log("Total "+noOfUsers+" users are connected");

    // This event will be emitted from Client when some one add comments.
    socket.on('voted',function(data){
        console.log("Received Vote",data)
        polls[data.vote]++;
        console.log(polls);

        io.emit('notify0everyone',polls); // for all.
        // socket.broadcast.emit("notify0everyone",polls); // for all except me.


        
        // Add the comment in database.
        // db.addComment(data.user,data.comment,mysql,pool,function(error,result){
        //     if (error) {
        //         io.emit('error');
        //     } else {
        //         // On successful addition, emit event for client.
        //         socket.broadcast.emit("notify everyone",{user : data.user,comment : data.comment});
        //     }
        // });
    });
});