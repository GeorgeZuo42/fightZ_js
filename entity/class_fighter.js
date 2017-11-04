var Base = require("./class_base")
var config_global = require("../config/config_global")
class Fighter extends Base {

    constructor(guid, room_id, pos_x, pos_y) {
        super();
        this.guid = guid;
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.angle = 0;
        this.speed = 0;
        this.hp = config_global.hp;
        this.nickname = "";
        this.team_flag = -1;
        this.room_id = room_id;
        return super.safe_obj();
    }
    toJSON() {
        return {
            guid: this.guid,
            nickname: this.nickname,
            pos_x: this.pos_x,
            pos_y: this.pos_y,
            hp: this.hp
        };
    }
}
module.exports = Fighter;