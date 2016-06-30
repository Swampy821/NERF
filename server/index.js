"use strict";

const Socket = require( "./libs/Socket" );
const Gun = require( "./libs/Gun" );

var socket = new Socket();
var gun = new Gun();


gun.setup().then( () => {
    socket.onShoot( () => {
        gun.startMotor().then( () => {
            gun.shoot().then( () => {
                gun.stopMotor();
            } );
        } );
    } );
} );




