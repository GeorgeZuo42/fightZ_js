var Base = require("./class_base")
class Player extends Base{
    constructor(conn, name, pos_x, pos_y,hp) {
        super();

        this.name = name;
        this.pos_x = pos_x
        this.pos_y = pos_y;
        this.conn = conn;
        this.hp = hp;
        return super.safe_obj();
    }
    toJSON() {
        return {
            name: this.name,
            pos_x: this.pos_x,
            pos_y: this.pos_y,
            hp: this.hp
        };
    }
}
module.exports = Player;