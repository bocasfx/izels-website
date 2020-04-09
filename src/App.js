
import paper, { Point, Path } from 'paper';
import './App.css';

const draw = () => {
  let w = window.innerWidth;
  let h = window.innerHeight;
  
  var point1 = new Point(0, 0);
  var point2 = new Point(w, 0);
  var point3 = new Point(w, h);
  var point4 = new Point(0, h);

  var path1 = new Path(point1, point3);
  var path2 = new Path(point2, point4);

  path1.strokeColor = 'red';
  path2.strokeColor = 'blue';
}

const init = () => {
  const canvas = document.createElement('canvas');
  canvas.id = 'paper-canvas';
  document.body.appendChild(canvas);

  paper.setup(canvas);

  draw();
}

const App = () => {
  init();
}

export default App;


