"use strict";
const gpio = require( "node-gpio" );

module.exports = exports = class Gun {
    constructor() {
        this.GPIO = gpio.GPIO;

        this.motor = new this.GPIO( "17" );
        this.piston = new this.GPIO( "27" );
        this.motor.open();
        this.piston.open();
        this.motor.setMode( gpio.OUT );
        this.piston.setMode( gpio.OUT );
        this.piston.write( gpio.HIGH );
    }  

    startMotor() {
        return new Promise( ( resolve ) => {
            this.motor.write( gpio.LOW );
            setTimeout( () => {
                resolve();
            }, 3000 );
        } );
    }

    shoot() {
        return new Promise( ( resolve ) => {
            this.piston.write( gpio.LOW );
            setTimeout( () => {
                this.piston.write( gpio.HIGH );
                resolve();
            }, 1000 );
        } );
    }

    stopMotor() {
        this.motor.write( gpio.HIGH );
    }
};