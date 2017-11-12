const LCDPLATE = require('adafruit-i2c-lcd').plate;
const lcd = new LCDPLATE(1, 0x20, 10000); // Polling can't be disabled


const templates = {
  main: mainDisplay,
  init: startupDisplay
}


function mainDisplay(currTemp, currRH, setTemp, active){
  const temp = Math.round(currTemp); // Limited characters, but we want to record the higher precision temp
  var state;

  switch(active){
    case 1:
      state = 'HEAT';
      break;
    case -1:
      state = 'COOL';
      break;
    default:
      state = ' OFF';
  }

  return `TEMP RH SET STAT\n${temp}F ${currRH}% ${setTemp}F ${state}`;
}

function startupDisplay(){ return 'ThermoPi Init' }

function init(callback){
  lcd.clear();
  lcd.backlight(lcd.colors.WHITE);
  refreshScreen('init');
  setTimeout(callback, 3000);
}

function refreshScreen(template, data = []){
  lcd.home(); // home instead of clear prevents screen flicker on refresh
  lcd.message(templates[template](...data));
  return true;
}

function shutdown(){
  lcd.clear();
  lcd.backlight(lcd.colors.OFF);
  lcd.close();
}


module.exports = { refreshScreen, templates, init, shutdown };
