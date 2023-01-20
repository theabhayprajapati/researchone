import { downloadCSV } from "./helper";

const HEIGHT = 480;
const WIDTH = 800;
const marioHEIGHT = 32;
const marioWIDTH = 32;
const TUNNEL_WIDTH = 100;
const TUNNEL_HEIGHT = 50;
const RIGHT_CENTER = (WIDTH / 4) - (TUNNEL_WIDTH / 2);
const LEFT_CENTER = (WIDTH / 4) * 3 - (TUNNEL_WIDTH / 2) + 50;
var killed = false;
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = WIDTH;
canvas.style.background = 'black';
canvas.height = HEIGHT;
document.body.appendChild(canvas);
// make a download button below the canvas
const downloadButton = document.createElement('button');
downloadButton.innerHTML = 'Download';
downloadButton.style.position = 'absolute';
downloadButton.style.bottom = '0';
downloadButton.style.left = '0';
downloadButton.setAttribute('id', 'downloadButton');
downloadButton.addEventListener('click', function () {
    downloadCSV(game.scores);
});

document.body.appendChild(downloadButton);


class GameRecord {
    constructor(
        timestamp, times
    ) {
        this.timestamp = 0;
        this.times = 0;
    }
}
const gameValues = {
    status: {
        'playing': 'playing',
        'stop': 'stop',
        'pause': 'pause',
        'gameOver': 'gameOver'
    },
    modes: {
        'singleTunnel': 'singleTunnel',
        'doubleTunnel': 'doubleTunnel',
    },
    xPosition: {
        'left': 'left',
        'right': 'right',
        'center': 'center'
    },
    modeStatus: {
        'trial': 'trial',
        'performance': 'performance'
    }
}
class Game {
    constructor() {
        this.tunnel = new Tunnel();
        this.mario = new Mario();
        this.stopwatch = new Stopwatch();
        this.scores = {
            'singleTunnel': {
                'trial': [],
                'performance': []
            },
            'doubleTunnel': {
                'trial': {
                    'center': [],
                    'left': [],
                    'right': []
                },
                'performance': {
                    'center': [],
                    'left': [],
                    'right': []
                },
            }
        };
        this.gameMode = gameValues.modes.singleTunnel;
        this.times = 0;
        this.modeStatus = gameValues.modeStatus.trial;
        this.status = gameValues.status.stop;
    }
    changeGameMode() {
        if (this.gameMode === gameValues.modes.singleTunnel) {
            this.gameMode = gameValues.modes.doubleTunnel;
        } else {
            this.gameMode = gameValues.modes.singleTunnel;
        }
    }
    pause() {
        this.status = gameValues.status.pause;
    }
    pauseUI() {
        mario.speed = 0;
        stopwatch.stop();
    }
}

