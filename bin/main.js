"use strict";

var net = require('net');
var router = require("../handler");
var mgr_session = require("../mgr/mgr_session");
var handler_match = require("../handler/handler_match");
var handler_room = require("../handler/handler_room");
var handler_battle = require("../handler/handler_battle");
var WAIT_TIMEOUT = 5000;
var PING_TIMEOUT = 5000;

var s = net.createServer(function (socket) {
    var buffer = '';
    var waitTimeOut;
    var pingTimeOut;
    let session = mgr_session.openSession(socket);
    //socket config
    socket.setEncoding('utf8');
    socket.setKeepAlive(true, 2000);
    //data
    socket.on('data', function (data) {
        clearTimeout(waitTimeOut);
        clearTimeout(pingTimeOut);
        buffer += data;
        var idx;

        while (~(idx = buffer.indexOf('\n'))) {
            try {
                var recvData = buffer.substring(0, idx);
                //console.log(recvData)
                var parsed_data = JSON.parse(recvData);
                if (parsed_data['type'] !== "heartbeat")
                    router.route(session, parsed_data['type'], parsed_data['message']);
            }
            catch (ex) {
                console.log(ex);
            }
            buffer = buffer.substring(idx + 1);
        }

        waitTimeOut = setTimeout(function () {
            session.resp("heartbeat", "succ", "");
            pingTimeOut = setTimeout(function () {
                socket.destroy();
            }, PING_TIMEOUT);
        }, WAIT_TIMEOUT);

    });

    socket.on('close', function () {
        handler_match.match_leave(session, "");
        handler_room.room_leave(session, "");
        handler_battle.battle_end(session, "");
        mgr_session.closeSession(session.guid);
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