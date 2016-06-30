"use strict";

const Socket = require( "./libs/Socket" );
const Gun = require( "./;obs/Gun" );

var socket = new Socket();
var gun = new Gun();


socket.onShoot( () => {
    gun.startMotor().then( () => {
        gun.shoot().then( () => {
            gun.stopMotor();
        } );
    } );
} );


