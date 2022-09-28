function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function generateRandomBoolean() {
    return Math.random() >= 0.5;
}
var timer = document.getElementById("timer")
let seconds;
let tens;
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
    timer.innerHTML = seconds + ":" + tens;
}
let Interval;
function start() {
    tens = 0;
    seconds = 0;
    Interval = setInterval(startTimer, 10);
}
function stopTimer() {
    clearInterval(Interval);
}

export {
    getRandomArbitrary, generateRandomBoolean, startTimer, stopTimer, start
};

