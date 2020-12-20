export default class cursor {
    constructor(options) {
        /* CURSOR */
        this.ball = document.querySelector(options.id)

        this.mouseX = 0
        this.mouseY = 0

        this.ballX = 0
        this.ballY = 0

        this.speed = options.speed

        document.addEventListener('mousemove', ev => {
            this.cursorMoove(ev)
        })

        this.animate()
    }
    cursorMoove(ev) {
        this.mouseX = ev.pageX
        this.mouseY = ev.pageY
    }

    animate() {
        var that = this

        let distX = that.mouseX - that.ballX
        let distY = that.mouseY - that.ballY

        that.ballX += distX * that.speed
        that.ballY += distY * that.speed

        that.ball.style.left = that.ballX + 'px'
        that.ball.style.top = that.ballY + 'px'

        const skew = (distX + distY) / 4 * that.speed
        that.ball.style.transform = `translate3d(-50%, -50%, 0) skew(${skew}deg)`
    }
}
