var Fighter = require("../entity/class_fighter")
var handler_room = require("../handler/handler_room")
var fighters = new Map();
function battle_start(self, params) {
    for (let guid of handler_room.get_room_members(params['room_id'])) {
        console.log(guid);
        fighters.set(guid, new Fighter(guid, params['room_id']));
    }

}

function battle_end(self, params) {
    self.resp("aoi_leave", "succ", "");
    fighters.delete(self.guid);
}
function battle_enter(self, params) {
    console.log(handler_room.get_room(self.room_id).seed);
    handler_room.get_room(self.room_id).broadcast("aoi_enter",
        {
            'seed': handler_room.get_room(self.room_id).seed,
            'players': Array.from(fighters.values())
        });
}
function battle_action(self, params) {
    if (params === null || params === undefined) {
        params = {};
    }
    params.guid = self.guid;
    handler_room.get_room(self.room_id).broadcast("battle_action", params);
}
function battle_move(self, params) {
    //console.log("1 "+Date.now());
    var item = fighters.get(self.guid);
    fighters.get(self.guid).pos_x = params['pos_x'];
    fighters.get(self.guid).pos_y = params['pos_y'];
    fighters.get(self.guid).angle = params['angle'];
    fighters.get(self.guid).speed = params['speed'];
    var result = []
    result.push({
        "guid": item.guid,
        "pos_x": item.pos_x, "pos_y": item.pos_y,
        "angle": item.angle, "speed": item.speed,
        "timestamp": params["timestamp"]
    });
    handler_room.get_room(self.room_id).broadcast("aoi_move", result);
    //console.log("2 "+Date.now());
}
function battle_stop(self, params) {
    //console.log("1 "+Date.now());
    var item = fighters.get(self.guid);
    fighters.get(self.guid).pos_x = params['pos_x'];
    fighters.get(self.guid).pos_y = params['pos_y'];
    fighters.get(self.guid).angle = params['angle'];
    fighters.get(self.guid).speed = params['speed'];

    var result = []
    result.push({
        "guid": item.guid,
        "pos_x": item.pos_x, "pos_y": item.pos_y,
        "angle": item.angle, "speed": item.speed,
        "timestamp": params["timestamp"]
    });
    handler_room.get_room(self.room_id).broadcast("aoi_stop", result);
    //console.log("2 "+Date.now());
}
exports.battle_enter = battle_enter;
exports.battle_start = battle_start;
exports.battle_stop = battle_stop;
exports.battle_end = battle_end;
exports.battle_move = battle_move;
exports.battle_action = battle_action;