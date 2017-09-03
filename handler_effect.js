var world = require("./world")
var skill_mgr = require("./skill")
function castEffect(conn, params) {
    let result = skill_mgr.route(params.id,{players:world.getPlayers(),caster:conn.name});

    for(var singlePlayer of world.getPlayers()){
        // if(singlePlayer.conn.socket !== conn.socket ){
            singlePlayer.conn.resp("skill","succ",JSON.stringify(result));
        // }
    }


}

exports.castEffect = castEffect;