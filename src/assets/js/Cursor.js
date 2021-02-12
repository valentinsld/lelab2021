import { lerp } from './utils/Math'

export default class cursor {
  constructor(options) {
    /* CURSOR */
    this.ball = document.querySelector(options.id)

    this.mouseX = 0
    this.mouseY = 0

    this.ballX = 0
    this.ballY = 0

    this.translateX = 0
    this.translateXTarget = 0

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
    let distX = this.mouseX - this.ballX
    let distY = this.mouseY - this.ballY

    this.translateX = lerp(this.translateX, this.translateXTarget, 0.5)
    this.ballX = lerp(this.mouseX - this.translateX, this.ballX, this.speed)
    this.ballY = lerp(this.mouseY, this.ballY, this.speed)

    this.ball.style.left = this.ballX + 'px'
    this.ball.style.top = this.ballY + 'px'

    let skew = ((distX + distY) / 4) * this.speed
    if (skew >= 50) skew = 50
    this.ball.style.transform = `translate3d(-50%, -50%, 0) skew(${skew}deg)`
  }

  translate(x) {
    console.log(x)
    this.translateXTarget = x
  }
}
