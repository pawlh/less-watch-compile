const watcher = require('./watch')
const config = require('yargs')
    .option('w', {
        alias: 'watchDir',
        type: 'string',
        describe: 'Specify what directory to watch'
    })
    .option('o', {
        alias: 'outputDir',
        type: 'string',
        describe: 'Specify what directory to output compiled LESS to'
    })
    .demand(['w','o'])
    .argv

watcher.start(config.watchDir.replace(' ', ''), config.outputDir.replace(' ', ''))