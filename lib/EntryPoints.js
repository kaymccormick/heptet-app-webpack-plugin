const axios = require('axios');

module.exports = class EntryPoints {
    constructor(options) {
        this.options = options;
        this.my_promise = undefined;

        if (!options.filename) {
            throw new Error("Need filename for EntryPoints");
        }
    }

    getEntryPointsPromise() {
        if (this.my_promise) {
            return this.my_promise;
        }
        const filename = this.options.filename;
        const o = this;
        this.my_promise =
            new Promise(function (resolve, reject) {
                try {
                    const entryPoints = require(filename);
                    resolve(entryPoints);
                } catch (error) {
                    reject(error);
                }
            });
        return this.my_promise;
    }

    entryPointsToEntry(entry_points) {
        if (!entry_points) {
            throw(new Error("Need entry points."));
        }
        const entry = Object.create(null);
        for (const ep of entry_points) {
            entry[ep.key] = ep.fspath;
        }
        return entry;
    }

};
