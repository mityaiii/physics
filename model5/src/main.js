const drawGraphicKeyUp = (data) => {
  const layout = {
    title: "Зависимость тока от времени при размыкании ключа",
    xaxis: {
        title: 't, с',
    },
    yaxis: {
        autorange: true,
        title: 'I, А',
    }
  };

  Plotly.newPlot("keyUpGraphic", data, layout);
}

const drawGraphicKeyDown = (data) => {
  const layout = {
    title: "Зависимость тока от времени при замыкании ключа",
    xaxis: {
        title: 't, с',
    },
    yaxis: {
        autorange: true,
        title: 'I, А',
    }
  };

  Plotly.newPlot("keyDownGraphic", data, layout);
}

const finishTime = 100;

const calculate = () => {
  const L = parseFloat(document.getElementById("input-l").value);
  const R = parseFloat(document.getElementById("input-r").value);
  const Eds = parseFloat(document.getElementById("input-eds").value);

  if (isNaN(L) || isNaN(R) || isNaN(Eds)) {
    alert('Input all values');
    return;
  }

  const dataKeyUp = [];
  const dataKeyDown = [];
  const tValues = [];

  for (let t = 0; t < finishTime; ++t) {
    const IKeyUp = Eds / R * Math.exp(-R / L * t);
    dataKeyUp.push(IKeyUp);

    const IKeyDown = Eds / R * (1 - Math.exp(-t * R / L));
    dataKeyDown.push(IKeyDown);

    tValues.push(t);
  }

  drawGraphicKeyDown([{x: tValues, y: dataKeyUp, mode: "lines"}]);
  drawGraphicKeyUp([{x: tValues, y: dataKeyDown, mode: "lines"}]);
}