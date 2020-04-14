import paper from 'paper';
import { activateButton } from './utils';
import './styles.css';
import sunPng from './img/sun.png';
import bunnyPng from './img/bunny.png';

paper.install(window);
// Keep global references to both tools, so the HTML
// links below can access them.

const colorNames = ['pink', 'purple'];
const colors = {};

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

  const showSection = (section, isDrawing = false, drawing = null) => {
    return () => {
      const elems = document.getElementsByTagName('section');
      for(const elem of elems) {
        elem.classList.add('hidden');
      }
      const activeSection = document.getElementsByClassName(section)[0];
      activeSection.classList.remove('hidden');
  
      if (isDrawing) {
        paper.project.activeLayer.removeChildren();
        paper.view.draw();
        raster = new Raster(drawing);
        raster.opacity = 0;
        raster.on('load', () => {
          raster.position = view.center;
          raster.size = new Size(425, 550);
          raster.opacity = 0.5;
        });
      }
    }
  }

  const menuHome = document.getElementById('menu-home');
  const menuBunny = document.getElementById('menu-bunny');
  const menuSun = document.getElementById('menu-sun');
  const menuAbout = document.getElementById('menu-about');

  menuHome.onclick = showSection('home');
  menuBunny.onclick = showSection('canvas', true, 'bunny');
  menuSun.onclick = showSection('canvas', true, 'sun');
  menuAbout.onclick = showSection('about');

  const bunnyImg = document.createElement('img');
  bunnyImg.src = bunnyPng;
  bunnyImg.classList.add('raster');
  bunnyImg.id = 'bunny';

  const sunImg = document.createElement('img');
  sunImg.src = sunPng;
  sunImg.classList.add('raster');
  sunImg.id = 'sun';

  const canvasElem = document.getElementsByClassName('canvas')[0];
  canvasElem.appendChild(bunnyImg);
  canvasElem.appendChild(sunImg);

  colorNames.forEach(color => {
    colors[color] = null;
  });

  Object.keys(colors).forEach(color => {
    colors[color] = new Tool();
    colors[color].onMouseDown = onMouseDown(color);
    colors[color].onMouseDrag = onMouseDrag;
    colors[color].init = function() {
      activateButton(color, colors[color]);
    }
    const colorElem = document.getElementsByClassName(color)[0];
    colorElem.onclick = colors[color].init;
  });
}
