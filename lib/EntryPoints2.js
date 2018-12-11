const axios = require('axios');

module.exports = class EntryPoints {
    constructor(url) {
        this.url = url;
        this.my_promise = undefined;

        if (!url) {
            throw (new Error("Need url endpoint for HeptetAppEntryPoints"));
        }
    }

    getEntryPointsPromise() {
        if (this.my_promise) {
            return this.my_promise;
        }
        const url = this.url;
        const o = this;
        this.my_promise =
            new Promise(function (resolve, reject) {
                axios.get(url, {
                    transform_response: function (response) {
                        return JSON.parse(response);
                    }
                }).then(x => x.data.entry_points)
                    .then(x => {
                        o.entry_points = x;
                        return x;
                    })

                    .then(resolve)
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
