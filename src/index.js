import { generateRandomBoolean, getRandomArbitrary, start, startTimer, stopTimer } from "./helper.js";
// var mario = document.getElementById('mario');
var gamefram = document.getElementById("frame");
var timer = document.getElementById("timer");
let beforejump;
var mario;
function createMario() {
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
    } else {
        randomX = getRandomArbitrary(valueofrightTunnel, valueofrightTunnel);
    }
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
document.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
        clearInterval(fallinginterval);
        start();
        const startmessage = document.getElementById("startmessage");
        if (startmessage) {
            startmessage.remove()
        }
        if (document.getElementById('mario')) {
            document.getElementById('mario').remove()
        }
        createMario();
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
                console.log(falling)
            }
            fallinginterval = falling;
            console.log(falling)
            console.log(currentYaxisofmario);
        }
            , 20);
    }
});
const sleep = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, 20)
    })
}

function removemario() {
    if (mario) {
        mario.remove();
    }
}
document.addEventListener("keydown", function (event) {
    /* space */
    if (event.keyCode === 32) {
        removemario()
        stopTimer();
    }
})