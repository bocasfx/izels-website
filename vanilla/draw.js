paper.install(window);
// Keep global references to both tools, so the HTML
// links below can access them.
var colorPink, clouds;

window.onload = function() {
  paper.setup('myCanvas');

  var raster = new Raster('bunny');
  raster.position = view.center;
  raster.on('load', function() {
    raster.size = new Size(425, 550);
  });

  var path;
  function onMouseDown(color) {
    return function eventHandler(event) {
      console.log(color)
      path = new Path({
        strokeWidth: 5,
        strokeCap: 'round',
        strokeColor: color,
      });
      path.add(event.point);
      path.insertBelow(raster);
    }
  }

  function onMouseDrag(event) {
    path.add(event.point);
  }

  colorPink = new Tool();
  colorPink.onMouseDown = onMouseDown('pink');
  colorPink.onMouseDrag = onMouseDrag;

  colorPurple = new Tool();
  colorPurple.onMouseDown = onMouseDown('purple');
  colorPurple.onMouseDrag = onMouseDrag;

  // clouds = new Tool();
  // clouds.minDistance = 40;
  // clouds.onMouseDown = onMouseDown('purple');
  // clouds.onMouseDrag = function(event) {
  //   path.arcTo(event.point);
  // }
}
