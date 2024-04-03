const min_t = 0;
const max_t = 100;
const eps_t = 0.001;

const drawSumOfFrequency = (data) => {
  const layout = {
    title: "x(t)",
    xaxis: {
      title: 't, с',
    },
    yaxis: {
        autorange: true,
        title: 'x, М',
    }
  };

  Plotly.newPlot("beating", data, layout);
}

const calculate = () => {
  const a1 = parseFloat(document.getElementById("input-a1").value);
  const f1 = parseFloat(document.getElementById("input-f1").value);
  const a2 = parseFloat(document.getElementById("input-a2").value);
  const f2 = parseFloat(document.getElementById("input-f2").value);
 
  console.log(a1, f1, a2, f2);

  if (a1 < 0 || f1 < 0 || a2 < 0 || f2 < 0) {
    alert("Values must be positive");

    return;
  }

  const tValues = [];
  const yValues = [];

  for (let t = min_t; t <= max_t; t += eps_t) {
    tValues.push(t);

    let y = a1 * Math.sin(f1 * t) + a2 * Math.sin(f2 * t);
    yValues.push(y);
  }

  drawSumOfFrequency([{x: tValues, y: yValues, mode: "lines"}])
}