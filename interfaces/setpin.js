'use strict';

const rpio = require('rpio');

class SETPIN {
  constructor(pin, maxSetInterval){
    this.pin = pin || 11;
    this.maxSetInterval = maxSetInterval || 60000; // Blocks triggering on off more than once per interval
    this.lastSetInterval = 0; // Default
    this.state = 0;
    rpio.open(pin, rpio.OUTPUT, rpio.LOW); // We expect the Relay to be used in the Default open circuit instead of the default closed circuit.
  }

  setState(state){
    if(this.state != state && this.stateChangeAllowed()){
      this.state = state;
      rpio.write(this.pin, state);
      this.setInterval();
      return true;
    } else {
      console.log('state change blocked');
      return false;
    }
  }

  on(){
    return this.setState(1);
  }

  off(){
    return this.setState(0);
  }

  stateChangeAllowed(){
    const now = (new Date()).getTime();
    return now - this.lastSetInterval > this.maxSetInterval;
  }

  setInterval(diff = 0){
    this.lastSetInterval = (new Date()).getTime() - diff;
  }

  readState(){
    const state = rpio.read(this.pin);
    // console.log('state', state);
    this.state = state;
    return state;
  }

}

module.exports = SETPIN;