class Mario {
    constructor() {
        this.x = (WIDTH / 2) - (marioWIDTH / 2);
        this.y = 0;
        this.width = marioWIDTH;
        this.height = marioHEIGHT;
        this.image = new Image();
        this.image.src = 'images/mario.png';
        this.speed = 5;
        this.times = 1;
        this.xPosition = gameValues.xPosition.center;
    }
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    move() {
        this.y += this.speed;
    }
    checkCollision() {
        if (game.gameMode === 'singleTunnel') {
            if (tunnel.checkCollision(this)) {
                // Mario hit the tunnel
                this.speed = 0;
                stopwatch.stop();
                this.onKill('tunnel');
                this.startOver();
            }
            if (this.y + this.height > HEIGHT) {
                this.y = HEIGHT - this.height;
                this.speed = 0;
                stopwatch.stop();
                this.onKill('tunnel');
                this.startOver();
            }
        }
        if (game.gameMode === 'doubleTunnel') {
            if (doubleTunnel.checkCollision(this)) {
                // Mario hit the tunnel
                this.speed = 0;
                stopwatch.stop();
                this.onKill('tunnel');
                this.startOver();
            }
            if (this.y + this.height > HEIGHT) {
                this.y = HEIGHT - this.height;
                this.speed = 0;
                stopwatch.stop();
                this.onKill('tunnel');
                this.startOver();
            }
        }
    }
    startOver() {
        if (game.gameMode === 'singleTunnel') {
            this.x = (WIDTH / 2) - (marioWIDTH / 2);
        } else {
            // random left right 
            const random = Math.floor(Math.random() * 2);
            if (random === 0) {
                this.xPosition = gameValues.xPosition.left;
                this.x = RIGHT_CENTER;
            } else {
                this.xPosition = gameValues.xPosition.right;
                this.x = LEFT_CENTER;
            }
        }
        this.y = 0;
        this.width = marioWIDTH;
        this.height = marioHEIGHT;
        this.image = new Image();
        this.image.src = 'images/mario.png';
        this.speed = 5;
        stopwatch.stop();
        stopwatch.start();
    }
    onKill(killedBy) {
        const elapsedTime = stopwatch.getElapsedTime();
        const record = {
            'timestamp': killedBy === 'tunnel' ? 0 : stopwatch.getElapsedTime(),
            'times': this.times
        }
        console.log(record);
        // game.scores[game.gameMode][game.modeStatus].push(record);
        if (game.gameMode === gameValues.modes.singleTunnel) {
            game.scores.singleTunnel[game.modeStatus].push(record);
        } else {
            console.log(mario.xPosition)
            game.scores.doubleTunnel[game.modeStatus][mario.xPosition].push(record);
        }
        console.log(game.scores);
        this.times++;
    }
    position(x) {
        this.x = x;
    }
}
class Stopwatch {
    constructor() {
        this.startTime = null;
        this.stopTime = null;
        this.running = false;
    }
    start() {
        if (this.running) {
            return;
        }
        this.startTime = new Date().getTime();
        this.running = true;
    }
    stop() {
        if (!this.running) {
            return;
        }
        this.stopTime = new Date().getTime();
        this.running = false;
    }
    getElapsedTime() {
        if (this.startTime == null) {
            return 0;
        }
        if (this.running) {
            return new Date().getTime() - this.startTime;
        }
        return this.stopTime - this.startTime;
    }
}

const stopwatch = new Stopwatch();
class Tunnel {
    constructor(x) {
        this.x = x;
        this.y = (HEIGHT / 1.25);
        this.width = TUNNEL_WIDTH;
        this.height = TUNNEL_HEIGHT;
    }
    draw() {
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    checkCollision(obj) {
        if (obj.x < this.x + this.width &&
            obj.x + obj.width > this.x &&
            obj.y + obj.height > this.y &&
            obj.y + obj.height < this.y + this.height) {
            return true;
        }
        return false;
    }
}
const tunnel = new Tunnel((WIDTH / 2) - 50);
const mario = new Mario();

document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowUp') {
        mario.speed = -5;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.code === 'ArrowUp') {
        mario.speed = 5;
    }
});
// right arrow key
document.addEventListener('keydown', (event) => {
    if (game.status === gameValues.status.playing) {
        if (game.gameMode === gameValues.modes.doubleTunnel) {
            if (mario.xPosition === gameValues.xPosition.right) {
                if (event.code === 'ArrowRight') {
                    track();
                }
            }
        }
    }
});
// left arrow key
document.addEventListener('keydown', (event) => {
    if (game.status === gameValues.status.playing) {
        if (game.gameMode === gameValues.modes.doubleTunnel) {
            if (mario.xPosition === gameValues.xPosition.left) {
                if (event.code === 'ArrowLeft') {
                    track();
                }
            }
        }
    }
});
/* space speed 0 */
document.addEventListener('keydown', (event) => {
    if (game.status === gameValues.status.playing) {
        if (game.gameMode === gameValues.modes.singleTunnel) {
            if (event.code === 'Space') {
                track();
            }
        }
    }
});
function track() {
    game.pauseUI();
    /* pause for random time */
    const random = Math.floor(Math.random() * 1000);
    console.log(game.scores);
    mario.onKill();
    // setTimeout(() => {
    mario.startOver();
    // }, random * 10);
}
// start over click r
document.addEventListener('keydown', (event) => {
    if (event.code === 'KeyR') {
        mario.startOver();
        game.status = gameValues.status.playing;
        game.gameMode = gameValues.modes.singleTunnel;
    }
});
/* click m change game mode */

