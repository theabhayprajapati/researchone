/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/helper.js":
/*!***********************!*\
  !*** ./src/helper.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getRandomArbitrary\": () => (/* binding */ getRandomArbitrary)\n/* harmony export */ });\nfunction getRandomArbitrary(min, max) {\r\n    return Math.random() * (max - min) + min;\r\n}\r\n\n\n//# sourceURL=webpack://8queens/./src/helper.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper.js */ \"./src/helper.js\");\n/* harmony import */ var _movements_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./movements.js */ \"./src/movements.js\");\n\r\n\r\n// var mario = document.getElementById('mario');\r\nvar gamefram = document.getElementById('frame');\r\nvar mario = document.createElement('img');\r\nmario.src = '../public/images/mario.png';\r\nmario.style.position = 'absolute';\r\nmario.style.zIndex = '10';\r\nvar rnadomX = (0,_helper_js__WEBPACK_IMPORTED_MODULE_0__.getRandomArbitrary)(100, 1000);\r\nvar randomY = (0,_helper_js__WEBPACK_IMPORTED_MODULE_0__.getRandomArbitrary)(400, 500);\r\nmario.style.left = rnadomX + 'px';\r\nmario.style.top = randomY + 'px';\r\nmario.style.width = '50px';\r\nmario.style.height = '50px';\r\ngamefram.appendChild(mario);\r\nlet isJumping = false\r\nlet isGoingRight = false\r\nlet isGoingLeft = false\r\nlet bottom = 0\r\nlet gravity = 0.9\r\nlet left = 0;\r\nlet leftTimerId;\r\nlet rightTimerId;\r\n/* when user click on space jump mario */\r\ndocument.addEventListener('keydown', function (event) {\r\n    console.log('keydown');\r\n    if (event.keyCode === 32) {\r\n        isGoingLeft = false;\r\n        isGoingRight = false;\r\n    }\r\n}\r\n);\r\n/* when user click on right arrow move mario to right */\r\ndocument.addEventListener('keydown', function (event) {\r\n    console.log('keydown');\r\n    if (event.keyCode === 39) {\r\n        console.log(\"Going Right : \" + isGoingRight);\r\n        console.log(\"Going Left : \" + isGoingLeft);\r\n        isGoingLeft = false;\r\n        isGoingRight = true;\r\n        if (isGoingRight) {\r\n            (0,_movements_js__WEBPACK_IMPORTED_MODULE_1__.moveRight)()\r\n        }\r\n    }\r\n}\r\n);/* when user click on left arrow move mario to left */\r\ndocument.addEventListener('keydown', function (event) {\r\n    console.log('keydown');\r\n    if (event.keyCode === 37) {\r\n        console.log(\"Going Right : \" + isGoingRight);\r\n        console.log(\"Going Left : \" + isGoingLeft);\r\n        isGoingRight = false;\r\n        isGoingLeft = true;\r\n        if (isGoingLeft) {\r\n            (0,_movements_js__WEBPACK_IMPORTED_MODULE_1__.moveLeft)()\r\n        }\r\n    }\r\n}\r\n);\n\n//# sourceURL=webpack://8queens/./src/index.js?");

/***/ }),

/***/ "./src/movements.js":
/*!**************************!*\
  !*** ./src/movements.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"moveLeft\": () => (/* binding */ moveLeft),\n/* harmony export */   \"moveRight\": () => (/* binding */ moveRight)\n/* harmony export */ });\nvar mario = document.getElementById('mario');\r\nlet isJumping = false\r\nlet isGoingRight = false\r\nlet isGoingLeft = false\r\nlet bottom = 0\r\nlet gravity = 0.9\r\nlet left = 0;\r\nlet leftTimerId;\r\nlet rightTimerId;\r\nfunction moveRight() {\r\n    rightTimerId = setInterval(function () {\r\n        /* get current left */\r\n        var currentleftvalueofmario = parseInt(window.getComputedStyle(mario).getPropertyValue('left'));\r\n        /* add 10 to left */\r\n        if (currentleftvalueofmario > 1050) {\r\n            // \r\n        } else {\r\n            mario.style.left = currentleftvalueofmario + 10 + 'px';\r\n        }\r\n    }, 20)\r\n}\r\n\r\nfunction moveLeft() {\r\n    leftTimerId = setInterval(function () {\r\n        /* get current left */\r\n        var currentleftvalueofmario = parseInt(window.getComputedStyle(mario).getPropertyValue('left'));\r\n        if (currentleftvalueofmario < 0) {\r\n            // mario.style.left = 0 + 'px';\r\n        } else {\r\n            mario.style.left = currentleftvalueofmario - 10 + 'px';\r\n        }\r\n    }, 20)\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://8queens/./src/movements.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;