"use strict";

var net = require('net');
var router = require("./router");
var world_mgr = require("./world")
var Conn = require("./class_conn");


var WAIT_TIMEOUT = 5000;
var PING_TIMEOUT = 5000;
var socketConns = new Map();
var s = net.createServer(function (socket) {
    var buffer = '';
    var waitTimeOut;
    var pingTimeOut;
    socket.setEncoding('utf8');

    socket.setKeepAlive(true, 2000);
    socket.on('data', function (data) {
        clearTimeout(waitTimeOut);
        clearTimeout(pingTimeOut);
        buffer += data;
        var idx;

        while (~(idx = buffer.indexOf('\n'))) {
            try {
                var comm = JSON.parse(buffer.substring(0, idx));
                console.log("req "+socket.remoteAddress+"@"+socket.remotePort+" " + buffer.substring(0, idx));
                if(!socketConns.has(socket))
                    socketConns.set(socket,new Conn(socket));  
                router.route(socketConns.get(socket), comm);
            }
            catch (ex) {
                console.log(ex);
            }
            buffer = buffer.substring(idx + 1);
        }
        
        waitTimeOut = setTimeout(function () {
            if(world_mgr.getPlayer(socket)){
                world_mgr.getPlayer(socket).conn.req("heartbeat", "");
                pingTimeOut = setTimeout(function () {
                    socket.destroy();
                }, PING_TIMEOUT);
            }

        }, WAIT_TIMEOUT);

    });
    socket.on('close', function () {
        socketConns.delete(socket);
        world_mgr.delPlayer(socket);
    });
    socket.on('disconnect', function () {
        console.log("disconnect");
    });
    socket.on("error", function (err) {
        console.log("error " + err);
    });
    socket.on('end', function () {
        console.log("disconnect");
    });
    socket.on('timeout', function () {
        console.log("disconnect");
    });
});
s.listen(5678);
console.log("server started")