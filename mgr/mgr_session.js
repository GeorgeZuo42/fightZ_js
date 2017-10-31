var Session = require("../entity/class_session")
let sessions = new Map();
var curSessionID = 10000;
function openSession(socket) {
    curSessionID++;
    let result = new Session(curSessionID, socket);
    sessions.set(curSessionID, result);
    return result;
}
function getSessionByID(sessionID) {
    return sessions.get(sessionID);
}
function closeSession(sessionID) {
    sessions.delete(sessionID);
}

exports.openSession = openSession;
exports.closeSession = closeSession;
exports.getSessionByID = getSessionByID;
