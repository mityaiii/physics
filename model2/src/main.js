const mu = 4 * Math.PI * Math.pow(10, -7);

function calculate() {
  let radius = parseFloat(document.getElementById("input-radius").value);
  const qty = parseFloat(document.getElementById("input-qty").value);
  const electricity = parseFloat(document.getElementById("input-electricity").value);

  if (radius <= 0) {
    alert('radius > 0');
    return;
  }

  if (qty <= 0) {
    alert('qty > 0');
    return;
  }

  if (electricity < 0) {
    alert('electricity >= 0');
    return;
  }

  const xValues = [];
  const yValues = [];

  radius /= 100;
  const step = radius / 1000;

  for (let i = 0; i <= radius; i += step) {
      xValues.push(i * 100);

      const radius2 = Math.pow(radius, 2)
      const index2 = Math.pow(i, 2);

      const B = mu * qty * electricity * radius2 / 2 * (1 / Math.pow(index2 + radius2, 1.5) + (1 / Math.pow(Math.pow(Math.abs(radius - i), 2) + radius2, 1.5)));

      yValues.push(B);
  }


  const data = [{x: xValues, y: yValues, mode: "lines"}];
  const layout = {
      title: "B(x)",
      xaxis: {
          title: 'x, м',
      },
      yaxis: {
          autorange: true,
          title: 'В, Тл',
      }
  };
  Plotly.newPlot("myPlot", data, layout);
}