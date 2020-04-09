var myPath;

function onMouseDown(event) {
  myPath = new Path({
    strokeWidth: 10,
    strokeCap: 'round',
  });
  myPath.strokeColor = 'pink';
}

function onMouseDrag(event) {
  myPath.add(event.point);
  myPath.smooth();
}

function onMouseUp(event) {
  myPath.add(event.point);
  myPath.smooth();
}
