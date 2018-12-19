const LCDPLATE = require('adafruit-i2c-lcd').plate;
const lcd = new LCDPLATE(1, 0x20);

const SHT31 = require('raspi-node-sht31');
const sht31 = new SHT31();

lcd.backlight(lcd.colors.WHITE);
lcd.clear();
lcd.message('Testing.');

sht31.readSensorData().then( (tempdata) => {
  lcd.clear()
  const temperature = Math.round(tempdata.temperature * 1.8 + 32);
  const message = `Temp: ${temperature} F\nHumidity: ${Math.round(tempdata.humidity)}%`;
  lcd.message(message);
  setTimeout(() => {
    lcd.clear();
    lcd.backlight(lcd.colors.OFF);
    lcd.close();
  }, 10000)
});
