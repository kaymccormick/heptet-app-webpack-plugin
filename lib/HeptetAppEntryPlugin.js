const AppEntryDependency = require("./HeptetAppEntryDependency");

class HeptetAppEntryPlugin {
    constructor(context, resolverFactory, entry, name) {
        this.context = context;
        this.entry = entry;
        this.name = name;
        this.resolverFactory = resolverFactory
    }

    apply(compiler) {
        const plugin = "AppEntryPlugin"
        compiler.hooks.compilation.tap(plugin, (compilation, {normalModuleFactory}) => {
            // experiment with supplying our own factory here eventually
            compilation.dependencyFactories.set(AppEntryDependency, normalModuleFactory);
        });
        compiler.hooks.make.tapAsync(plugin, (compilation, callback) => {
                const {entry, name, context} = this;

                const dep = HeptetAppEntryPlugin.createDependency(entry, name);
                console.log("!!! entry = ", entry)
                compilation.addEntry(context, dep, name, callback);
            }
        );
    }

    static createDependency(entry, name) {
        const dep = new AppEntryDependency(entry);
        dep.loc = {name};
        return dep;
    }

}

module.exports = HeptetAppEntryPlugin;