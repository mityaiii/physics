const mu = 4 * Math.PI * Math.pow(10, -7);
const arrowSize = 5;
const degree = Math.pow(11, 9);

const canvas = document.getElementById("my-canvas");
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

const ctx = canvas.getContext("2d");
const inputs = document.getElementById("inputs");

let isAddingMod = false;

ctx.fillStyle = "rgb(0 0 255)";
ctx.strokeStyle = "rgb(50 40 180 / 100%)";

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  copy() {
    return new Point(this.x, this.y);
  }
}

let sources = [];

class Circle {
  constructor(center, radius, value) {
    this.center = center;
    this.radius = radius;
    this.value = value;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);

    ctx.fillStyle = 'blue';
    ctx.font = '24px Arial';

    const textWidth = ctx.measureText(this.value).width;

    const textX = this.center.x - textWidth / 2;
    const textY = this.center.y + 6;

    ctx.fillText(this.value, textX, textY);

    ctx.stroke();
  }
}

class Vector {
  constructor(firstPoint, secondPoint, modul) {
    this.firstPoint = firstPoint;
    this.secondPoint = secondPoint;
    this.modul = modul;
  }

  getLength() {
    return Math.sqrt(Math.pow(this.secondPoint.x - this.firstPoint.x, 2) + Math.pow(this.secondPoint.y - this.firstPoint.y, 2));
  }

  getFirstPoint() {
    return new Point(this.x, this.y);
  }

  drawArrowHead() {
    const degreesInRadians135 = 135 * Math.PI / 180;
    const degreesInRadians225 = 225 * Math.PI / 180;

    const distX = this.secondPoint.x - this.firstPoint.x;
    const distY = this.secondPoint.y - this.firstPoint.y;
    const angle = Math.atan2(distY, distX);

    const x135 = this.secondPoint.x + arrowSize * Math.cos(angle + degreesInRadians135);
    const y135 = this.secondPoint.y + arrowSize * Math.sin(angle + degreesInRadians135);
    const x225 = this.secondPoint.x + arrowSize * Math.cos(angle + degreesInRadians225);
    const y225 = this.secondPoint.y + arrowSize * Math.sin(angle + degreesInRadians225);

    ctx.moveTo(this.secondPoint.x, this.secondPoint.y);
    ctx.lineTo(x225, y225);
    ctx.moveTo(this.secondPoint.x, this.secondPoint.y);
    ctx.lineTo(x135, y135);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.firstPoint.x, this.firstPoint.y);
    ctx.lineTo(this.secondPoint.x, this.secondPoint.y);

    this.drawArrowHead();
    ctx.stroke();
  }

  static sum(vec1, vec2) {
    const startX = vec1.secondPoint.x - vec1.firstPoint.x;
    const endX = vec2.secondPoint.x - vec2.firstPoint.x;
    const startY = vec1.secondPoint.y - vec1.firstPoint.y;
    const endY = vec2.secondPoint.y - vec2.firstPoint.y;

    return new Vector(
      vec1.firstPoint.copy(),
      new Point(vec1.firstPoint.x + startX + endX, vec1.firstPoint.y + startY + endY),
      vec1.modul + vec2.modul
    )
  }
}

function getB(x, y, center) {
  const radius = Math.sqrt(Math.pow(x - center.center.x, 2) + Math.pow(y - center.center.y, 2));
  if (radius < center.radius) {
    return;
  }

  const modul = Math.pow(10, -7) * center.value / Math.pow(radius, 2);

  const coef1 = Math.max(Math.min((x - center.center.x) * (modul) * degree, 45), -45);
  const coef2 = Math.max(Math.min((y - center.center.y) * (modul) * degree, 45), -45);

  return new Vector(new Point(x, y), new Point(x + coef2, y - coef1), modul);
}

const compile = () => {
  if (sources.length == 0) {
    return;
  }

  for (let x = 0; x < WIDTH; x += 45) {
    for (let y = 0; y < HEIGHT; y += 45) {
      let resVec = new Vector(new Point(x, y), new Point(x, y), 0);
      for (var i = sources.length - 1; i >= 0; i--) {
        let r = Math.sqrt(Math.pow(x - sources[i].x, 2) + Math.pow(y - sources[i].y, 2));
        
        if (r < sources[i].radius) {
          resVec = new Vector(new Point(x, y), new Point(x, y), 0);
          break;
        }

        let vecB = getB(x, y, sources[i]);

        if (vecB != null) {
          resVec = Vector.sum(resVec, vecB)
        }
      }

      resVec.draw(ctx);
    }
  }
}

const clearCanvas = () => {
  sources = [];

  while (inputs.firstChild) {
    inputs.removeChild(inputs.firstChild);
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

canvas.addEventListener('click', function (event) {
  var rect = canvas.getBoundingClientRect();
  var mouseX = event.clientX - rect.left;
  var mouseY = event.clientY - rect.top;

  if (sources.length === 5) {
    alert("Sorry, you already have 5 sources");
    return;
  }

  sources.push(new Circle(new Point(mouseX, mouseY), 25, ''));

  const inputElement = document.createElement('input');
  inputElement.id = `${sources.length - 1}`;

  inputElement.addEventListener('change', function (event) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    sources[inputElement.id].value = parseInt(event.target.value);
    sources.forEach((source) => {
      source.draw(ctx);
    })
  })

  inputElement.classList.add('border', 'rounded-xl', 'border-blue-600', 'text-center', 'text-blue-600', 'w-20', 'px-1');

  inputs.appendChild(inputElement);
  sources[sources.length - 1].draw(ctx);
});
