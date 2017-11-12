const rpio = require('rpio');

// Open pin 11 for write
rpio.open(11, rpio.OUTPUT, rpio.LOW);

// set pin on then off after 10 seconds, and close the pin.

rpio.write(11, rpio.HIGH);

setTimeout(() => {
  rpio.write(11, rpio.LOW);
  setTimeout(()=>{
    rpio.close(11, rpio.PIN_RESET);
  }, 300)
}, 3000)
