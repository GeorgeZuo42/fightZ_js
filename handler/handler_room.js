var room_id = 0;
var rooms = new Map();
var Room = require("../entity/class_room")
function get_room_members(room_id) {
    return rooms.get(room_id).members;
}
function get_room(room_id) {
    return rooms.get(room_id);
}
function room_open(self, params) {
    room_id++;
    rooms.set(room_id, new Room(room_id));
    rooms.get(room_id).members.add(self.guid);
    return room_id;
}
function room_join(self, params) {
    self.room_id = params['room_id'];
    if (!rooms.has(params['room_id'])) {
        console.log("no room_id for " + params['room_id']);
        return;
    }
    rooms.get(room_id).members.add(self.guid);
}

function room_leave(self, params) {
    if (rooms.has(self.room_id))
        rooms.get(self.room_id).members.delete(self.guid);
    self.room_id = 0;
    console.log("room_leave");
}

function room_list(self, params) {
    console.log("room_list");
}
exports.room_join = room_join;
exports.room_leave = room_leave;
exports.room_list = room_list;
exports.room_open = room_open;
exports.get_room = get_room;
exports.get_room_members = get_room_members;