const watcher = require('./watch')
const config = require('yargs')
    .option('w', {
        alias: 'watchDir',
        type: 'string',
        default: 'less',
        describe: 'Define what directory to watch'
    })
    .option('o', {
        alias: 'outputDir',
        type: 'string',
        defult: 'dist',
        describe: 'Define what directory to output compiled LESS to'
    })
    .demand(['w','o'])
    .argv

watcher.start(config.watchDir.replace(' ', ''), config.outputDir.replace(' ', ''))