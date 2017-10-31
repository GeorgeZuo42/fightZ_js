function createDefensiveObject(target) {

    return new Proxy(target, {
        get: function (target, property) {
            if (property in target) {
                return target[property];
            } else {
                throw new ReferenceError("Property \"" + property + "\" does not exist.");
            }
        }
    });
}

exports.createDefensiveObject = createDefensiveObject;