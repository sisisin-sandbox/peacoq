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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

module.exports.Canvas = class {
  constructor(ctx) {
    this.ctx = ctx;
  }

  strokeRect(x, y, w, h, c) {
    this.ctx.strokeStyle = c ? this.rgb(c) : this.rgb({r:0, g:0, b:0});
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x + w, y);
    this.ctx.lineTo(x + w, y + h);
    this.ctx.lineTo(x, y + h);
    this.ctx.lineTo(x, y);
    this.ctx.closePath();
    this.ctx.stroke();
  }

  fillRect(x, y, w, h, c) {
    this.ctx.fillStyle = c ? this.rgb(c) : this.rgb({r:0, g:0, b:0});
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x + w, y);
    this.ctx.lineTo(x + w, y + h);
    this.ctx.lineTo(x, y + h);
    this.ctx.lineTo(x, y);
    this.ctx.closePath();
    this.ctx.fill();
  }

  fillText(text, x, y, len, font) {
    if (!!font) {
      this.ctx.font = font;
    }
    this.ctx.fillStyle = this.rgb({r:255, g:255, b:255});
    this.ctx.textBaseline = 'top';
    this.ctx.fillText(text, x, y, len);
  }

  rgb(c) {
    return `rgb(${c.r}, ${c.g}, ${c.b})`;
  }
}


/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

const {Canvas} = __webpack_require__(0);

const p = navigator.mediaDevices.getUserMedia({ audio: false, video: { width: 1280, height: 720 } });
p.then(stream => {
  const video = document.querySelector('.camera');
  video.src = window.URL.createObjectURL(stream);
  record(video, stream);
});
p.catch(e => console.log(e.name));

function record(video, stream) {
  let recorder;
  let blob;
  document.querySelector('.start').addEventListener('click', e => {
    const canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');
    ctx.getImageData(0, 0, 1280, 720);
    ctx.drawImage(video, 0, 0);
    canvas.toBlob(blob => {
      fetchFaceApi(blob, new Canvas(ctx));
    });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  const storageKeyName = 'face-api-key';
  document.querySelector('.api-key').value = localStorage.getItem(storageKeyName);
  document.querySelector('.save-key').addEventListener('click', e => {
    localStorage.setItem(storageKeyName, document.querySelector('.api-key').value);
  });
})

function fetchFaceApi(imageBlob, canvas) {
  window.headers = new Headers();
  headers.append('Ocp-Apim-Subscription-Key', document.querySelector('.api-key').value);
  headers.append('Content-Type', 'application/octet-stream');

  fetch('https://westus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceLandmarks=true&returnFaceAttributes=age,gender', { method: 'POST', headers, body: imageBlob })
    .then(res => res.json())
    .then(body => {
      console.log(body);
      document.querySelector('canvas').style.display = 'block';
      body.forEach(b => {
        const faceRectangle = b.faceRectangle;
        const {age, gender} = b.faceAttributes;
        canvas.strokeRect(faceRectangle.left, faceRectangle.top, faceRectangle.width, faceRectangle.height, {r:255,g:255,b:255});
        const text = {
          x: faceRectangle.left - 100,
          y: faceRectangle.top + Math.ceil(faceRectangle.height/2),
          w: 80,
          h: 40
        }
        canvas.fillRect(text.x, text.y, text.w, text.h, {r:0,g:0,b:0});
        canvas.fillText(`${gender}:${age}`, text.x, text.y, text.w, "30px 'Times New Roman'");
      });
    })
}


/***/ })

/******/ });