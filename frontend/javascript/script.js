	window.onload = function() {
        const socket = new Socket();



		var action = false;

		var canvas = document.getElementById("canvas-blended");
        var canWidth = $( canvas ).css("width");
        var centerPoint = canWidth.substr( 0, canWidth.length - 2 ) / 2;
		var ctx = canvas.getContext("2d");
		ctx.fillStyle = "#FF0000";
		ctx.strokeStyle = "#00FF00";
		ctx.lineWidth = 5;

		console.log("Inintializing");
		var camMotion = CamMotion.Engine({
			canvasBlended: canvas
		});

		function doAction() {
			action = true;
			setTimeout( () => {
				action = false;
			}, 500 );
		}



		camMotion.on("error", function (e) {
			console.log("error", e);
		});
		camMotion.on("frame", function () {

			var point = camMotion.getMovementPoint(true);

			if (camMotion.getAverageMovement(point.x-point.r/2, point.y-point.r/2, point.r, point.r)>4) {
                if ( point.x < centerPoint + 50 && point.x > centerPoint - 50  && !action ) {
					doAction();
                    $( ".dir" ).text( "SHOOT" );
                    socket.emit( "fire", "shoot" );
                } else if ( point.x < centerPoint + 50  && !action ) {
					doAction();
					socket.emit( "right" );
					$( ".dir" ).text( "MOVE RIGHT" );
				} else if ( point.x > centerPoint - 50  && !action ) {
					doAction();
					socket.emit( "left" );
					$( ".dir" ).text( "MOVE LEFT" );
				}
			}
		});
		camMotion.start();

	};
