const watcher = require('./watch')
const config = require('yargs')
    .option('w', {
        alias: 'watchDir',
        type: 'string',
        default: '/',
        describe: 'Specify what directory to watch'
    })
    .option('o', {
        alias: 'outputDir',
        type: 'string',
        describe: 'Specify what directory to output compiled LESS to'
    })
    .option('f', {
        alias: 'file',
        type: 'string',
        describe: 'Specify a particular file to watch, rather than watching an entire directory'
    })
    .demand(['o'])
    .argv
if (!config.file)
    watcher.start(config.watchDir.trim(), config.outputDir.trim())
else
    watcher.start(config.file.trim(), config.outputDir.trim(), true)