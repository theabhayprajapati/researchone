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

class GameRecord {
    constructor(
        timestamp, times
    ) {
        this.timestamp = 0;
        this.times = 0;
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
                'trial': [],
                'performance': []
            }
        };
        this.gameMode = 'singleTunnel';
        this.times = 0;
    }
    changeGameMode() {
        if (this.gameMode === 'singleTunnel') {
            this.gameMode = 'doubleTunnel';
        } else {
            this.gameMode = 'singleTunnel';
        }
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
                this.onKill();
            }
            if (this.y + this.height > HEIGHT) {
                this.y = HEIGHT - this.height;
                this.speed = 0;
                stopwatch.stop();
                this.onKill();
            }
        }
        if (game.gameMode === 'doubleTunnel') {
            if (doubleTunnel.checkCollision(this)) {
                // Mario hit the tunnel
                this.speed = 0;
                stopwatch.stop();
                this.onKill();
            }
            if (this.y + this.height > HEIGHT) {
                this.y = HEIGHT - this.height;
                this.speed = 0;
                stopwatch.stop();
                this.onKill();
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
                this.x = RIGHT_CENTER;
            } else {
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
    onKill() {
        const elapsedTime = stopwatch.getElapsedTime();
        const record = new GameRecord(elapsedTime, this.times);
        game.scores[game.gameMode].trial.push(record);
        this.times++;
        this.startOver();

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
    if (event.code === 'ArrowRight') {
        mario.x += 5;
    }
});
// left arrow key
document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowLeft') {
        mario.x -= 5;
    }
});
/* space speed 0 */
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        mario.speed = 0;
        stopwatch.stop();
    }
});
// start over click r
document.addEventListener('keydown', (event) => {
    if (event.code === 'KeyR') {
        mario.startOver();
    }
});
/* click m change game mode */

document.addEventListener('keydown', (event) => {
    if (event.code === 'KeyM') {
        game.changeGameMode();
        mario.startOver();
    }
});
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


function draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    mario.draw();
    mario.move();
    mario.checkCollision();
    if (game.gameMode === 'singleTunnel') {
        tunnel.draw();
    } else {
        doubleTunnel.draw();
    }
    // Display elapsed time
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(`Elapsed Time: ${stopwatch.getElapsedTime()}ms`, 20, 40);
    // Display times
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(`Times: ${mario.times}`, 20, 80);
    requestAnimationFrame(draw);
}
draw();
