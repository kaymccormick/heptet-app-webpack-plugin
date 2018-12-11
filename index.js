const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {spawn} = require('child_process');
const entryPoints = require('./lib/EntryPoints')

const AppEntryPlugin = require('./lib/HeptetAppEntryPlugin');

class HeptetAppWebpackPlugin {
    constructor(options) {
        this.options = options;
        this.entryPoints = entryPoints;

    }

    apply(compiler) {
        const appPlugin = this;
        const options = this.options;

        for (let ep of options.entryPoints) {
            console.log("ep path = " + options.templateOutputPath);
            const h = new HtmlWebpackPlugin({
                title: '',
                template: options.htmlWebpackPluginTemplateFunc(ep),
                filename: path.resolve(options.templateOutputPath, 'entry_point/' + ep.key + '.jinja2'),
                inject: false,
                chunks: [ep.key],
            });
            console.log(h. options);
            h.apply(compiler);
        }
//
//         // const entryOption = (context, entry) => {
//         //     console.log("i got ", entry);
//         //     return appPlugin.webpackEntry();
//         // };
//         var plugin = {name: 'HeptetAppWebpackPlugin'};
//         compiler.hooks.afterPlugins.tap(plugin, afterPlugins);

// //        compiler.hooks.entryOption.tap(plugin, entryOption);
    }

//
    addFileToAssets(content, basename, compilation) {
        compilation.assets[basename] = {
            source: () => content,
            size: () => content.length,
        };
        return Promise.resolve(basename);
    }


    entryPointsToEntry() {
        const entry_points = this.options.entryPoints;
        if (!entry_points) {
            throw(new Error("Need entry points."));
        }
        const entry = Object.create(null);
        for (const ep of entry_points) {
            entry[ep.key] = ep.fspath;
        }
        return entry;
    }

}

module.exports = HeptetAppWebpackPlugin;
