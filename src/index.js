import { getRandomArbitrary } from './helper.js';
import { moveLeft, moveRight } from './movements.js';
// var mario = document.getElementById('mario');
var gamefram = document.getElementById('frame');
var mario = document.createElement('img');
mario.src = '../public/images/mario.png';
mario.style.position = 'absolute';
mario.style.zIndex = '10';
var rnadomX = getRandomArbitrary(100, 1000);
var randomY = getRandomArbitrary(400, 500);
mario.style.left = rnadomX + 'px';
mario.style.top = randomY + 'px';
mario.style.width = '50px';
mario.style.height = '50px';
gamefram.appendChild(mario);
let isJumping = false
let isGoingRight = false
let isGoingLeft = false
let bottom = 0
let gravity = 0.9
let left = 0;
let leftTimerId;
let rightTimerId;
/* when user click on space jump mario */
document.addEventListener('keydown', function (event) {
    console.log('keydown');
    if (event.keyCode === 32) {
        isGoingLeft = false;
        isGoingRight = false;
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