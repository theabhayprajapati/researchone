import { generateRandomBoolean, getRandomArbitrary } from "./helper.js";
import { moveLeft, moveRight } from "./movements.js";
// var mario = document.getElementById('mario');
var gamefram = document.getElementById("frame");
var timer = document.getElementById("timer");
let beforejump;
function createMario() {
    var mario = document.createElement("img");
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
    } else {
        randomX = getRandomArbitrary(valueofrightTunnel, valueofrightTunnel);
    }
    var randomY = getRandomArbitrary(400, 500);
    mario.style.left = randomX + "px";
    mario.style.top = randomY + "px";
    mario.style.width = "100px";
    mario.style.height = "100px";
    gamefram.appendChild(mario);
    beforejump = parseInt(
        window.getComputedStyle(mario).getPropertyValue("top")
    );
}
let isJumping = false;
let isGoingRight = false;
let isGoingLeft = false;
let bottom = 0;
let gravity = 0.9;
let left = 0;
let leftTimerId;
let rightTimerId;
let seconds = 0;
let tens = 0;
let Interval;
/* when user click on space jump mario */
document.addEventListener("keydown", function (event) {

    /* space */
    if (event.keyCode === 83) {
        isGoingLeft = false;
        isGoingRight = false;
        /* if there is mario then destroy it */
        if (document.getElementById("mario")) {
            document.getElementById("mario").remove();
        }
        createMario();
        clearInterval(Interval);
        tens = 0;
        seconds = 0;
        Interval = setInterval(startTimer, 10);
    }
});
/* when user click on right arrow move mario to right */
document.addEventListener("keydown", function (event) {

    if (event.keyCode === 39) {
        console.log("Going Right : " + isGoingRight);
        console.log("Going Left : " + isGoingLeft);
        isGoingLeft = false;
        isGoingRight = true;
        if (isGoingRight) {
            moveRight();
        }
    }
}); /* when user click on left arrow move mario to left */
document.addEventListener("keydown", function (event) {

    if (event.keyCode === 37) {
        console.log("Going Right : " + isGoingRight);
        console.log("Going Left : " + isGoingLeft);
        isGoingRight = false;
        isGoingLeft = true;
        if (isGoingLeft) {
            moveLeft();
        }
    }
});

/* on space click jump mario */
document.addEventListener("keydown", async function (event) {

    if (event.keyCode === 32) {
        // alert('space');
        /* if there is mario then destroy it */
        if (document.getElementById("mario")) {
            document.getElementById("mario").remove();
        }
        createMario();
        clearInterval(Interval);
        tens = 0;
        seconds = 0;
        Interval = setInterval(startTimer, 10);
        let yjump = 200;

        var marioscurrentheigth = parseInt(
            window.getComputedStyle(mario).getPropertyValue("top")
        );
        // var upinterval = setInterval(function () {
        //     console.log("jump");
        //     mario.style.top = marioscurrentheigth - 10 + "px";
        //     marioscurrentheigth = marioscurrentheigth - 10;
        //     if (marioscurrentheigth === beforejump - yjump) {
        //         clearInterval(upinterval);

        //         var downinterval = setInterval(function () {
        //             console.log("down");
        //             mario.style.top = marioscurrentheigth + 10 + "px";
        //             marioscurrentheigth = marioscurrentheigth + 10;
        //             if (marioscurrentheigth === beforejump) {
        //                 clearInterval(downinterval);
        //             }
        //         }, 10);
        //     }
        // }, 10);
        console.log('going to jump')
        let gravity = 0.9;
        var distancebetweenjumpandcurrentheight = beforejump - marioscurrentheigth;
        // in percentage
        var percentage = (distancebetweenjumpandcurrentheight / yjump) * 100;
        while (marioscurrentheigth > yjump) {
            console.log('jumping')
            mario.style.top = marioscurrentheigth - (10 * gravity) + "px";

            marioscurrentheigth = parseInt(
                window.getComputedStyle(mario).getPropertyValue("top")
            )
            await sleep()
        }
        while (marioscurrentheigth < beforejump) {
            console.log('falling')
            mario.style.top = marioscurrentheigth + (10 * gravity) + "px";
            marioscurrentheigth = parseInt(
                window.getComputedStyle(mario).getPropertyValue("top")
            )
            await sleep()
        }
        mario.style.top = beforejump + "px";
    }
});
const sleep = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, 20)
    })
}
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
    timer.innerHTML = seconds + ":" + tens;
}

/* onmario click stop timer */
document.addEventListener("click", function (event) {
    console.log("click");
    if (event.target.id === "mario") {
        clearInterval(Interval);
        // remove mario
        document.getElementById("mario").remove();
    }
}); 