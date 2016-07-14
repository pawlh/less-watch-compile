module.exports.start = (input, output) => {
    const fs = require('fs')
    const path = require('path')
    const less = require('less')
    const colors = require('colors');

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

            console.log(('Detected change in \'' + stylesDir + '\'').green)

            let start = Date.now()

            isCompiling = true
            setTimeout(function () {
                isCompiling = false
            }, 100);
            const content = fs.readFileSync(path.join(stylesDir, file), 'utf-8')

            console.log(('Attemping to compile ' + file + ' to ' + input).yellow)
            less.render(content).then(
                output => {
                    const cssFilename = path.basename(file, '.less') + '.css'
                    fs.writeFileSync(path.join(cssDir, cssFilename), output.css)

                    console.log('Succesfully compiled in '.green + ((Date.now() - start) + 'ms').yellow)
                },
                error => {
                    console.log('Unsuccesful. Failed to render.\n' + error)
                })
        })
}