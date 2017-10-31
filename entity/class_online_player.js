var Base = require("./class_base")
class OnlinePlayer extends Base {
    constructor(_username) {
        super();
        this.username = _username;
        return super.safe_obj();
    }

}
module.exports = OnlinePlayer;