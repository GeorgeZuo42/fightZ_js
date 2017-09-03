var normalizedPath = require("path").join(__dirname, "");
var skill_table = {}
require('fs').readdirSync(normalizedPath).forEach(function (file) {
    if (file.match(/\.js(on)?$/) && file !== 'index.js') {
        var name = file.replace('.js', '');
        skill_table[name] = require('./' + file);
        //exports[name] = 
    }
});

function route(skill_name, env) {
    let skillData = skill_table["skill_" + skill_name];
    for (let caster of skillData.GetCasters(env)) {
        return skillData.GetResults(env,caster,skillData.GetTargets(env));
    }
}

exports.route = route;