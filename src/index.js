import { generateRandomBoolean, getRandomArbitrary, start, stopTimer } from "./helper.js";
// var mario = document.getElementById('mario');
var gamefram = document.getElementById("frame");
var timer = document.getElementById("timer");
let beforejump;
var mario;
let marioonleft;
let marioonright;
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
    console.log('randomX', randomX);
    console.log('which', which);
    console.log('left', marioonleft);
    console.log('right', marioonright);
    var randomY = getRandomArbitrary(0, 0);
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
document.addEventListener("keydown", async function (event) {
    if (event.keyCode === 13) {
        clearInterval(fallinginterval);
        const startmessage = document.getElementById("startmessage");
        if (startmessage) {
            startmessage.remove()
        }
        /* run init() and when init function is complete then run fallling() */
        await init();
        // falling();
    }
});

function falling() {
    var currentYaxisofmario = parseInt(
        window.getComputedStyle(mario).getPropertyValue("top")
    );
    var falling = setInterval(function () {
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
        fallinginterval = falling;
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
document.addEventListener("keydown", function (event) {
    /* space */
    if (event.keyCode === 32) {
        removemario();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.keyCode === 39) {
        if (marioonright) {
            console.log('remove mario on right');
            removemario();
        }
    }
});
document.addEventListener("keydown", function (event) {
    if (event.keyCode === 37) {
        if (marioonleft) {
            console.log('remove mario left');
            removemario();
        }
    }
});

/* timeout sleep */
async function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function init() {
    const randomtimeout = getRandomArbitrary(1000, 5000);
    console.log('randomtimeout', randomtimeout);
    timeout(randomtimeout).then(() => {
        createMario();
        start();
        console.log('completed creating')
        falling();
    });
}