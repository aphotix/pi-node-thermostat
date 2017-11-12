// This file contains functionality to interact with the temp and humidity sensor SHT31

const SHT31 = require('raspi-node-sht31');
const sht31 = new SHT31();


// convert celcius to fahrenheit
function CtoF(temp){ return Math.round((temp * 1.8 + 32) * 10) / 10; }

function get(fahrenheit){
  return sht31.readSensorData().then((data) => {
    const temperature = fahrenheit ? CtoF(data.temperature) : data.temperature;
    const humidity = data.humidity;
    return { temperature, humidity };
  });
}

function init(){
  return sht31.reset();
}

module.exports = { get, init, CtoF };
