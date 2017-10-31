var Enum = require("../entity/class_enum")
class GameStatus extends Enum {}
GameStatus.initEnum(
    ['Online', 
    'Queue', 
    'Room',
    'Offline']);
module.exports = GameStatus;