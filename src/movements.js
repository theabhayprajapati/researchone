var mario = document.getElementById('mario');
let isJumping = false
let isGoingRight = false
let isGoingLeft = false
let bottom = 0
let gravity = 0.9
let left = 0;
let leftTimerId;
let rightTimerId;
function moveRight() {
    rightTimerId = setInterval(function () {
        /* get current left */
        var currentleftvalueofmario = parseInt(window.getComputedStyle(mario).getPropertyValue('left'));
        /* add 10 to left */
        if (currentleftvalueofmario > 1050) {
            // 
        } else {
            mario.style.left = currentleftvalueofmario + 10 + 'px';
        }
    }, 20)
}

function moveLeft() {
    leftTimerId = setInterval(function () {
        /* get current left */
        var currentleftvalueofmario = parseInt(window.getComputedStyle(mario).getPropertyValue('left'));
        if (currentleftvalueofmario < 0) {
            // mario.style.left = 0 + 'px';
        } else {
            mario.style.left = currentleftvalueofmario - 10 + 'px';
        }
    }, 20)
}
export { moveLeft, moveRight };

