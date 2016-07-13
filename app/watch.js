const fs = require('fs')
const path = require('path')
const less = require('less')

const stylesDir = path.join(__dirname, '..', 'sass')
const cssDir = path.join(process.cwd(), 'public', 'style')

let isCompiling = false;

fs.watch(stylesDir, { recursive: true }, (event, file) => {
    if (isCompiling) return
    isCompiling = true
    setTimeout(function () {
        isCompiling = false
    }, 100);
    const content = fs.readFileSync(path.join(stylesDir, file), 'utf-8')
    less.render(content).then(output => {
        const cssFilename = path.basename(file, '.less') + '.css'
        fs.writeFileSync(path.join(cssDir, cssFilename), output.css)
    })
})