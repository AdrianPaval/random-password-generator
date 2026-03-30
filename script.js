document.getElementById("slider").oninput = function () {
  let value = ((this.value - this.min) / (this.max - this.min)) * 100;
  this.style.background =
    "linear-gradient(to right, black 0%, black " +
    value +
    "%, #fff " +
    value +
    "%, white 100%)";
};
