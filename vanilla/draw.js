paper.install(window);
// Keep global references to both tools, so the HTML
// links below can access them.
var colorPink, colorPurple;

window.onload = function() {
  paper.setup('myCanvas');

  var raster = new Raster('sun');
  raster.position = view.center;
  raster.on('load', function() {
    raster.size = new Size(425, 550);
    raster.opacity = 0.5;
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

  function activateButton(color, self) {
    var buttons = document.getElementsByClassName('colorButton');
    console.log(buttons)
    for (button of buttons) {
      button.classList.remove('active');
    };
    var elem = document.getElementById(color);
    if (!elem.classList.contains('active')) {
      elem.classList.add('active');
    }
    self.activate();
  }

  colorPink = new Tool();
  colorPink.onMouseDown = onMouseDown('pink');
  colorPink.onMouseDrag = onMouseDrag;
  colorPink.init = function() {
    activateButton('pink', this);
  }

  colorPurple = new Tool();
  colorPurple.onMouseDown = onMouseDown('purple');
  colorPurple.onMouseDrag = onMouseDrag;
  colorPurple.init = function() {
    activateButton('purple', this);
  }

  // clouds = new Tool();
  // clouds.minDistance = 40;
  // clouds.onMouseDown = onMouseDown('purple');
  // clouds.onMouseDrag = function(event) {
  //   path.arcTo(event.point);
  // }
}
