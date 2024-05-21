
const drawGraphic = (max_x, data) => {
  const layout = {
    title: "Интерференционные полосы",
    xaxis: {
      range: [-max_x, max_x],
      title: 'theta, рад',
    },
    yaxis: {
      autorange: true,
      title: 'I, Вт/м^2',
    },
    width: 700,
    height: 450,
  };

  Plotly.newPlot("container", data, layout);
}

const calculate = () => {
  let numberOfSlots = parseFloat(document.getElementById("number_of_slots").value);
  let slotSize = parseFloat(document.getElementById("slot_size").value);
  let period = parseFloat(document.getElementById("period").value);
  let waveLength = parseFloat(document.getElementById("wave_length").value);

  if (numberOfSlots <= 0) {
    alert("Количество щелей должно быть больше 0");

    return;
  } 

  if (slotSize <= 0) {
    alert("Размер щели должен быть больше 0");

    return;
  }

  if (period <= 0) {
    alert("Период должен быть больше 0");

    return;
  }

  if (waveLength <= 0) {
    alert("Длина волны должна быть больше 0");

    return;
  }

  waveLength *= 1e-9;
  slotSize *= 1e-3;
  period *= 1e-3;

  const thetaValues = [];
  const IValues = [];

  for (let theta = -Math.PI; theta < Math.PI; theta += Math.PI * 1e-6) {
    thetaValues.push(theta);

    const k = Math.PI * Math.sin(theta) / waveLength;
    const alpha = slotSize * k;
    const beta = period * k;
    const I = Math.pow(Math.sin(numberOfSlots * beta) / Math.sin(beta), 2) * Math.pow(Math.sin(alpha) / alpha, 2);

    IValues.push(I);
  }

  const data = [{
    x: thetaValues,
    y: IValues,
    mode: "lines"
  }];

  const deltaX = Math.min(slotSize, period, 1);

  drawGraphic(deltaX, data);
}
