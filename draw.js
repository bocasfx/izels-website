paper.install(window);
// Keep global references to both tools, so the HTML
// links below can access them.

const colorNames = ['pink', 'purple'];
const colors = {};
let showSection = null;

window.onload = function() {
  paper.setup('myCanvas');

  let raster;
  let path;

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

  showSection = (section, isDrawing = false, drawing = null) => {
    const elems = document.getElementsByTagName('section');
    for(elem of elems) {
      elem.classList.add('hidden');
    }
    const activeSection = document.getElementsByClassName(section)[0];
    console.log(activeSection)
    activeSection.classList.remove('hidden');

    if (isDrawing) {
      paper.project.activeLayer.removeChildren();
      paper.view.draw();
      raster = new Raster(drawing);
      raster.opacity = 0;
      raster.on('load', function() {
        raster.position = view.center;
        raster.size = new Size(425, 550);
        raster.opacity = 0.5;
      });
    }

  }
}
