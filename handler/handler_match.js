var match_queue = new Set();
var config_global = require("../config/config_global");
var handler_online = require("./handler_online");
var handler_room = require("./handler_room");
var mgr_session = require("../mgr/mgr_session");
var handler_battle = require("../handler/handler_battle")
function match_join(self, params) {
    if (!handler_online.is_online(self.guid)) return;
    console.log("room_join");
    if (match_queue.add(self.guid).size >= config_global.MAX_ROOM_CAPACITY) {
        var room_id = handler_room.room_open(self, params);
        console.log(room_id);
        for (let guid of match_queue) {
            handler_room.room_join(mgr_session.getSessionByID(guid), { 'room_id': room_id });
        }
        match_queue.clear();
        
        handler_battle.battle_start(self, { 'room_id': room_id });
        handler_battle.battle_enter(self, "");
    }
}

function match_leave(self, params) {
    console.log("room_leave");
    match_queue.delete(self.guid);
}

function match_list(self, params) {
    console.log("room_list");
}
exports.match_join = match_join;
exports.match_leave = match_leave;
exports.match_list = match_list;