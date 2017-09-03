var world = require("./world")

function castSkill(conn, params) {
    for(var singlePlayer of world.getPlayers()){
        // if(singlePlayer.conn.socket !== conn.socket ){
            console.log(singlePlayer.name);
            params.name = conn.name;
            let result = JSON.stringify(params);
            singlePlayer.conn.resp("skill","succ",result);
        // }
    }


}

exports.castSkill = castSkill;