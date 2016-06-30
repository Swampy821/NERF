"use strict";
const SocketClient = require( "socket.io-client" );

module.exports = exports = class Socket {
    constructor( url ) {
        console.log( url );
        this.socket = SocketClient( url );
    }

    listen( topic, cb ) {
        this.socket.on( topic, cb );
    }
};