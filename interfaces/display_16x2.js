const LCDPLATE = require('adafruit-i2c-lcd').plate;
const lcd = new LCDPLATE(1, 0x20);


const templates = {
  main: mainDisplay,
  init: startupDisplay
}


function mainDisplay(currTemp, currRH, setTemp, active){
  const temp = Math.round(currTemp); // Limited characters, but we want to record the higher precision temp
  const heater = active ? 'ON' : 'OFF';
  return `TEMP RH SET HEAT\n${temp}F ${currRH}% ${setTemp}F  ${heater}`;
}

function startupDisplay(){ return 'ThermoPi Init' }

function init(callback){
  lcd.clear();
  lcd.backlight(lcd.colors.WHITE);
  refreshScreen('init');
  setTimeout(callback, 3000);
}

function refreshScreen(template, data = []){
  lcd.clear();
  lcd.message(templates[template](...data));
  return true;
}

function shutdown(){
  lcd.clear();
  lcd.backlight(lcd.colors.OFF);
  lcd.close();
}


module.exports = { refreshScreen, templates, init, shutdown };
