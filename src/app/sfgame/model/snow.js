import createjs from 'createjs'
export default class Snow {
    constructor(options) {
        this.x = options.x
        this.y = options.y
        this.r = options.r
        this.orientation = this.randOrientation()
        this.speed = this.randSpeed()
    }
    randOrientation() {
        return Math.floor(Math.random() * 2)
    }
    randSpeed() {
        return 1 + parseFloat((Math.random() * 0.5).toFixed(1))
    }
    paint(graphics) {
        graphics.beginRadialGradientFill(
            ['#fff', 'rgba(255, 255, 255, 0)'], 
            [0, 1], 
            this.x, this.y, 0, 
            this.x, this.y, this.r
        )
        .drawCircle(this.x, this.y, this.r)
    }
}
