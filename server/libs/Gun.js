"use strict";
const gpio = require( "gpio" );

module.exports = exports = class Gun {
    constructor() {
    }  

    setup() {
        return Promise.all( [
            this._setup17(),
            this._setup27
        ] );
    }


    _setup17() {
        return new Promise( ( resolve ) => {
            this.motor = gpio.export( 17, {
                direction: "out",
                ready: resolve
            } );
        } );
    }
     _setup27() {
        return new Promise( ( resolve ) => {
            this.piston = gpio.export( 27, {
                direction: "out",
                ready: resolve
            } );
        } );
    }

    startMotor() {
        return new Promise( ( resolve ) => {
            this.motor.set( 1 );
            setTimeout( () => {
                resolve();
            }, 3000 );
        } );
    }

    shoot() {
        return new Promise( ( resolve ) => {
            this.piston.set( 0 );
            setTimeout( () => {
                this.piston.set( 1 );
                resolve();
            }, 1000 );
        } );
    }

    stopMotor() {
        this.motor.set( 1 );
    }
};