var Player = require("./class_player")
var util = require("./util")
var playerNames = new Map();
function addPlayer(conn,name) {
    if (!playerNames.has(conn.socket)) {
        conn.name = name;
        playerNames.set(conn.socket, createPlayer(conn,name));
        
        return true;
    }
    return false;
}
function createPlayer(conn,name){
    let x = util.getRandomInt(0,1920);
    let y = util.getRandomInt(0,1080);
    let hp = 100;
    return new Player(conn,name, x, y,hp)
}
function delPlayer(socket) {
    if (playerNames.has(socket)) {
        playerNames.delete(socket);
        return true;
    }
    return false;
}
function getPlayer(socket) {
    if (playerNames.has(socket)) {
        return playerNames.get(socket);
    }
    return null;
}
function getPlayers() {
    return Array.from(playerNames.values());
}
exports.addPlayer = addPlayer
exports.delPlayer = delPlayer
exports.getPlayer = getPlayer
exports.getPlayers = getPlayers