"use strict";
const gpio = require( "gpio" );
const exec = require( "child_process" ).exec; 

module.exports = exports = class Gun {
    constructor() {
    }  

    setup() {
        return Promise.all( [
            this._setup22(),
            this._setup27()
        ] );
    }


    _setup22() {
        return new Promise( ( resolve ) => {
            this.motor = gpio.export( 22, {
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
            this.motor.set( 0 );
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

    moveLeft() {
        return new Promise(  ( resolve ) => {
            exec( "python ./servoScripts/moveLeft.py", ( data ) => {
                resolve( data );
            } );
        } );
    }

    moveRight() {
        return new Promise(  ( resolve ) => {
            exec( "python ./servoScripts/moveRight.py", ( data ) => {
                resolve( data );
            } );
        } );
    }

    stopMotor() {
        this.motor.set( 1 );
    }

    stopPiston() {
        this.piston.set( 1 );
    }

};

