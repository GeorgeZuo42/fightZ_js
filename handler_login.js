var world = require("./world")
var router = require("./router")
function login(conn, params) {
    if (!world.addPlayer(conn, params["user_name"])) {
        conn.resp("login","fail","already login");
    }
    else {
        conn.resp("login","succ","");
        var params = new Object();
        params.type = "aoi_enter";
        router.route(conn,params);
    }
}

exports.login = login;