var Base = require("./class_base")
class Conn extends Base{
    constructor(socket) {
        super();

        this._addr = socket.remoteAddress;
        this._socket = socket;
        this._name = "";
        return super.safe_obj();
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get addr() {
        return this._addr;
    }
    set addr(value) {
        this._addr = value;
    }
    get socket() {
        return this._socket;
    }
    set socket(value) {
        this._socket = value;
    }

    resp(prototype, status, message) {
        var result = new Object();
        result.type = prototype;
        result.status = status;
        result.message = message;
        console.log("resp "+this.socket.remoteAddress+"@"+this.socket.remotePort+" " + JSON.stringify(result));
        this.socket.write(JSON.stringify(result) + '\n');
    }
    req(prototype, message) {
        var result = new Object();
        result.type = prototype;
        result.message = message;
        //console.log("req "+this.socket.remoteAddress+"@"+this.socket.remotePort+" " + JSON.stringify(result));
        this.socket.write(JSON.stringify(result) + '\n');
    }
}
module.exports = Conn;