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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const {Canvas} = __webpack_require__(3);

module.exports = video => {

  const [width, height] = [video.videoWidth, video.videoHeight];

  const gui = createGuiCanvas(width, height);

  const center = { x: Math.floor(width/2), y: Math.floor(height/2) };

  const buffer = new BufferCanvas(width, height);
  setInterval(() => {
    buffer.update(video);
    const picked = buffer.getColor(center.x - 1, center.y - 1, 3, 3);

    const color = `rgb(${picked.r}, ${picked.g}, ${picked.b})`;
    gui.updateLoupe(color);

  }, 100);

};

function createGuiCanvas(w, h) {
  const canvas = document.createElement('canvas');
  canvas.id = 'ui';

  const style = canvas.style;
  canvas.width = w;
  canvas.height = h;
  style.position = 'absolute';
  style.top = 0;
  style.left = 0;

  document.body.appendChild(canvas);

  return new Gui(new Canvas(canvas.getContext('2d')), w, h);
}

class BufferCanvas {
  constructor(width, height) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.id = 'buffer';
    this.ctx = canvas.getContext('2d');
  }

  update(video) {
    this.ctx.drawImage(video, 0, 0);
  }

  getColor(x, y, w, h) {
    const buf = this.ctx.getImageData(x, y, w, h);
    const color = { r: 0, g: 0, b: 0, a: 0 };
    for (let i = 0; i < buf.data.length; i += 4) {
      color.r += buf.data[i + 0]; // Red
      color.g += buf.data[i + 1]; // Green
      color.b += buf.data[i + 2]; // Blue
      color.a += buf.data[i + 3]; // Alpha
    }
    const cnt = buf.data.length / 4;
    color.r = Math.floor(color.r / cnt);
    color.g = Math.floor(color.g / cnt);
    color.b = Math.floor(color.b / cnt);
    color.a = Math.floor(color.a / cnt);
    return color;
  }

}

class Gui {
  constructor(canvas, width, height) {
    this.center = { x: Math.floor(width/2), y: Math.floor(height/2) };
    this.width = width;
    this.height = height;
    this.canvas = canvas;
    this.ctx = canvas.ctx;
  }

  updateLoupe(c) {
    this._fillTri(this.center.x, this.center.y);
    this.canvas.fillRect(this.center.x - 170, this.center.y + 70, 100, 80);
    this.canvas.fillRect(this.center.x - 170 + 3, this.center.y + 70 + 3, 100 - 6, 60 - 6, c);
    this.canvas.fillText(c, this.center.x - 170 + 3, this.center.y + 130 + 3, 100 - 6);
  }

  _fillTri(centerX, centerY) {
    this.ctx.fillStyle = 'rgb(0, 0, 0)';
    this.ctx.beginPath();
    this.ctx.moveTo(centerX, centerY);
    this.ctx.lineTo(centerX - 70, centerY + 80);
    this.ctx.lineTo(centerX - 80, centerY + 70);
    this.ctx.lineTo(centerX, centerY);
    this.ctx.closePath();
    this.ctx.fill();
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const view = __webpack_require__(0);

const p = navigator.mediaDevices.getUserMedia({ audio: false, video: { width: 1280, height: 720 } });
p.then(stream => {
  const video = document.querySelector('video');
  video.src = window.URL.createObjectURL(stream);

  video.addEventListener('loadedmetadata', () => {
    view(video);
  });
});
p.catch(e => console.log(e.name));


/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports) {

module.exports.Canvas = class {
  constructor(ctx) {
    this.ctx = ctx;
  }

  fillRect(x, y, w, h, c) {
    this.ctx.fillStyle = c || 'rgb(0, 0, 0)';
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x + w, y);
    this.ctx.lineTo(x + w, y + h);
    this.ctx.lineTo(x, y + h);
    this.ctx.lineTo(x, y);
    this.ctx.closePath();
    this.ctx.fill();
  }

  fillText(text, x, y, len) {
    this.ctx.fillStyle = 'rgb(255, 255, 255)';
    this.ctx.textBaseline = 'top';
    this.ctx.fillText(text, x, y, len);
  }
}


/***/ })
/******/ ]);