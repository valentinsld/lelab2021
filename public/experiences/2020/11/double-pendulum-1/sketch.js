function setup() {
  const width = 900
  const height = 700
  // createCanvas(width, height);
  createCanvas(windowWidth, windowHeight);
  noiseDetail(2, 0.2);

  pendules = [
    // pendule = new Pendule(0, 0),
    // pendule2 = new Pendule(0, 0),
  ]
  
  for(a = -250; a < 250 ; a += 100) {
        pendules.push(new Pendule(a, 0))
  }

  time = 0
}

function draw() {
  background(250, 250, 250, 150);

  time += 0.02

  translate(width / 2, height / 2)
  // rotate(PI /4);
  pendules.forEach(p => {
    p.draw()
  })

}

class Pendule {
  constructor(x, y) {
    this.center = {
      x: x,
      y: y
    }
    this.radius = 100
    this.points = 2
    this.random = Math.random() * 10000
  }
  draw() {
    // Point 0
    const {
      x,
      y
    } = this.center


    // Point 1
    const noiseA = noise(time + this.random) * Math.PI * 5
    const x1 = x + Math.cos(noiseA) * this.radius
    const y1 = y + Math.sin(noiseA) * this.radius

    // Point 2
    const noiseB = noise(time + 8000 + this.random) * Math.PI * 5
    const x2 = x1 + Math.cos(noiseB) * this.radius
    const y2 = y1 + Math.sin(noiseB) * this.radius

    // Points
    fill('black');
    noStroke();
    circle(x, y, 10)
    circle(x1, y1, 10)
    circle(x2, y2, 10)

    // Lines
    noFill();
    stroke('black');
    line(x, y, x1, y1)
    line(x1, y1, x2, y2)
  }
}