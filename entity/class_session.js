var Base = require("./class_base")
class Session extends Base {
    constructor(_guid, _socket) {
        super();
        this.guid = _guid;
        this.room_id = 0;
        this.socket = _socket;
        return super.safe_obj();
    }

    resp(_type, _status, _message) {
        var result = new Object();
        result.type = _type;
        result.status = _status;
        result.message = _message;
        console.log("resp " + this.socket.remoteAddress + "@" + this.socket.remotePort + " " + JSON.stringify(result));
        this.socket.write(JSON.stringify(result) + '\n');
    }

}
module.exports = Session;