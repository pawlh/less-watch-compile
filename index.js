const watcher = require('./watch')
const config = require('yargs')
    .option('watch-directory', {
        alias: 'w',
        type: 'string',
        default: './',
        describe: 'Specify what directory to watch. Defaults to current directory if none is specified'
    })
    .option('output-directory', {
        alias: 'o',
        demandOption: true,
        type: 'string',
        describe: 'Specify what directory to output compiled LESS to'
    })
    .option('file', {
        alias: 'f',
        type: 'string',
        describe: 'Specify a certain file to watch'
    })
    .argv

let input = {
    dir: (!config.f ? config.w : config.f).trim(),
    isFile: !!config.f
    }

watcher.start(input, config.o.trim())
// if (!config.file)
//     watcher.start(config.watchDir.trim(), config.outputDir.trim())
// else
//     watcher.start(config.file.trim(), config.outputDir.trim(), true)