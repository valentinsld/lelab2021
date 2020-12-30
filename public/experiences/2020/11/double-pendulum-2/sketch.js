function setup() {
  createCanvas(windowWidth, windowHeight);
  noiseDetail(1, 0.2);

  pendules = [
    pendule = new Pendule(0, 0),
    pendule2 = new Pendule(0, 0),
  ]

  time = 0


}

function draw() {
  background(0, 0, 0, T);

  time += 0.01


  translate(width / 2, height / 3)
  // rotate(PI /4);
  pendules.forEach(p => {
    p.draw()
  })

  // console.log(pendules[0].p2)
  const DIV = .1
  const points = {
    x1: pendules[0].p2.x + (pendules[0].p1.x - pendules[0].p2.x) / DIV,
    y1: pendules[0].p2.y + (pendules[0].p1.y - pendules[0].p2.y) / DIV,
    x2: pendules[1].p2.x,
    y2: pendules[1].p2.y,
    x3: pendules[0].p2.x,
    y3: pendules[0].p2.y,
    x4: pendules[1].p2.x + (pendules[1].p1.x - pendules[1].p2.x) / DIV,
    y4: pendules[1].p2.y + (pendules[1].p1.y - pendules[1].p2.y) / DIV,
  }

  noFill();
  stroke('red');
  //curve(points.x1, points.y1, points.x2, points.y2,
  //  points.x3, points.y3, points.x4, points.y4);

  stroke(255, 255, 255, 120);
  let steps = 50;
  for (let i = 0; i <= steps; i++) {
    let t = i / steps;
    let x = curvePoint(points.x1, points.x2, points.x3, points.x4, t);
    let y = curvePoint(points.y1, points.y2, points.y3, points.y4, t);
    // ellipse(x, y, 5, 5);
    line(x, y, x, y + 900)
  }


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
    const x1 = x + Math.cos(noiseA) * this.radius * 1.65
    const y1 = y + Math.sin(noiseA) * this.radius * 1.65
    this.p1 = {
      x: x1,
      y: y1
    }

    // Point 2
    const noiseB = noise(time + 8000 + this.random) * Math.PI * 5
    const x2 = x1 + Math.cos(noiseB) * this.radius
    const y2 = y1 + Math.sin(noiseB) * this.radius
    this.p2 = {
      x: x2,
      y: y2
    }

    // Points
    fill('white');
    noStroke();
    circle(x, y, 14)
    circle(x1, y1, 11)
    circle(x2, y2, 11)

    // Lines
    noFill();
    stroke('white');
    line(x, y, x1, y1)
    line(x1, y1, x2, y2)
  }
}