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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"currenttime\": () => (/* binding */ currenttime),\n/* harmony export */   \"downloadCSV\": () => (/* binding */ downloadCSV),\n/* harmony export */   \"generateRandomBoolean\": () => (/* binding */ generateRandomBoolean),\n/* harmony export */   \"getRandomArbitrary\": () => (/* binding */ getRandomArbitrary),\n/* harmony export */   \"start\": () => (/* binding */ start),\n/* harmony export */   \"startTimer\": () => (/* binding */ startTimer),\n/* harmony export */   \"stopTimer\": () => (/* binding */ stopTimer)\n/* harmony export */ });\nfunction getRandomArbitrary(min, max) {\r\n    return Math.random() * (max - min) + min;\r\n}\r\n\r\nfunction generateRandomBoolean() {\r\n    return Math.random() >= 0.5;\r\n}\r\nvar timer = document.getElementById(\"timer\")\r\nlet seconds;\r\nlet tens;\r\nfunction startTimer() {\r\n    tens++;\r\n    if (tens <= 9) {\r\n    }\r\n    if (tens > 9) {\r\n    }\r\n    if (tens > 99) {\r\n        seconds++;\r\n        tens = 0;\r\n    }\r\n\r\n    if (seconds > 9) {\r\n        // appendSeconds.innerHTML = seconds;\r\n    }\r\n    timer.innerHTML = seconds + \":\" + tens;\r\n}\r\nlet Interval;\r\nfunction start() {\r\n    tens = 0;\r\n    seconds = 0;\r\n    Interval = setInterval(startTimer, 10);\r\n}\r\nfunction currenttime() {\r\n    return seconds + \":\" + tens;\r\n}\r\nfunction stopTimer() {\r\n    clearInterval(Interval);\r\n}\r\n\r\n/* \r\n    [\r\n        {\r\n            mario: 1,\r\n            timetaken: 0:10\r\n        },\r\n        {\r\n            mario: 2,\r\n            timetaken: 0:20\r\n        }\r\n    ]\r\n*/\r\n// convert array into csv\r\nconst convertArrayObjectToCSV = (array) => {\r\n    const columnDelimiter = ',';\r\n    const lineDelimiter = '\\n';\r\n    const columnnames = [\r\n        'mario',\r\n        'timetaken'\r\n    ]\r\n    let result = '';\r\n    result += columnnames.join(columnDelimiter);\r\n    result += lineDelimiter;\r\n    array.forEach(item => {\r\n        /* get the first value of obj item */\r\n        let firstvalue = Object.values(item)[0].mario;\r\n        let secondvalue = Object.values(item)[0].timetaken;\r\n        console.log('firstvalue', firstvalue);\r\n        console.log('secondvalue', secondvalue);\r\n        result += firstvalue + columnDelimiter;\r\n        result += secondvalue + columnDelimiter;\r\n        result += lineDelimiter;\r\n    });\r\n    console.log('result', result);\r\n    return result;\r\n\r\n};\r\n// download csv\r\nconst downloadCSV = (array) => {\r\n    const link = document.createElement('a');\r\n    let csv = convertArrayObjectToCSV(array);\r\n    console.log('csv', csv);\r\n    if (csv == null) return;\r\n    const filename = filenamefn() + '.csv';\r\n    if (!csv.match(/^data:text\\/csv/i)) {\r\n        csv = `data:text/csv;charset=utf-8,${csv}`;\r\n    }\r\n    link.setAttribute('href', encodeURI(csv));\r\n    link.setAttribute('download', filename);\r\n    link.click();\r\n};\r\n\r\n\r\nfunction filenamefn() {\r\n    var d = new Date();\r\n    var n = d.getTime();\r\n    return n;\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://8queens/./src/helper.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper.js */ \"./src/helper.js\");\n\r\nvar gamefram = document.getElementById(\"frame\");\r\nvar timer = document.getElementById(\"timer\");\r\nlet beforejump;\r\nvar mario;\r\nlet marioonleft;\r\nlet marioonright;\r\nlet gamestart = false;\r\nvar downloadbtn = document.getElementById(\"download\");\r\nconst keycodes = {\r\n    left: 37,\r\n    right: 39,\r\n    space: 32,\r\n    enter: 13\r\n}\r\nconst totalscores = [];\r\nconst score = {\r\n    mario: 0,\r\n    timetaken: 0\r\n}\r\n\r\nlet currentmarionumber = 0;\r\nfunction createMario() {\r\n    if (document.getElementById('mario')) {\r\n        document.getElementById('mario').remove()\r\n    }\r\n    mario = document.createElement(\"img\");\r\n    var lefttunnel = document.getElementById(\"lefttunnel\");\r\n    var righttunnel = document.getElementById(\"righttunel\");\r\n    mario.src =\r\n        \"https://raw.githubusercontent.com/theabhayprajapati/researchone/main/public/images/mario.png\";\r\n    mario.style.position = \"absolute\";\r\n    mario.style.zIndex = \"10\";\r\n    mario.style.cursor = \"pointer\";\r\n    mario.id = \"mario\";\r\n    var valueofleftTunnel = parseInt(\r\n        window.getComputedStyle(lefttunnel).getPropertyValue(\"left\")\r\n    );\r\n    var valueofrightTunnel = parseInt(\r\n        window.getComputedStyle(righttunnel).getPropertyValue(\"left\")\r\n    );\r\n    /* random true ofr false */\r\n    let which = (0,_helper_js__WEBPACK_IMPORTED_MODULE_0__.generateRandomBoolean)();\r\n    var randomX;\r\n    if (which) {\r\n        randomX = (0,_helper_js__WEBPACK_IMPORTED_MODULE_0__.getRandomArbitrary)(valueofleftTunnel, valueofleftTunnel);\r\n        marioonleft = true;\r\n        marioonright = false;\r\n    } else {\r\n        randomX = (0,_helper_js__WEBPACK_IMPORTED_MODULE_0__.getRandomArbitrary)(valueofrightTunnel, valueofrightTunnel);\r\n        marioonright = true;\r\n        marioonleft = false;\r\n    }\r\n    var randomY = (0,_helper_js__WEBPACK_IMPORTED_MODULE_0__.getRandomArbitrary)(0, 0);\r\n    console.log('randomY', randomY);\r\n    mario.style.left = randomX + \"px\";\r\n    mario.style.top = randomY + \"px\";\r\n    mario.style.width = \"100px\";\r\n    mario.style.height = \"100px\";\r\n    gamefram.appendChild(mario);\r\n    beforejump = parseInt(\r\n        window.getComputedStyle(mario).getPropertyValue(\"top\")\r\n    );\r\n    currentmarionumber = currentmarionumber + 1;\r\n\r\n}\r\nlet Interval;\r\nvar fallinginterval;\r\nfunction falling() {\r\n    var currentYaxisofmario = parseInt(\r\n        window.getComputedStyle(mario).getPropertyValue(\"top\")\r\n    );\r\n    var falling = setInterval(function () {\r\n        fallinginterval = falling;\r\n        mario.style.top = currentYaxisofmario + 10 + \"px\";\r\n        currentYaxisofmario = currentYaxisofmario + 10;\r\n        if (currentYaxisofmario == 500) {\r\n            console.log('clear interval');\r\n            removemario();\r\n        }\r\n    }\r\n        , 20);\r\n}\r\nvar newans = []\r\nfunction removemario() {\r\n    clearInterval(fallinginterval);\r\n    console.log(totalscores)\r\n    //clear all intervals\r\n    if (mario) {\r\n        mario.remove();\r\n    }\r\n    totalscores.push([\r\n        {\r\n            mario: currentmarionumber,\r\n            timetaken: timer.innerHTML\r\n        }\r\n    ])\r\n    addstatsdata({\r\n        mario: currentmarionumber,\r\n        timetaken: timer.innerHTML\r\n    })\r\n    ;(0,_helper_js__WEBPACK_IMPORTED_MODULE_0__.stopTimer)();\r\n    init();\r\n\r\n}\r\nconst initialgamestart = async () => {\r\n    clearInterval(fallinginterval);\r\n    gamestart = true;\r\n    const startmessage = document.getElementById(\"startmessage\");\r\n    if (startmessage) {\r\n        startmessage.innerHTML = \"  \"\r\n    }\r\n    await init();\r\n}\r\ndocument.addEventListener(\"keydown\", function (event) {\r\n    if (event.keyCode === keycodes.enter) {\r\n        event.preventDefault();\r\n        gamestart ? null : initialgamestart();\r\n    }\r\n    if (event.keyCode === keycodes.space) {\r\n        event.preventDefault();\r\n        if (gamestart) {\r\n            removemario();\r\n        }\r\n    }\r\n    if (event.keyCode === keycodes.left) {\r\n        event.preventDefault();\r\n        if (gamestart) {\r\n            if (marioonleft) {\r\n                removemario();\r\n            }\r\n        }\r\n    }\r\n    if (event.keyCode === keycodes.right) {\r\n        event.preventDefault();\r\n        if (gamestart) {\r\n            if (marioonright) {\r\n                removemario();\r\n            }\r\n        }\r\n    }\r\n\r\n});\r\n\r\ndownloadbtn.addEventListener('click', () => {\r\n    (0,_helper_js__WEBPACK_IMPORTED_MODULE_0__.downloadCSV)(totalscores);\r\n})\r\n\r\nfunction addstatsdata(data) {\r\n    const { mario, timetaken } = data;\r\n    const tr = document.createElement('tr');\r\n    tr.id = 'table-record';\r\n    const td1 = document.createElement('td');\r\n    td1.id = 'mariocount';\r\n    td1.innerHTML = mario;\r\n    const td2 = document.createElement('td');\r\n    td2.id = 'timetaken';\r\n    td2.innerHTML = timetaken;\r\n    tr.appendChild(td1);\r\n    tr.appendChild(td2);\r\n    var table = document.getElementById(\"table-records\");\r\n    table.appendChild(tr);\r\n}\r\n/* timeout sleep */\r\nasync function timeout(ms) {\r\n    return new Promise(resolve => setTimeout(resolve, ms));\r\n}\r\n\r\nasync function init() {\r\n    const randomtimeout = (0,_helper_js__WEBPACK_IMPORTED_MODULE_0__.getRandomArbitrary)(1000, 5000);\r\n    clearInterval(fallinginterval);\r\n    (0,_helper_js__WEBPACK_IMPORTED_MODULE_0__.stopTimer)();\r\n    timeout(randomtimeout).then(() => {\r\n        createMario();\r\n        (0,_helper_js__WEBPACK_IMPORTED_MODULE_0__.start)();\r\n        console.log('completed creating')\r\n        falling();\r\n    });\r\n}\n\n//# sourceURL=webpack://8queens/./src/index.js?");

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