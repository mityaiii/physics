const drawGraphicEds = (data) => {
  const layout = {
    title: "ε(t)",
    xaxis: {
        title: 't, с',
    },
    yaxis: {
        autorange: true,
        title: 'ε, В',
    }
  };

  Plotly.newPlot("EdsGrahic", data, layout);
}

const drawGraphicI = (data) => {
  const layout = {
    title: "I(t)",
    xaxis: {
        title: 't, с',
    },
    yaxis: {
        autorange: true,
        title: 'I, А',
    }
  };

  Plotly.newPlot("IGraphic", data, layout);
}

const calculate = () => {
  const eps = 0.001;

  const b = parseFloat(document.getElementById("input-b").value);
  const frequency = parseFloat(document.getElementById("input-frequency").value);
  const resist = parseFloat(document.getElementById("input-resist").value);
  const square = 1;

  if (b < 0 || frequency < 0 || resist < 0) {
    alert("Values must be positive");

    return;
  }

  const tValues = [];
  const IValues = [];
  const EValues = [];

  const frequencyAngle = 2 * Math.PI * frequency;

  for (let t = 0; t < 10; t+=eps) {
    tValues.push(t);

    const E = b * frequencyAngle * square * Math.sin(frequencyAngle * t);
    const I = E / resist;

    EValues.push(E);
    IValues.push(I);
  }

  const dataI = [{x: tValues, y: IValues, mode: "lines"}];
  const dataE = [{x: tValues, y: EValues, mode: "lines"}];

  drawGraphicEds(dataE);
  drawGraphicI(dataI);

}

drawGraphicEds();
drawGraphicI();