module.exports.start = (input, output) => {
    const fs = require('fs')
    const path = require('path')
    const less = require('less')
    const chalk = require('chalk');

    const home = process.cwd()

    const stylesDir = path.join(home, input)
    const cssDir = path.join(home, output)

    console.log('Watching /' + input)

    let isCompiling = false

    fs.watch(stylesDir, {
        recursive: true
    },
        (event, file) => {
            if (path.extname(file) != '.less') return
            if (isCompiling) return

            console.log((chalk.yellow('Detected change in \'' + stylesDir + '\'')))

            let start = Date.now()

            isCompiling = true
            setTimeout(function () {
                isCompiling = false
            }, 100);
            const content = fs.readFileSync(path.join(stylesDir, file), 'utf-8')

            console.log((chalk.yellow('Attemping to compile ' + file + ' to ' + input)))
            less.render(content).then(
                output => {
                    const cssFilename = path.basename(file, '.less') + '.css'
                    fs.writeFileSync(path.join(cssDir, cssFilename), output.css)

                    console.log(chalk.green('Succesfully compiled in ') + chalk.yellow((Date.now() - start) + 'ms'))
                },
                error => {
                    console.log('Unsuccesful. Failed to render.\n' + error)
                })
        })
}