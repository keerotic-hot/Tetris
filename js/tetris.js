function Stage(){
	var container = document.createElement('div');
	document.body.appendChild(container);
	container.classList.add('container');

	var touches = [];

	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	container.appendChild(canvas);

	var blocks = [];

	function init(){
		document.addEventListener('touchstart',touchStart,false);
		document.addEventListener('touchmove',touchMove,false);
		document.addEventListener('touchend',touchEnd,false);

		window.addEventListener('resize',onWindowResize);
		onWindowResize();

		loop();

		/*var block = new Block('img/block.png',100,100,40,40);
		blocks.push(block);
		block = new Block('img/block.png',200,100);
		blocks.push(block);*/

	}

	function touchStart(ev){
		touches = Array.prototype.slice.call(ev.touches);
		ev.stopPropagation();
	}

	function touchMove(ev){
		touches =  Array.prototype.slice.call(ev.touches);
		ev.stopPropagation();
	}

	function touchEnd(ev){
		touches =  Array.prototype.slice.call(ev.touches);
		ev.stopPropagation();
	}

	function loop(){
		requestAnimationFrame(loop);


		blocks.forEach(function(o,i,a){
			o.y++;
		});


		render();
	}

	function onWindowResize(){
		canvas.width = container.offsetWidth;
		canvas.height = container.offsetHeight;
	}

	function render(){
		ctx.clearRect(0,0,canvas.width,canvas.height);

		blocks.forEach(function(o,i,a){
			ctx.drawImage(o.img,o.x,o.y,o.width,o.height);
		});

		touches.forEach(function(o,i,a){
			console.log(o);

			ctx.beginPath();
			ctx.arc(o.clientX,o.clientY,50,0,2*Math.PI);
			ctx.stroke();
		});
	}

	init();
}

var images = {};

function Block(imgURL,x,y,width,height){
	var _this = this;
	var img = images[imgURL];
	if(!img){
		 img = new Image();
		 img.onload = function(ev){
		 	_this.width = width || ev.target.width;
		 	_this.height = height || ev.target.height;
		 }
		 img.src = imgURL;
	}
	else {
	 	_this.width = width || img.width;
	 	_this.height = height || img.height;
	}
	_this.x = x;
	_this.y = y;
	_this.img = img;
}

window[document.currentScript.getAttribute('name')||'tetris'] = new Stage();


if ('serviceWorker' in navigator) {
	navigator.serviceWorker
	         .register('service-worker.js')
	         .then(function() { console.log('Service Worker Registered');})
	         .catch(function(error) { console.log(error);});
}