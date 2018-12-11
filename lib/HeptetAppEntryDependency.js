const ModuleDependency = require("webpack/lib/dependencies/ModuleDependency");

class HeptetAppEntryDependency extends ModuleDependency {
    constructor(request) {
        super(request);
    }

    get type() {
        return "app entry";
    }

}

module.exports = HeptetAppEntryDependency;