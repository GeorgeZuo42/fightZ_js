var world = require("./world")
function aoi_enter(conn, params) {
    let result = world.getPlayers();
    let json = JSON.stringify(result);
    for(var singleConn of world.getPlayers())
        singleConn.conn.resp("aoi_enter","succ",json);
}


exports.aoi_enter = aoi_enter;