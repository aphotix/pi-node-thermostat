const display = require('../interfaces/display_16x2');
const tempSensor = require('../interfaces/temp_rh');

// Init Display, then show temp.
display.init(() => {
  tempSensor.get(true).then( (data) => {
    const sensorData = [
      data.temperature,
      data.humidity,
      70,
      false
    ];
    console.log(sensorData)
    display.refreshScreen('main', sensorData);
    setTimeout(display.shutdown, 10000)
  } );
});
