var Conn = require("./class_conn");
let connections = new Map();

function getConn(socket) {
    if(connections.has(socket.remoteAddr))
        return connections.get(socket.remoteAddr);
    else
        console.log("fuck");
}
function addConn(socket)
{
    connections.set(socket.remoteAddr,new Conn(socket));
}
function removeConn(socket){
    connections.delete(socket.remoteAddr);
}
exports.addConn = addConn;
exports.removeConn = removeConn;
exports.getConn = getConn;