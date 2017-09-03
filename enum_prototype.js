var Enum = require("./class_enum")
class ProtoType extends Enum {}
ProtoType.initEnum(
    ['Login', 
    'AOI', 
    'PING']);
module.exports = ProtoType;