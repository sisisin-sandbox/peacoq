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
/******/ ({

/***/ 2:
/***/ (function(module, exports) {

const p = navigator.mediaDevices.getUserMedia({ audio: false, video: { width: 1280, height: 720 } });
p.then(stream => {
  const video = document.querySelector('.camera');
  video.src = window.URL.createObjectURL(stream);
  record(stream);
});
p.catch(e => console.log(e.name));

function record(stream) {
  let recorder;
  let blob;
  document.querySelector('.record-start').addEventListener('click', e => {
    recorder = new MediaRecorder(stream);
    recorder.start();
    recorder.addEventListener('dataavailable', e => {
      blob = new Blob([e.data], { type: e.data.type });
    });
  });
  document.querySelector('.record-end').addEventListener('click', e => {
    recorder.stop();
  });
  document.querySelector('.play-start').addEventListener('click', e => {
    window.headers = new Headers();
    headers.append('Ocp-Apim-Subscription-Key', document.querySelector('.api-key').value);
    headers.append('Content-Type', 'application/octet-stream');
    fetch('https://westus.api.cognitive.microsoft.com/video/v1.0/trackface', { method: 'POST', headers, body: blob })
      .then(res => {
        console.log(res);
        window.ope = res.headers.get('Operation-Location');

        const intervalId = setInterval(() => {
          return fetch(ope, { headers })
            .then(res => res.json())
            .then(body => {
              if (body.status === 'Succeeded') {
                clearInterval(intervalId);
                console.log(JSON.parse(body.processingResult));
              }
            })
            .catch(err => {
              clearInterval(intervalId);
              alert(err)
            });
        }, 10000);
      })
  });
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.api-key').value = localStorage.getItem('api-key')
  document.querySelector('.save-key').addEventListener('click', e => {
    localStorage.setItem('api-key', document.querySelector('.api-key').value);
  });
})


/***/ })

/******/ });