"use strict";
const Express = require( "express" );
module.exports = exports = class Socket{ 
    constructor() {
        this.app = new Express();
        this.http = require( "http" ).Server( this.app );
        this.io = require('socket.io')( this.http );
        this._serveFiles();
        this._listen( process.env.PORT || 3000 );
    }

    _listen( PORT ) {
        this.http.listen( PORT, () => {
            console.log( `Listening on port ${ PORT }` );
        } );

        this.io.on( "connection", ( socket ) => {
            this.listen( socket, "fire", this.shoot.bind( this ) );
        } );
    }

    _serveFiles() {
        this.app.use( Express.static( `${ __dirname }/../../frontend/` ) );
        this.app.use( Express.static( `${ __dirname }/../../frontend/libs/js-cam-motion/libs/` ) );
    }



    listen( socket, topic, callback ) {
        console.log( `Listening on ${ topic }` );
        socket.on( topic, callback );
    }





    shoot() {
        console.log( "FIRING" );
        this.io.emit( "fireGun" );
        this.shootCb();
    }


    onShoot( cb ) {
        this.shootCb = cb;
    }


};
