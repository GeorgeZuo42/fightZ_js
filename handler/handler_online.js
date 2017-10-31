var OnlinePlayer = require("../entity/class_online_player")

var online_players = new Map();
function is_online(guid) {
    return online_players.has(guid);
}
///username 用户名
function online_join(self, params) {
    if (online_players.has(params["username"])) {
        self.resp("online_join", "error", "already login");
    }
    else {
        online_players.set(self.guid, new OnlinePlayer(params["username"]));
        self.resp("online_join", "succ", self.guid);
    }
}
function online_leave(self, params) {
    if (online_players.has(params["username"])) {
        online_players.delete(params["username"]);
        self.resp("online_leave", "succ", "");
    }
    else {
        self.resp("online_leave", "error", "not username found");
    }
}
function online_list(self, params) {
    console.log("online_list");
}

exports.online_join = online_join;
exports.online_leave = online_leave;
exports.is_online = is_online;