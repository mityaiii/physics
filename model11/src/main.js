const circleAmount = 8;

const width = 700;
const height = 450;

const stage = new Konva.Stage({
  container: 'container',
  width: width,
  height: height,
});

var layer = new Konva.Layer();

let ringGradient = '';
let circleGradient = '';

const drawRing = (innerRadius, outerRadius) => {  
  const ring = new Konva.Ring({
    x: stage.width() / 2,
    y: stage.height() / 2,
    innerRadius: innerRadius,
    outerRadius: outerRadius,
    fillRadialGradientStartPoint: 0,
    fillRadialGradientStartRadius: innerRadius,
    fillRadialGradientEndPoint: 0,
    fillRadialGradientEndRadius: outerRadius,
    fillRadialGradientColorStops: ringGradient,
  });
  
  layer.add(ring);
}

const drawCircle = (radius) => {
  var circle = new Konva.Circle({
    x: stage.width() / 2,
    y: stage.height() / 2,
    radius: radius,
    fillRadialGradientStartPoint: 0,
    fillRadialGradientStartRadius: 0,
    fillRadialGradientEndPoint: 0,
    fillRadialGradientEndRadius: radius,
    fillRadialGradientColorStops: circleGradient,
  });

  layer.add(circle);
}

const setMax = () => {
  ringGradient = [0, 'black', 0.5, 'white', 1, 'black'];
  circleGradient = [0, 'white', 0.3, 'rgb(225, 225, 225)', 0.7, 'rgb(135, 135, 135)', 1, 'black']
}

const setMin = () => {
  ringGradient = [0, 'white', 0.5, 'black', 1, 'white'];
  circleGradient = [0, 'black', 0.3, 'rgb(30, 30, 30)', 0.7, 'rgb(120, 120, 120)', 1, 'white']
}

const calculate = () => {
  const radius = parseFloat(document.getElementById("radius").value);
  const n_lens = parseFloat(document.getElementById("n_lens").value);
  const n_plate = parseFloat(document.getElementById("n_plate").value);
  const n_env = parseFloat(document.getElementById("n_env").value);
  const lambda = parseFloat(document.getElementById("lambda").value);

  if (radius < 0) {
    alert("Радиус должен быть больше 0");

    return;
  }

  if (lambda < 0) {
    alert("Длина волны должна быть больше 0");

    return;
  }

  if (n_lens < 1) {
    alert("Показатель преломления линзы должен быть больше 1");

    return;
  }

  if (n_plate < 1) {
    alert("Показатель преломления пластины должен быть больше 1");

    return;
  }

  if (n_env < 1) {
    alert("Показатель преломления среды должен быть больше 1");

    return;
  }

  if (n_lens < n_env && n_env < n_plate) {
    setMax();
  } else if (n_lens >= n_env && n_env < n_plate) {
    setMin();
  } else if (n_lens >= n_env && n_env >= n_plate) {
    alert("При заданных значениях кольца Ньютона не будет наблюдаться");
  } else {
    setMin();
  }

  const waveLength = lambda * 1e-9;

  const circleRadius =  Math.sqrt(waveLength * radius * 0.5 / n_env) * 30000;
  drawCircle(circleRadius);

  for (let m = 1; m < circleAmount; ++m) {
    const innerRadius = Math.sqrt((m - 0.5) * waveLength * radius / n_env);
    const outherRadius = Math.sqrt((m + 0.5) * waveLength * radius / n_env);

    drawRing(innerRadius * 30000, outherRadius * 30000);
  }

  stage.add(layer);
}
