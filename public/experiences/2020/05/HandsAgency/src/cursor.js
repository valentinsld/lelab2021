export class cursor {
  constructor(options) {
    /* CURSOR */
    this.ball = document.querySelector(options.id);

    this.mouseX = 0;
    this.mouseY = 0;

    this.ballX = 0;
    this.ballY = 0;

    this.speed = options.speed;

    document.addEventListener("mousemove", (e) => {
      this.cursorMoove();
    });

    this.animate();
  }
  cursorMoove() {
    this.mouseX = event.pageX;
    this.mouseY = event.pageY;
  }

  animate() {
    var that = this;

    let distX = that.mouseX - that.ballX;
    let distY = that.mouseY - that.ballY;

    that.ballX += distX * that.speed;
    that.ballY += distY * that.speed;

    that.ball.style.left = that.ballX + "px";
    that.ball.style.top = that.ballY + "px";
  }
}