document.addEventListener('keydown', (event) => {
    if (event.code === 'KeyM') {
        game.changeGameMode();
        mario.startOver();
    }
});
document.addEventListener('keydown', (event) => {
    if (event.code === 'KeyS') {
        game.status = gameValues.status.playing;
        console.log(game.status);
    }
}
);
stopwatch.start();
const game = new Game();
class DoubleTunnel {
    constructor() {
        // left center tunnel
        this.tunnel1 = new Tunnel((WIDTH / 4) - (TUNNEL_WIDTH / 2));
        // right center tunnel
        this.tunnel2 = new Tunnel((WIDTH / 4) * 3 - (TUNNEL_WIDTH / 2));
    }
    draw() {
        this.tunnel1.draw();
        this.tunnel2.draw();
    }
    checkCollision(obj) {
        if (this.tunnel1.checkCollision(obj) || this.tunnel2.checkCollision(obj)) {
            return true;
        }
        return false;
    }
}

const doubleTunnel = new DoubleTunnel();

function repharseGame(game, mario) {
    if (mario.times >= 0 && mario.times <= 10) {
        game.gameMode = 'singleTunnel'
    } else if (mario.times >= 10 && mario.times <= 30) {
        game.gameMode = 'doubleTunnel'
    }
}

function draw() {
    if (game.status == gameValues.status.stop) {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText(`Press S to start`, 20, 40);
    } else if (game.status == 'playing') {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        mario.draw();
        mario.move();
        mario.checkCollision();
        if (game.gameMode === gameValues.modes.singleTunnel) {
            tunnel.draw();
        } else {
            doubleTunnel.draw();
        }
        repharseGame(game, mario);
        if (mario.times >= 30) {
            game.status = gameValues.status.gameOver;
        }
        // Display elapsed time
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText(`Elapsed Time: ${stopwatch.getElapsedTime()}ms`, 20, 40);
        // Display times
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        /* 
        if marios times
        */
        ctx.fillText(`Times: ${mario.times}`, 20, 80);
        takeMarioTimeGiveStatusMessages(mario);
    } else if (game.status == gameValues.status.gameOver) {
        stopwatch.stop();
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText(`Game Over`, 20, 40);
        ctx.fillText(`Press R to restart`, 20, 80);
        ctx.fillText(`Press M to change game mode`, 20, 120);
        ctx.fillText(`Your score: ${mario.times}`, 20, 160);
        ctx.fillText(`Your time: ${stopwatch.getElapsedTime()}ms`, 20, 200);
        ctx.fillText(`Your game mode: ${game.gameMode}`, 20, 240);
        ctx.fillText(`Your status: ${statusMessages[mario.times]}`, 20, 280);
    } else {
        console.log("inside else...")
    }
    requestAnimationFrame(draw);
}
draw();

var statusMessages = {
    '1': 'trial SINGLE HAND',
    '2': 'Performance SINGLE HAND',
    '3': 'Trial DOUBLE HAND LEFT',
    '4': 'Performance DOUBLE HAND LEFT',
    '5': 'Trial DOUBLE HAND RIGHT',
    '6': 'Performance DOUBLE HAND RIGHT',
}
function takeMarioTimeGiveStatusMessages(mario) {
    // divide by 5
    var times = Math.floor(mario.times / 5);
    console.log(times);
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(`Your status: ${statusMessages[(times + 1)]}`, (WIDTH - ((50 * WIDTH) / 100)), 40);
    var modeStatus = statusMessages[(times + 1)]?.toLowerCase().split(' ');
    console.log(modeStatus);
    if (modeStatus.includes('trial')) {
        game.modeStatus = gameValues.modeStatus.trial;
    } else {
        game.modeStatus = gameValues.modeStatus.performance;
    }
}
