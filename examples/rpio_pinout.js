const rpio = require('rpio');

// Open pin 11 for write
rpio.open(7, rpio.OUTPUT, rpio.LOW);

// set pin on then off after 10 seconds, and close the pin.

rpio.write(7, rpio.HIGH);

setTimeout(() => {
  rpio.write(7, rpio.LOW);
  setTimeout(()=>{
    rpio.close(7, rpio.PIN_RESET);
  }, 300)
}, 3000)
