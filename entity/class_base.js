var enhance = require("./enhance")
class Base {
    constructor() {

    }
    safe_obj() {
        Object.preventExtensions(this);
        return enhance.createDefensiveObject(this);
    }
}
module.exports = Base;