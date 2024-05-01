const drawGraphic = (data) => {
  const colorscale = [
    [0, "rgb(0, 0, 0)"],
    [0.1, "rgb(25, 25, 25)"],
    [0.2, "rgb(50, 50, 50)"],
    [0.3, "rgb(75, 75, 75)"],
    [0.4, "rgb(100, 100, 100)"],
    [0.5, "rgb(125, 125, 125)"],
    [0.6, "rgb(150, 150, 150)"],
    [0.7, "rgb(175, 175, 175)"],
    [0.8, "rgb(200, 200, 200)"],
    [0.9, "rgb(225, 225, 225)"],
    [1.0, "rgb(250, 250, 250)"]
  ]

  const layout = {
    title: "Интерференционные полосы",
    xaxis: {
      autorange: true,
      xaxis: "x (м)"
    },
    yaxis: {
      autorange: true,
      zeroline: false,
      showticklables: false,
      showgrid: false,
    },
    autosize: true,
  }

  Plotly.newPlot("Plot", data, layout);
}

const calculate = () => {
  const wavelengthNm = parseFloat(document.getElementById("input-wavelength").value);
  const refractiveIndices = parseFloat(document.getElementById("input-refractive-indices").value);
  const distancesBetweenSlotsMm = parseFloat(document.getElementById("input-distances-between-slots").value);
  const distanceToScreen = parseFloat(document.getElementById("input-distance-to-screen").value);

  if (wavelengthNm < 0 || distancesBetweenSlotsMm < 0 || distanceToScreen < 0) {
    alert("Values must be positive");

    return;
  }

  if (refractiveIndices < 1) {
    alert("Refractive indices must be greater than 1 or equal");

    return;
  }

  const d = distancesBetweenSlotsMm / 1e3;
  const wavelength = wavelengthNm / refractiveIndices / 1e9;
  const L = distanceToScreen;

  const xValues = [];
  const iValues = [];
  for (let i = -0.01; i <= 0.01; i += 0.0001) {
    xValues.push(i);
  
    const I = 4 * (Math.cos(Math.PI * refractiveIndices * d * i / wavelength / L) ** 2);
    iValues.push(I)
  }

  const data = [{
    x: xValues,
    z: [iValues],
    type: "heatmap",
    colorscale: colorscale,
    showscale: false,
  }]

  drawGraphic(data)
}
