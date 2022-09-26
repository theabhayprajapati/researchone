import { generateRandomBoolean, getRandomArbitrary } from './helper.js';
import { moveLeft, moveRight } from './movements.js';
// var mario = document.getElementById('mario');
var gamefram = document.getElementById('frame');
function createMario() {

    var mario = document.createElement('img');
    var lefttunnel = document.getElementById('lefttunnel');
    var righttunnel = document.getElementById('righttunel');
    mario.src = '../public/images/mario.png';
    mario.style.position = 'absolute';
    mario.style.zIndex = '10';
    mario.style.cursor = 'pointer';
    mario.id = 'mario';
    var valueofleftTunnel = parseInt(window.getComputedStyle(lefttunnel).getPropertyValue('left'))
    var valueofrightTunnel = parseInt(window.getComputedStyle(righttunnel).getPropertyValue('left'))
    /* random true ofr false */
    let which = generateRandomBoolean();
    var randomX;
    if (which) {
        randomX = getRandomArbitrary(valueofleftTunnel, valueofleftTunnel);
    } else {
        randomX = getRandomArbitrary(valueofrightTunnel, valueofrightTunnel);
    }
    var randomY = getRandomArbitrary(400, 500);
    mario.style.left = randomX + 'px';
    mario.style.top = randomY + 'px';
    mario.style.width = '100px';
    mario.style.height = '100px';
    gamefram.appendChild(mario);
}
let isJumping = false
let isGoingRight = false
let isGoingLeft = false
let bottom = 0
let gravity = 0.9
let left = 0;
let leftTimerId;
let rightTimerId;
let seconds = 0;
let tens = 0;
let Interval;
/* when user click on space jump mario */
document.addEventListener('keydown', function (event) {
    console.log('keydown');
    if (event.keyCode === 32) {
        isGoingLeft = false;
        isGoingRight = false;
        /* if there is mario then destroy it */
        if (document.getElementById('mario')) {
            document.getElementById('mario').remove();
        }
        createMario();
        clearInterval(Interval);
        Interval = setInterval(startTimer, 10);

    }
}
);
/* when user click on right arrow move mario to right */
document.addEventListener('keydown', function (event) {
    console.log('keydown');
    if (event.keyCode === 39) {
        console.log("Going Right : " + isGoingRight);
        console.log("Going Left : " + isGoingLeft);
        isGoingLeft = false;
        isGoingRight = true;
        if (isGoingRight) {
            moveRight()
        }
    }
}
);/* when user click on left arrow move mario to left */
document.addEventListener('keydown', function (event) {
    console.log('keydown');
    if (event.keyCode === 37) {
        console.log("Going Right : " + isGoingRight);
        console.log("Going Left : " + isGoingLeft);
        isGoingRight = false;
        isGoingLeft = true;
        if (isGoingLeft) {
            moveLeft()
        }
    }
}
);



function startTimer() {
    tens++;
    if (tens <= 9) {
    }
    if (tens > 9) {

    }
    if (tens > 99) {
        seconds++;
        tens = 0;
    }

    if (seconds > 9) {
        // appendSeconds.innerHTML = seconds;
    }
    console.log(seconds + ":" + tens);
}

/* onmario click stop timer */
document.addEventListener('click', function (event) {
    console.log('click');
    if (event.target.id === 'mario') {
        /* save to index db with session time and date */
        savetoindexdb(seconds, tens);
        clearInterval(Interval);
    }
}
);
/* save to index db with session time and date */
function savetoindexdb(seconds, tens) {
    let db;
    const request = window.indexedDB.open("MyTestDatabase", 3);
    console.log(request);
    request.onerror = (event) => {
        console.error("Why didn't you allow my web app to use IndexedDB?!");
        // Do something with request.errorCode!
    };
}
