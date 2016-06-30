"use strict";


class Socket{
    constructor() {
          this.socket = io();
    }


    emit( topic, data ) {
        console.log( `emitting ${ data } on topic ${ topic }` );
        this.socket.emit( topic, data );
    }

}