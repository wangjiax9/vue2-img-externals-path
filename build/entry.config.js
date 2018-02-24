const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 入口文件
const entryFiles = {}
// 模板文件
const htmlPluginsArr = []
const baseDir = './src/app'


function scanDir(baseDir){
    let fileList = fs.readdirSync(baseDir)
    fileList.forEach(file => {
        const filePath = `${baseDir}/${file}`
        analyzeFile(fs.readdirSync(filePath), filePath)
    })
}
function analyzeFile(fileList, dir){
    try {
        fileList.forEach(file => {
            const filePath = `${dir}/${file}`
            const stat = fs.statSync(filePath)
            if(stat.isFile()){
                if(path.extname(filePath) == '.js'){
                    const p = path.parse(filePath);
                    const reg = new RegExp(baseDir+'\/?','g')
                    const fileName = p.dir.replace(reg,'')+'/'+p.name;
                    entryFiles[fileName] = path.resolve(__dirname,'..', filePath)
                }
            }else{
                
            }
        })
    } catch (e) {
        throw new Error(e)
    }
}
function getHtmlPluginsArr(entryFiles){
    for (var entry in entryFiles) {
        if (entryFiles.hasOwnProperty(entry)) {
            var fileName = `${entry}.html`
            var conf = {
                env:process.env.NODE_ENV,
                filename: path.resolve(__dirname, '../dist', fileName),
                template: path.join(baseDir, fileName),
                inject: process.env.NODE_ENV === 'production' ? false : true,
                chunks: [entry,'vendor','manifest'],
                chunksSortMode: 'dependency'
            };
            // console.log(conf)
            htmlPluginsArr.push(new HtmlWebpackPlugin(conf))
        }
    }
}
scanDir(baseDir)
console.log(entryFiles)
getHtmlPluginsArr(entryFiles)
module.exports = {
    entryFiles:entryFiles,
    htmlPluginsArr:htmlPluginsArr
}