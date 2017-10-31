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
    handler_room.get_room(self.room_id).broadcast("aoi_enter", Array.from(fighters.values()));
}
function battle_move(self, params) {
    fighters.get(self.guid).pos_x = params['pos_x'];
    fighters.get(self.guid).pos_y = params['pos_y'];
    fighters.get(self.guid).angle = params['angle'];
    fighters.get(self.guid).speed = params['speed'];
    var result = []
    fighters.forEach(function (item) {
        if (item.room_id === self.room_id)
            result.push({
                "guid": item.guid,
                "pos_x": item.pos_x, "pos_y": item.pos_y,
                "angle": item.angle, "speed": item.speed
            })
    });
    handler_room.get_room(self.room_id).broadcast("aoi_sync", result);
}
exports.battle_enter = battle_enter;
exports.battle_start = battle_start;
exports.battle_end = battle_end;
exports.battle_move = battle_move;