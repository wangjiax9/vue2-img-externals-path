import createjs from 'createjs'
import Snow from './model/snow'
require('./style/style.scss')

var config = {
    width: document.body.offsetWidth,
    height: document.body.offsetHeight
}
var stage, loader
let snowDatas = []
var cvs = document.getElementById('cvs')
cvs.width = config.width
cvs.height = config.height

stage = new createjs.Stage(cvs)
stage.name = 'stage'

const sg = new createjs.Graphics()
const shape = new createjs.Shape(sg)
shape.name = 'snow'

let manifest = [
    {src: require('./images/player.png'), id: 'p'}
]
loader = new createjs.LoadQueue(false)
loader.loadManifest(manifest)
loader.addEventListener('complete', handleComplete)
function handleComplete() {
    const pimg = loader.getResult('p')
    const bgShape = new createjs.Shape()
    bgShape.graphics.beginBitmapFill(pimg).drawRect(0, 0, 380, 266)
    bgShape.x = 280
    stage.addChild(bgShape)
    createSnow()
    createjs.Ticker.addEventListener('tick', handleTick)

}
function handleTick(event) {
    updateSnow()
    stage.update()
}

/**
 * 更新雪花 
 */
function updateSnow() {
    sg.clear()
    snowDatas.forEach(snow => {
        if(snow.orientation === 0) {
            snow.x = parseFloat(snow.x) - parseFloat((Math.random() / 10).toFixed(3))
        }else {
            snow.x = parseFloat(snow.x) + parseFloat((Math.random() / 10).toFixed(3))
        }
        if(snow.y >= config.height || snow.x < 0 || snow.x > config.width) {
            snow.orientation = snow.randOrientation()
            snow.speed = snow.randSpeed()
            snow.y = 0
        }else {
            snow.y = parseFloat(snow.y) + snow.speed
        }
        snow.paint(sg)
    })
}
/**
 * 创建雪花
 */
function createSnow() {
    stage.addChild(shape)
    for (let i = 0; i < 50; i++) {
        let snow = new Snow({
            x: (Math.random() * config.width).toFixed(2),
            y: (Math.random() * (config.height)).toFixed(2),
            r: (Math.random() * 6).toFixed(2)
        })
        snow.paint(sg)
        snowDatas.push(snow)
    }
}