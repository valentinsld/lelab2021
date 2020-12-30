// Inspiration :
// https://www.behance.net/gallery/80636811/All-About-Her-Generative-Festival-Identity

function setup() {
  createCanvas(windowWidth, windowHeight);
  // createCanvas(900, 800)
  cx = width / 2;
  cy = height / 2;
  lg = 30
  grid = 6
  time = 0

  lines = []
  // init lines
  for (a = -grid; a < grid; a++) {
    for (b = -grid; b < grid; b++) {
      lines.push(new linee(1.5 * a * lg, 1.5 * b * lg, 0))
    }
  }
}


function draw() {
  time += 0.03
  background(0);


  stroke(255)
  strokeWeight(2)

  lines.forEach(l => {
    l.draw()
  })


  resetMatrix();
  noFill()
  stroke('#e81c26')
  strokeWeight(4)
  circle(mouseX, mouseY, 30);
}

class linee {
  constructor(x, y, r) {
    this.x = x
    this.y = y
    this.r = r
    this.w = 1
  }
  draw() {
    this.r += 0.03

    translate(cx + this.x, cy + this.y);
    var d = dist(mouseX, mouseY, cx + this.x, cy + this.y)
    this.w = d < 300 ? 200/d : 1
    if(this.w > 5) {
      this.w = 4
    }

    rotate(this.r + d / 225)

    strokeWeight(this.w)
    line(lg, 0, 0, 0);
    resetMatrix();
  }

}