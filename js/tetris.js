function Stage(){
	var container = document.createElement('div');
	document.body.appendChild(container);
	container.classList.add('container');

	var touches = [];

	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	container.appendChild(canvas);

	function init(){
		document.addEventListener('touchstart',touchStart,false);
		document.addEventListener('touchmove',touchMove,false);
		document.addEventListener('touchend',touchEnd,false);

		window.addEventListener('resize',onWindowResize);
		onWindowResize();

		loop();
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

		render();
	}

	function onWindowResize(){
		canvas.width = container.offsetWidth;
		canvas.height = container.offsetHeight;
	}

	function render(){
		ctx.clearRect(0,0,canvas.width,canvas.height);

		touches.forEach(function(o,i,a){
			console.log(o);

			ctx.beginPath();
			ctx.arc(o.clientX,o.clientY,50,0,2*Math.PI);
			ctx.stroke();
		});
	}

	init();
}

window[document.currentScript.getAttribute('name')||'tetris'] = new Stage();


if ('serviceWorker' in navigator) {
	navigator.serviceWorker
	         .register('service-worker.js')
	         .then(function() { console.log('Service Worker Registered');})
	         .catch(function(error) { console.log(error);});
}