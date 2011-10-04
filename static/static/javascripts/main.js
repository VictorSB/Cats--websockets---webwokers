//LOAD IMAGES
var assetCounter = 0;
var balloon = new Image();
balloon.addEventListener("load", function() {
    assetCounter++;
	if(assetCounter==2){
		startAnimation();
	}
}, false);
balloon.src = "static/images/logo_balloon.png";

var cloud = new Image();
cloud.addEventListener("load", function() {
    assetCounter++
	if(assetCounter==2){
		startAnimation();
	}
}, false);
cloud.src = "static/images/cloud.png";

//LOAD CANVAS
var canvas = document.getElementById('mainCanvas');
var ctx = canvas.getContext('2d');

// START OF SIMPLE ENGINE
function SimpleEngine(ctx,canvas){
	this.ctx = ctx;
	this.canvas = canvas;
	this.objects = [];
	this.timer = new Timer();
}

SimpleEngine.prototype.addObject = function(o){
	this.objects.push(o);
}

SimpleEngine.prototype.draw = function(){
	this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
	this.ctx.save();
	this.ctx.translate(this.ctx.canvas.width/2, this.ctx.canvas.height/2);
	for (var i = 0; i < this.objects.length; i++) {
		this.objects[i].draw(this.ctx);
	}
	this.ctx.restore();
}

SimpleEngine.prototype.update = function(){
	for (var i = 0; i < this.objects.length; i++) {
		this.objects[i].update();
	}
}

SimpleEngine.prototype.loop = function(){
	this.lastClockTick = this.timer.tick();
	this.update();
	this.draw();
}

SimpleEngine.prototype.start = function(){
	var self = this;
    (function loop() {
        self.loop();
        requestAnimFrame(loop, self.ctx.canvas);
    })();
}
//END OF SIMPLE ENGINE

//BALLOON
function Balloon(engine){
	this.posX = 0-115;
	this.posY = 0-150;
	this.T = 0.85;
	this.engine = engine
}

Balloon.prototype.draw = function(ctx){
	ctx.drawImage(balloon,this.posX,this.posY);
}

Balloon.prototype.update = function(ctx){
	this.posX += Math.sin(Math.PI/3/this.T*this.engine.timer.getTime());
	this.posY += Math.cos(Math.PI/4/this.T*this.engine.timer.getTime());
}
//END OF BALLOON

//CLOUD
function Cloud(engine){
	this.posX = randomFromTo(-500,500);
	this.posY = randomFromTo(-800,800);
	this.engine = engine
	this.width = 750;
	this.height = 330;
	this.scale = Math.random();
}

Cloud.prototype.draw = function(ctx){
	ctx.drawImage(cloud,this.posX,this.posY,this.width*this.scale,this.height*this.scale);
}

Cloud.prototype.update = function(ctx){
	this.posY += 2;
	if(this.posY>800){
		this.posY=-800;
		this.posX= randomFromTo(-500,500);
		this.scale = Math.random();
	}
	
}
//END OF CLOUD
function startAnimation(){
	var e = new SimpleEngine(ctx,canvas);
	for(var i=0;i<=24;i++){
		var c = new Cloud(e);
		e.addObject(c);
	}
	var b = new Balloon(e);
	e.addObject(b);
	for(var i=0;i<=8;i++){
		var c = new Cloud(e);
		e.addObject(c);
	}
	e.start();
}