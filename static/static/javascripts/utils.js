// copy & paste from the great google io game development sample:
// https://github.com/sethladd/Bad-Aliens
window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              window.oRequestAnimationFrame      ||
              window.msRequestAnimationFrame     ||
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
})();

function Timer() {
    this.time = 0;
    this.maxStep = 0.05;
    this.wallLastTimestamp = 0;
}

Timer.prototype.tick = function() {
    var wallCurrent = Date.now();
    var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
    this.wallLastTimestamp = wallCurrent;
    var delta = Math.min(wallDelta, this.maxStep);
    this.time += delta;
    return delta;
}
// END OF COPY PASTE

Timer.prototype.getTime = function(){
	return this.time;
}

function randomFromTo(from, to){
	return Math.floor(Math.random() * (to - from + 1) + from);
}