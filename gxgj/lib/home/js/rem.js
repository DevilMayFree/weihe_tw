if(window.screen.availWidth>1024){
	(function(win, doc) {
			'use strict';
			var options = { width: 750, dpr: win.devicePixelRatio };
			var html = doc.documentElement,
					width = html.getAttribute('data-width') || options.width,
					dpr = html.getAttribute('data-dpr') || options.dpr,
					viewPort = doc.querySelector('meta[name="viewport"]'),
					rotate = win.onorientationchange ? 'orientationchange' : 'resize';
	
			// 设置html fontSize
			function setSize() {

					var winWidth = win.innerWidth || html.clientWidth;
					html.style.fontSize = 78 * winWidth / width + 'px';

					// document.getElementById('exampleModal').style.fontSize = '1px';

			};
	
			// 设置 initial-scale
			function setScale() {
					setSize();
					var viewContent = viewPort.getAttribute('content');
					var reg = /initial-scale=(\d(.\d+)?)/i;
					var matchRes = viewContent.match(reg);
					var scale = 1 / parseInt(dpr);
					if (matchRes && matchRes[1] == scale) {
							return;
					}
					var newContent = viewContent.replace(reg, function(a, b) {
							return a.replace(/\d(.\d+)?/i, scale);
					});
					viewPort.setAttribute('content', newContent);
			};
			
			win.addEventListener(rotate, setSize);
			window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
			requestAnimationFrame(setScale);
	}(window, document));
}