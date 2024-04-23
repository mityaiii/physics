const calculateSignalSpectr = (signal) => {
  const spectr = [];
  for (let i = 0; i < signal.length; ++i) {
    let re = 0;
    let im = 0;

    for (let j = 0; j < signal.length; ++j) {
      re += signal[j] * Math.cos(-2 * Math.PI * i * j / signal.length);
      im += signal[j] * Math.sin(-2 * Math.PI * i * j / signal.length);
    }

    spectr.push(Math.sqrt(re * re + im * im));
  }

  return spectr;
}

const drawPlot = (title, xaxisTitle, yaxisTitle, plotTitle, data) => {
  const layout = {
    title: title,
    type: 'scatter',
    xaxis: {
      title: xaxisTitle,
      tickformat: '.2f'
    },
    yaxis: {
        title: yaxisTitle,
        tickformat: '.2f'
    }
  };

  Plotly.newPlot(plotTitle, data, layout);
}


const calculate = () => {
  const carrierFrequency = parseFloat(document.getElementById("input-carrier-frequency").value);
  const informationSignalFrequency = parseFloat(document.getElementById("input-information-signal-frequency").value);
  const modulationFactor = parseFloat(document.getElementById("input-modulation-factor").value);

  if (carrierFrequency < 0 || informationSignalFrequency < 0 || modulationFactor < 0) {
    alert("Values must be positive");

    return;
  }

  const duration = 1;
  const samplingFrequency = 1000;

  const t = [];
  const carrierSignals = [];
  const informationSignals = [];
  const modulationSignals = [];
  for (let i = 0; i < duration * samplingFrequency; ++i) {
    t.push(i / samplingFrequency);

    const carrierSignal = Math.sin(2 * Math.PI * carrierFrequency * t[i]);
    carrierSignals.push(carrierSignal);

    const informationSignal = Math.sin(2 * Math.PI * informationSignalFrequency * t[i]);
    informationSignals.push(informationSignal);

    const modulationSignal = (informationSignal * modulationFactor + 1) * carrierSignal;
    modulationSignals.push(modulationSignal);
  }

  const carrierData = [{x: t, y: carrierSignals, mode: "lines"}]
  const informationData = [{x: t, y: informationSignals, mode: "lines"}]
  const modulationData = [{x: t, y: modulationSignals, mode: "lines"}]

  drawPlot("Несущий сигнал", "t, с", "A, Гц", "carrierSignalGraphic", carrierData);
  drawPlot("Информационный Сигнал", "t, с", "A, Гц", "informationSignalGraphic", informationData);
  drawPlot("Результат Модуляции", "t, с", "A, Гц", "modulationResultGraphic", modulationData);

  const carrierSpectr = calculateSignalSpectr(carrierSignals);
  const informationSpectr = calculateSignalSpectr(informationSignals);
  const modulationSpectr = calculateSignalSpectr(modulationSignals);

  const allSpectrData = [
    {
      x: t, 
      y: carrierSpectr,
      name: 'Спектр несущего сигнала', 
      type: 'scatter',
    },
    { 
      x: t, 
      y: informationSpectr,
      name: 'Спектр информационного сигнала', 
      type: 'scatter',
    },
    { 
      x: t, 
      y: modulationSpectr,
      name: 'Спектр модуляции сигналов', 
      type: 'scatter',
    },
  ]

  drawPlot("Спектры сигналов", "f, Гц", "A, Гц", "allSpectrsGrpahic", allSpectrData);
}