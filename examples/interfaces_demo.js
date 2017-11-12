const display = require('../interfaces/display_16x2');
const tempSensor = require('../interfaces/temp_rh');

var count = 0;

// Init Display, then show temp.
display.init(() => {
  sensorRefresh();
});

function sensorRefresh(){
  tempSensor.get(true).then( (data) => {
    const sensorData = [
      data.temperature,
      data.humidity,
      70,
      0
    ];
    console.log(sensorData)
    display.refreshScreen('main', sensorData);
    count++;
    // setTimeout(display.shutdown, 10000)
    if(count < 10){
      setTimeout(sensorRefresh, 500);
    } else {
      display.shutdown();
    }
  } );
}
