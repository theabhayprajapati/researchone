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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"generateRandomBoolean\": () => (/* binding */ generateRandomBoolean),\n/* harmony export */   \"getRandomArbitrary\": () => (/* binding */ getRandomArbitrary),\n/* harmony export */   \"start\": () => (/* binding */ start),\n/* harmony export */   \"startTimer\": () => (/* binding */ startTimer),\n/* harmony export */   \"stopTimer\": () => (/* binding */ stopTimer)\n/* harmony export */ });\nfunction getRandomArbitrary(min, max) {\r\n    return Math.random() * (max - min) + min;\r\n}\r\n\r\nfunction generateRandomBoolean() {\r\n    return Math.random() >= 0.5;\r\n}\r\nvar timer = document.getElementById(\"timer\")\r\nlet seconds;\r\nlet tens;\r\nfunction startTimer() {\r\n    tens++;\r\n    if (tens <= 9) {\r\n    }\r\n    if (tens > 9) {\r\n    }\r\n    if (tens > 99) {\r\n        seconds++;\r\n        tens = 0;\r\n    }\r\n\r\n    if (seconds > 9) {\r\n        // appendSeconds.innerHTML = seconds;\r\n    }\r\n    timer.innerHTML = seconds + \":\" + tens;\r\n}\r\nlet Interval;\r\nfunction start() {\r\n    tens = 0;\r\n    seconds = 0;\r\n    Interval = setInterval(startTimer, 10);\r\n}\r\nfunction stopTimer() {\r\n    clearInterval(Interval);\r\n}\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://8queens/./src/helper.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper.js */ \"./src/helper.js\");\n\r\n// var mario = document.getElementById('mario');\r\nvar gamefram = document.getElementById(\"frame\");\r\nvar timer = document.getElementById(\"timer\");\r\nlet beforejump;\r\nvar mario;\r\nlet marioonleft;\r\nlet marioonright;\r\nfunction createMario() {\r\n    if (document.getElementById('mario')) {\r\n        document.getElementById('mario').remove()\r\n    }\r\n    mario = document.createElement(\"img\");\r\n    var lefttunnel = document.getElementById(\"lefttunnel\");\r\n    var righttunnel = document.getElementById(\"righttunel\");\r\n    mario.src =\r\n        \"https://raw.githubusercontent.com/theabhayprajapati/researchone/main/public/images/mario.png\";\r\n    mario.style.position = \"absolute\";\r\n    mario.style.zIndex = \"10\";\r\n    mario.style.cursor = \"pointer\";\r\n    mario.id = \"mario\";\r\n    var valueofleftTunnel = parseInt(\r\n        window.getComputedStyle(lefttunnel).getPropertyValue(\"left\")\r\n    );\r\n    var valueofrightTunnel = parseInt(\r\n        window.getComputedStyle(righttunnel).getPropertyValue(\"left\")\r\n    );\r\n    /* random true ofr false */\r\n    let which = (0,_helper_js__WEBPACK_IMPORTED_MODULE_0__.generateRandomBoolean)();\r\n    var randomX;\r\n    if (which) {\r\n        randomX = (0,_helper_js__WEBPACK_IMPORTED_MODULE_0__.getRandomArbitrary)(valueofleftTunnel, valueofleftTunnel);\r\n        marioonleft = true;\r\n        marioonright = false;\r\n    } else {\r\n        randomX = (0,_helper_js__WEBPACK_IMPORTED_MODULE_0__.getRandomArbitrary)(valueofrightTunnel, valueofrightTunnel);\r\n        marioonright = true;\r\n        marioonleft = false;\r\n    }\r\n    console.log('randomX', randomX);\r\n    console.log('which', which);\r\n    console.log('left', marioonleft);\r\n    console.log('right', marioonright);\r\n    var randomY = (0,_helper_js__WEBPACK_IMPORTED_MODULE_0__.getRandomArbitrary)(0, 0);\r\n    mario.style.left = randomX + \"px\";\r\n    mario.style.top = randomY + \"px\";\r\n    mario.style.width = \"100px\";\r\n    mario.style.height = \"100px\";\r\n    gamefram.appendChild(mario);\r\n    beforejump = parseInt(\r\n        window.getComputedStyle(mario).getPropertyValue(\"top\")\r\n    );\r\n}\r\nlet Interval;\r\n\r\nvar fallinginterval;\r\ndocument.addEventListener(\"keydown\", async function (event) {\r\n    if (event.keyCode === 13) {\r\n        clearInterval(fallinginterval);\r\n        const startmessage = document.getElementById(\"startmessage\");\r\n        if (startmessage) {\r\n            startmessage.remove()\r\n        }\r\n        /* run init() and when init function is complete then run fallling() */\r\n        await init();\r\n        // falling();\r\n    }\r\n});\r\n\r\nfunction falling() {\r\n    var currentYaxisofmario = parseInt(\r\n        window.getComputedStyle(mario).getPropertyValue(\"top\")\r\n    );\r\n    var falling = setInterval(function () {\r\n        mario.style.top = currentYaxisofmario + 10 + \"px\";\r\n        currentYaxisofmario = currentYaxisofmario + 10;\r\n        if (currentYaxisofmario == 500) {\r\n            console.log('clear interval');\r\n            // clear timer\r\n            // destor mario elemetn\r\n            mario.remove();\r\n            clearInterval(falling);\r\n            (0,_helper_js__WEBPACK_IMPORTED_MODULE_0__.stopTimer)();\r\n            init();\r\n        }\r\n        fallinginterval = falling;\r\n    }\r\n        , 20);\r\n}\r\nfunction removemario() {\r\n    clearInterval(fallinginterval);\r\n    //clear all intervals\r\n    if (mario) {\r\n        mario.remove();\r\n    }\r\n    (0,_helper_js__WEBPACK_IMPORTED_MODULE_0__.stopTimer)();\r\n    init();\r\n\r\n}\r\ndocument.addEventListener(\"keydown\", function (event) {\r\n    /* space */\r\n    if (event.keyCode === 32) {\r\n        removemario();\r\n    }\r\n});\r\n\r\ndocument.addEventListener(\"keydown\", function (event) {\r\n    if (event.keyCode === 39) {\r\n        if (marioonright) {\r\n            console.log('remove mario on right');\r\n            removemario();\r\n        }\r\n    }\r\n});\r\ndocument.addEventListener(\"keydown\", function (event) {\r\n    if (event.keyCode === 37) {\r\n        if (marioonleft) {\r\n            console.log('remove mario left');\r\n            removemario();\r\n        }\r\n    }\r\n});\r\n\r\n/* timeout sleep */\r\nasync function timeout(ms) {\r\n    return new Promise(resolve => setTimeout(resolve, ms));\r\n}\r\n\r\nasync function init() {\r\n    const randomtimeout = (0,_helper_js__WEBPACK_IMPORTED_MODULE_0__.getRandomArbitrary)(1000, 5000);\r\n    console.log('randomtimeout', randomtimeout);\r\n    timeout(randomtimeout).then(() => {\r\n        createMario();\r\n        (0,_helper_js__WEBPACK_IMPORTED_MODULE_0__.start)();\r\n        console.log('completed creating')\r\n        falling();\r\n    });\r\n}\n\n//# sourceURL=webpack://8queens/./src/index.js?");

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