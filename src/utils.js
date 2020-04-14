const activateButton = (color, self) => {
  var buttons = document.getElementsByClassName('colorButton');
  for (const button of buttons) {
    button.classList.remove('active');
  };
  var elem = document.getElementsByClassName(color)[0];
  if (!elem.classList.contains('active')) {
    elem.classList.add('active');
  }
  self.activate();
}

export {
  activateButton,
};
