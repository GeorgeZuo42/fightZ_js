var Base = require("./class_base");
var mgr_session = require("../mgr/mgr_session");
class Room extends Base {

    constructor(room_id) {
        super();
        this.members = new Set();
        this.room_id = room_id;
        this.seed = Date.now();
        return super.safe_obj();
    }
    broadcast(type, message) {
        for (let x of this.members) {
            mgr_session.getSessionByID(x).resp(type, "succ", message);
        }
    }
}
module.exports = Room;