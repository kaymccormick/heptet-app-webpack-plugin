const axios = require('axios');
module.exports = class HeptetApp {
    constructor(options) {
        this.options = options;
        this.url = options.entry_points_json_endpoint;
        if (!this.url) {
            console.log("Warning: no endpoint provided");
        }
        this.entry_points = undefined
    }

    get_entry_points() {
        if (this.entry_points) {
            return Promise.resolve(this.entry_points);
        } else {
            const me = this;
            return new Promise(function (resolve, reject) {
                axios.get(me.url, {
                    transform_response: function (response) {
                        return JSON.parse(response);
                    }
                }).then(function (data) {
                    resolve(me.entry_points = data.data.entry_points)
                });
            });
        }
    }
};


