function Game(){
	var container = document.getElementById('container');
	var touches = [];

	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	container.appendChild(canvas);

	function init(){
		document.addEventListener('touchstart',touchStart);
		document.addEventListener('touchmove',touchMove);
		document.addEventListener('touchend',touchEnd);

		window.addEventListener('resize',onWindowResize);
		onWindowResize();

		loop();
	}

	function touchStart(ev){
		touches = Array.prototype.slice.call(ev.touches);
	}

	function touchMove(ev){
		touches =  Array.prototype.slice.call(ev.touches);
	}

	function touchEnd(ev){
		touches =  Array.prototype.slice.call(ev.touches);
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
		touches.forEach(function(o,i,a){
			console.log(o);
		});
	}

	init();
}

window[document.currentScript.getAttribute('name')||'tetris'] = new Game();