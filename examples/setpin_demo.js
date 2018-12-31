const SETPIN = require('../interfaces/setpin.js');
const heater = new SETPIN(7);
// const aircon = new SETPIN(12); // Its too cold here to worry about Dynamic AC!

var interval = setInterval(() => {
  console.log('State', heater.readState() ? 'HEAT ON' : 'HEAT OFF');
}, 900);

// turn heat on, wait 5 seconds, try to turn it off (should fail) then wait 56 seconds and try again.
heater.on();
setTimeout(() => {
  heater.off();
  console.log('Heater:', heater.state ? 'ON' : 'OFF');
  setTimeout(() => {
    heater.off();
    console.log('Heater', heater.state ? 'ON' : 'OFF');
    clearInterval(interval);
  }, 56000);
}, 5000);
