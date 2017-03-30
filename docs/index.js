/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = video => {
  
  const [width, height] = [video.videoWidth, video.videoHeight];

  const canvas = document.createElement('canvas');
  const buffer = document.createElement('canvas');
  canvas.id = 'ui';
  buffer.id = 'buffer';
  buffer.width = width;
  buffer.height = height;

  var bufferCtx = buffer.getContext('2d');

  const style = canvas.style;
  canvas.width = width;
  canvas.height = height;
  style.position = 'absolute';
  style.top = 0;
  style.left = 0;

  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  (function strokeTri() {
    const center = { x: width/2, y: height/2 };
    ctx.beginPath();
    ctx.moveTo(center.x, center.y);
    ctx.lineTo(center.x - 70, center.y + 80);
    ctx.lineTo(center.x - 80, center.y + 70);
    ctx.lineTo(center.x, center.y);
    ctx.closePath();
    ctx.fill();
  })();
  setInterval(() => {
    bufferCtx.drawImage(video, 0, 0);
    const x = Math.floor(width/2)-1;
    const y = Math.floor(height/2)-1;
    const buf = bufferCtx.getImageData(x, y, 3, 3);
    const c = {r:0,g:0,b:0};
    for (var i = 0; i < buf.data.length; i += 4) {
      c.r += buf.data[i + 0]; // Red
      c.g += buf.data[i + 1]; // Green
      c.b += buf.data[i + 2]; // Blue
      // c.r += buf.data[i + 3];                     // Alpha
    }
    c.r = Math.floor(c.r/9);
    c.g = Math.floor(c.g/9);
    c.b = Math.floor(c.b/9);
    (function strokeSq() {
      const center = { x: width/2, y: height/2 };
      const fillRect = (x, y, w, h) => {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + w, y);
        ctx.lineTo(x + w, y + h);
        ctx.lineTo(x, y + h);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.fill();
      };
      ctx.clearRect(center.x - 120, center.y + 70, 50, 30);
      ctx.fillStyle = 'rgb(0, 0, 0)';
      fillRect(center.x - 120, center.y + 70, 50, 30);
      const color = `rgb(${c.r}, ${c.g}, ${c.b})`;
      console.log(color);
      ctx.fillStyle = color;
      const borderWidth = 3;
      fillRect(center.x - 120 + borderWidth, center.y + 70 + borderWidth, 50 - borderWidth*2, 30 - borderWidth*2);

    })();
  }, 100);


};


/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const view = __webpack_require__(0);

const p = navigator.mediaDevices.getUserMedia({ audio: false, video: { width: 1280, height: 720 } });
p.then(stream => {
  const video = document.querySelector('video');
  video.src = window.URL.createObjectURL(stream);

  video.addEventListener('loadedmetadata', () => {
    console.log(video.videoHeight)
    view(video);
  });
});
p.catch(e => console.log(e.name));


/***/ })
/******/ ]);