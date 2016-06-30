	window.onload = function() {
        const socket = new Socket();





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
		console.log(camMotion);
		camMotion.on("error", function (e) {
			console.log("error", e);
		});
		camMotion.on("frame", function () {

			var point = camMotion.getMovementPoint(true);

			if (camMotion.getAverageMovement(point.x-point.r/2, point.y-point.r/2, point.r, point.r)>4) {
                if ( point.x < centerPoint + 50 && point.x > centerPoint - 50 ) {
                    $( ".dir" ).text( "SHOOT" );
                    socket.emit( "fire", "shoot" );
                } else {
					$( ".dir" ).text( "" );
				}
			}
		});
		camMotion.start();

	};