var server = io.connect('/satellite');

$(document).ready(function(){
  $('body').append('<div id="fps"></div>')
  $('body').append('<div id=instructions></div>');
  document.title = "Satellite grid";

  (function(){

    var server = io.connect('/satellite');
    server.on('welcome', function (data) {
        console.log('Connected to server:', data);
    });

    server.on('opticalFlow', visualizer.collectopticalFlowData);
    server.on('blob', visualizer.getBlobCoords);
    server.on('audio', visualizer.getFreq);
    server.on('audienceMotionData', visualizer.handleShakes);
    server.on('tiltangle', visualizer.handleTilt);
    server.on('oscSatellite', visualizer.handleOsc);

  })();
});
