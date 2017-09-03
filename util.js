function strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [k,v] of strMap) {
        // We don’t escape the key '__proto__'
        // which can cause problems on older engines
        obj[k] = v;
    }
    return obj;
}
function objToStrMap(obj) {
    let strMap = new Map();
    for (let k of Object.keys(obj)) {
        strMap.set(k, obj[k]);
    }
    return strMap;
}
function strMapToJson(strMap) {
    return JSON.stringify(strMapToObj(strMap));
}
function jsonToStrMap(jsonStr) {
    return objToStrMap(JSON.parse(jsonStr));
}
/**
 * 返回了一个在指定值之间的随机整数。这个值比min大（如果min不是整数，那么下一个整数大于min）, 以及比max小(但是不等于max).} 
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }
/**
 * 得到一个两数之间的随机整数，包括两个数在内
 */
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
  }
exports.strMapToObj = strMapToObj;
exports.objToStrMap = objToStrMap;
exports.strMapToJson = strMapToJson;
exports.jsonToStrMap = jsonToStrMap;
exports.getRandomIntInclusive = getRandomIntInclusive;
exports.getRandomInt = getRandomInt;