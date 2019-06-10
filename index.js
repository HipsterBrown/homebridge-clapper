// make into separate package at some point
const MulticastEmitter = require('./lib/multicast-events');

let Service;
let Characteristic;

module.exports = function(homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;

  homebridge.registerAccessory('homebridge-clapper', 'Clapper', Clapper);
};

class Clapper {
  constructor(log, {name = 'MyClapper', serial} = {}) {
    this.log = log;
    this.name = name;
    this.clapOn = false;

    this.informationService = new Service.AccessoryInformation();

    this.informationService
      .setCharacteristic(Characteristic.Manufacturer, 'Team Tessel')
      .setCharacteristic(Characteristic.Model, 'Tessel 2')
      .setCharacteristic(Characteristic.SerialNumber, serial || 'TM-T2-04');

    this.service = new Service.Switch(this.name);

    this.service
      .getCharacteristic(Characteristic.On)
      .on('get', callback => callback(null, this.clapOn))
      .on('set', (on, callback) => {
        this.log('Changing state to: ', on ? 'on' : 'off');
        this.clapOn = on;
        callback();
      });

    // setup multicast listener here
    this.pub = new MulticastEmitter();

    this.pub.on('clap', () => this.handleClap());
  }

  handleClap() {
    this.log('Clap detected!');
    this.clapOn = !this.clapOn;

    this.log('Changing state to: ', this.clapOn ? 'on' : 'off');

    this.service.setCharacteristic(Characteristic.On, this.clapOn);
  }

  getServices() {
    return [this.informationService, this.service];
  }
}
