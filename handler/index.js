var normalizedPath = require("path").join(__dirname, "");
var handler_table = {}
require('fs').readdirSync(normalizedPath).forEach(function (file) {
    if (file.match(/\.js(on)?$/) && file !== 'index.js') {
        var name = file.replace('.js', '');
        handler_table[name] = require('./' + file);
    }
});

function route(self, type, params) {
    let handler = handler_table["handler_" + type.split("_")[0]];
    handler[type](self, params);
}

exports.route = route;