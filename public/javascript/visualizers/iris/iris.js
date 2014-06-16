// On PC: server:port/iris
// On phone: server:port/fone

jQuery(function($) {
  document.title = "Iris";
  var server = io.connect('/iris');
  server.on('welcome', function (data) {
      console.log('welcomed', data);
    });

  // Set window parameters
  var WIDTH = innerWidth;
  var HEIGHT = innerHeight;

  // Increase this to make shakes count for less. Default is 1.
  var SENSITIVITY = 30;

  // How frequently to refresh the visualization.
  var INTERVAL = 100;
  // This is the minimum value that the iris will contract to, even without any motion. (written as a decimal percentage)
  var MINIMUMRADIUS = 0.03;
  var MAXIMUMRADIUS = 0.4;
  var minR = MINIMUMRADIUS * HEIGHT;
  var maxR = MAXIMUMRADIUS * HEIGHT;
  var cx = WIDTH / 2;
  var cy = HEIGHT / 2;
  var spotOn = true;

  // This will hold the sum of all incoming acceleration data
  var shakeData = 0;
  // This will hold the current value, which is just a snapshot of shakeData
  var currentValue = 0;

  var svg = d3.select("body").append("svg")
      .style("background-color", "black")
      .attr("width", WIDTH)
      .attr("height", HEIGHT);
    svg.append("circle")
      .attr("cx", cx)
      .attr("cy", cy);

  // This function smoothes out the jitteriness of transitioning between very
  // different scores. Set 'z' higher for more smoothing, and lower for less effect
  var zFilter = function(inputData, previousValue){
    var z = 0.8; // set this between 0 and 1
    return (z*previousValue + (1-z)*inputData);
  };

  var irisExpand = function(score){

    var sportLight = d3.select("circle");

    sportLight
      .transition()
      .duration(INTERVAL)
      .attr("cx", cx)
      .attr("cy", cy)
      .attr("r", function(d){
        return spotOn ? minR + score : 0;
      })
      .style("fill", "white");
  };

  server.on('audienceMotionData', function(data){
    shakeData += data.totalAcc;
  });
  server.on('oscIris', function(data){
    var cmd = data[0];
    switch(cmd){
      case "xy":
        cx = WIDTH * data[2];
        cy = HEIGHT * (1.0 - data[1]);
        break;
      case "resetXY":
        cx = WIDTH * 0.5;
        cy = HEIGHT * 0.5;
        break;
      case "spotOn":
        spotOn = true;
        break;
      case "spotOff":
        spotOn = false;
        break;  
    }
    // console.log(data);
  });

  setInterval(function(){
    shakeData = Math.floor(shakeData * SENSITIVITY);
    currentValue = Math.floor(zFilter(shakeData, currentValue));
    // console.log(currentValue);
    currentValue = currentValue > maxR ? maxR : currentValue;

    irisExpand(currentValue);
    // Reset shakeData to 0, otherwise meter will keep growing
    shakeData = 0;
  }, INTERVAL);
});
