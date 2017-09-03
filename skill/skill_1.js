var util = require("../util")
function GetTargets(env) {
    console.log("hello");

    let index = util.getRandomIntInclusive(0, env.players.length-1);

    console.log(env.players.length);
    console.log(index);
    return env.players[index].name;
}

function GetCasters(env) {
    return [env.caster];
}

function GetResults(env, casters, targets) {
    
    return {name:targets,damage:50};
}

exports.GetTargets = GetTargets;
exports.GetResults = GetResults;
exports.GetCasters = GetCasters;