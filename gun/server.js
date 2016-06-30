"use strict";

const Socket = require( "./libs/Socket" );
const Gun = require( "./libs/Gun" );

let socket = new Socket( "http://localhost:3000" );


socket.listen( "fireGun", () => {
    console.log( "Firing Gun" );
} );