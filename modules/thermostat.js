// This file contains all of the thermostat control functionality.
const SETPIN = require('../interfaces/setpin');

const heater = new SETPIN(11, 300000);
const display = requre('../interfaces/display_16x2');
const temp = require('temp_rh');

const init = function(){
  temp.init();
  display.init();
  return;
}

// TODO stuff



module.exports = { init };
