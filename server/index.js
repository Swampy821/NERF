"use strict";

const Socket = require( "./libs/Socket" );
const Gun = require( "./libs/Gun" );

var socket = new Socket();
var gun = new Gun();
let num = 0;
function moveRight() {
    gun.moveLeft().then( () => {
        if( num < 10 ) {
            num++;
            moveRight();
        }
    } );
}
moveRight();
gun.setup().then( () => {
    gun.stopMotor();
    gun.stopPiston();
    
    socket.onShoot( () => {
        gun.startMotor().then( () => {
            gun.shoot().then( () => {
                gun.stopMotor();
            } );
        } );
    } );

    socket.onRight( () => {
        gun.moveRight();
    } );

    socket.onLeft( () => {
        gun.moveLeft();
    } );

} );




