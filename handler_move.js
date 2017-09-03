var world = require("./world")

function move(conn, params) {
    world.getPlayer(conn.socket).pos_x = params.pos.x.toFixed(2);
    world.getPlayer(conn.socket).pos_y = params.pos.y.toFixed(2);
     
    console.log(world.getPlayers().length);
    for(var singlePlayer of world.getPlayers()){
        // if(singlePlayer.conn.socket !== conn.socket ){
            params.name = conn.name;
            let result = JSON.stringify(params);
            console.log(conn.name+ ":"+singlePlayer.conn.name);
            try {
                singlePlayer.conn.resp("move","succ",result);
            } catch (error) {
                console.log(error);
            }
            
        // }
    }

}

exports.move = move;