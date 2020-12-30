const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let cx = canvas.width / 2;
let cy = canvas.height / 2;

let ctx = canvas.getContext("2d");

let time = 0;
let x = 0;
let y = 0;
let r = 200;

let z = 1;

let circles = [
  new circle(cx, cy, r, 0),
  new circle(cx, cy, r, Math.PI*1/3),
  new circle(cx, cy, r, Math.PI*2/3),
  new circle(cx, cy, r, Math.PI),
  new circle(cx, cy, r, Math.PI*4/3),
  new circle(cx, cy, r, Math.PI*5/3),
];

// for (let i = 0; i < 8; i++) {
//     circles.push(
//         new circle(cx, cy, r, (Math.PI/2 / 8) * 1),
//     )
// }

function circle(cx, cy, r, a) {
  this.cx = cx;
  this.cy = cy;

  this.x = cx + r * Math.cos(this.angle);
  this.y = cy + r * Math.sin(this.angle) * z;
  this.r = r;

  this.angle = a;

//   this.color = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
//     Math.random() * 255
//   )}, ${Math.floor(Math.random() * 255)})`;
    this.color = 'rgb(210,210,210)'

  this.draw = function () {
    this.x = this.cx + this.r * Math.cos(this.angle);
    this.y = this.cy + this.r * Math.sin(this.angle) * z;

    this.angle += 0.01;

    ctx.beginPath();
    ctx.arc(this.x, this.y, 30 * sin(this.angle) + 20, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.strokeStyle = "rgb(58,58,58)"
    ctx.lineWidth = 5
    ctx.stroke()
    ctx.fill();
  };
}

function gameLoop() {
  ctx.fillStyle = "rgba(22, 22, 22,0.8)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.arc(cx, cy, 2, 0, Math.PI * 2, false);
  ctx.fillStyle = "rgb(58,58,58)";
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(
    cx,
    cy,
    r * Math.cos(0),
    r * Math.sin(Math.PI / 2) * z,
    0,
    0,
    2 * Math.PI
  );
  ctx.strokeStyle = 'white'
  ctx.lineWidth = 1
  ctx.stroke();

  function compare(a, b) {
    if (a.y < b.y) {
      return -1;
    }
    if (a.y > b.y) {
      return 1;
    }
    return 0;
  }

  circles.sort(compare);

  circles.forEach((c) => {
    c.draw();
  });

  window.requestAnimationFrame(gameLoop);
}
gameLoop();

function sin(t) {
  return (Math.sin(t) + 1) * (1 - z);
}

document.addEventListener("mousemove", function (evt) {
  z = ((evt.clientY - cy) / window.innerHeight) * 2;

  if (z < 0) {
    z *= -1;
  }

  // console.log(z)
});
