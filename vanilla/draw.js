paper.install(window);
// Keep global references to both tools, so the HTML
// links below can access them.

var colorNames = ['pink', 'purple'];
var colors = {};

window.onload = function() {
  paper.setup('myCanvas');

  // document.getElementById('reset').onclick = function() {
  //   paper.project.activeLayer.removeChildren();
  //   paper.view.draw();
  // }

  var raster = new Raster('bunny');
  raster.position = view.center;
  raster.on('load', function() {
    raster.size = new Size(425, 550);
    raster.opacity = 0.5;
  });

  var path;
  function onMouseDown(color) {
    return function eventHandler(event) {
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
    for (button of buttons) {
      button.classList.remove('active');
    };
    var elem = document.getElementsByClassName(color)[0];
    if (!elem.classList.contains('active')) {
      elem.classList.add('active');
    }
    self.activate();
  }

  colorNames.forEach(color => {
    colors[color] = null;
  });

  Object.keys(colors).forEach(color => {
    colors[color] = new Tool();
    colors[color].onMouseDown = onMouseDown(color);
    colors[color].onMouseDrag = onMouseDrag;
    colors[color].init = function() {
      activateButton(color, this);
    }
  });
}


function showSection(section) {
  console.log(section);
}