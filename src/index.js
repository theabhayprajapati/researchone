import { generateRandomBoolean, getRandomArbitrary, start, stopTimer } from "./helper.js";
var gamefram = document.getElementById("frame");
var timer = document.getElementById("timer");
let beforejump;
var mario;
let marioonleft;
let marioonright;
let gamestart = false;

const keycodes = {
    left: 37,
    right: 39,
    space: 32,
    enter: 13
}
const scores = {
    left: 0,
    right: 0,
    center: 0,
    total: 0
}
function createMario() {
    if (document.getElementById('mario')) {
        document.getElementById('mario').remove()
    }
    mario = document.createElement("img");
    var lefttunnel = document.getElementById("lefttunnel");
    var righttunnel = document.getElementById("righttunel");
    mario.src =
        "https://raw.githubusercontent.com/theabhayprajapati/researchone/main/public/images/mario.png";
    mario.style.position = "absolute";
    mario.style.zIndex = "10";
    mario.style.cursor = "pointer";
    mario.id = "mario";
    var valueofleftTunnel = parseInt(
        window.getComputedStyle(lefttunnel).getPropertyValue("left")
    );
    var valueofrightTunnel = parseInt(
        window.getComputedStyle(righttunnel).getPropertyValue("left")
    );
    /* random true ofr false */
    let which = generateRandomBoolean();
    var randomX;
    if (which) {
        randomX = getRandomArbitrary(valueofleftTunnel, valueofleftTunnel);
        marioonleft = true;
        marioonright = false;
    } else {
        randomX = getRandomArbitrary(valueofrightTunnel, valueofrightTunnel);
        marioonright = true;
        marioonleft = false;
    }
    var randomY = getRandomArbitrary(0, 0);
    console.log('randomY', randomY);
    mario.style.left = randomX + "px";
    mario.style.top = randomY + "px";
    mario.style.width = "100px";
    mario.style.height = "100px";
    gamefram.appendChild(mario);
    beforejump = parseInt(
        window.getComputedStyle(mario).getPropertyValue("top")
    );
}
let Interval;

var fallinginterval;


function falling() {
    var currentYaxisofmario = parseInt(
        window.getComputedStyle(mario).getPropertyValue("top")
    );
    var falling = setInterval(function () {
        fallinginterval = falling;
        mario.style.top = currentYaxisofmario + 10 + "px";
        currentYaxisofmario = currentYaxisofmario + 10;
        if (currentYaxisofmario == 500) {
            console.log('clear interval');
            // clear timer
            // destor mario elemetn
            mario.remove();
            clearInterval(falling);
            stopTimer();
            init();
        }
    }
        , 20);
}
function removemario() {
    clearInterval(fallinginterval);
    //clear all intervals
    if (mario) {
        mario.remove();
    }
    stopTimer();
    init();

}
const initialgamestart = async () => {
    clearInterval(fallinginterval);
    gamestart = true;
    const startmessage = document.getElementById("startmessage");
    if (startmessage) {
        startmessage.innerHTML = "  "
    }
    await init();
}
document.addEventListener("keydown", function (event) {
    if (event.keyCode === keycodes.enter) {
        event.preventDefault();
        gamestart ? null : initialgamestart();
    }
    if (event.keyCode === keycodes.space) {
        event.preventDefault();
        if (gamestart) {
            removemario();
        }
    }
    if (event.keyCode === keycodes.left) {
        event.preventDefault();
        if (gamestart) {
            if (marioonleft) {
                removemario();
            }
        }
    }
    if (event.keyCode === keycodes.right) {
        event.preventDefault();
        if (gamestart) {
            if (marioonright) {
                removemario();
            }
        }
    }

});


/* timeout sleep */
async function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function init() {
    const randomtimeout = getRandomArbitrary(1000, 5000);
    clearInterval(fallinginterval);
    stopTimer();
    timeout(randomtimeout).then(() => {
        createMario();
        start();
        console.log('completed creating')
        falling();
    });
}