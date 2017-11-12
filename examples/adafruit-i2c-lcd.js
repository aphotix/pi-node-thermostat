const LCDPLATE = require('adafruit-i2c-lcd').plate;
const lcd = new LCDPLATE(1, 0x20);

lcd.backlight(lcd.colors.WHITE)
lcd.message('Hello World!');

var lastButton;

lcd.on('button_change', function(button){
	lcd.clear();
	lcd.message('Button Changed:\n' + lcd.buttonName(button));
	console.log(button);
	if(lastButton == 16 && button == 16){
		// Exit
		console.log('exiting in 3 seconds');
		lcd.clear();
		lcd.message('Exiting in 3 seconds...');
		setTimeout(function(){
			lcd.clear();
			lcd.backlight(lcd.colors.OFF);
			lcd.close();
			process.exit(0);
		}, 3000);
	}
	lastButton = button;

});
