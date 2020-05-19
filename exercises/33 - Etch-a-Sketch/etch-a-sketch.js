// Select the elements on the page - canvas, shake button

const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');

const shakeButton = document.querySelector('.shake');

// Setup our canvas for drawing

const {width, height} = canvas;
const MOVE_AMOUNT = 20;

let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT;

let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
ctx.beginPath();
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// Write a draw function

function draw({key}) {
    hue += 1;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    ctx.moveTo(x, y);
    switch (key) {
        case 'ArrowUp':
            y -= MOVE_AMOUNT;
            break;
        case 'ArrowDown':
            y += MOVE_AMOUNT;
            break;
        case 'ArrowLeft':
            x -= MOVE_AMOUNT;
            break;
        case 'ArrowRight':
            x += MOVE_AMOUNT;
            break;
        default:
            break;
    }
    ctx.lineTo(x, y);
    ctx.stroke();
}

// Write a handler for the keys
function handleKey(e) {
  if (e.key.includes('Arrow')) {
    e.preventDefault();
    draw({ key: e.key });
  }
}

// Clear/shake function

function clearCanvas() {
    canvas.classList.add('shake');
    canvas.addEventListener('animationend', function(){
        ctx.clearRect(0, 0, width, height);
        canvas.classList.remove('shake');
    }, {once: true})
}

// Listen for arrow keys

window.addEventListener('keydown', handleKey);
shakeButton.addEventListener('click', clearCanvas);