const container = document.getElementById("main-background");

const canvas = document.createElement("canvas");
canvas.id = "backgroundCanvas";

container.prepend(canvas);

const ctx = canvas.getContext("2d");

const squareSize = 40;
const changeSpeed = 100;

// Store brightness for each square
let squares = [];

function resizeCanvas() {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    const columns = Math.ceil(canvas.width / squareSize);
    const rows = Math.ceil(canvas.height / squareSize);

    squares = [];

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {

            squares.push({
                x: x,
                y: y,

                // Random starting brightness
                brightness: Math.random()
            });
        }
    }
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


function draw() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    const columns = Math.ceil(canvas.width / squareSize);

    for (const square of squares) {

        const x = square.x * squareSize;
        const y = square.y * squareSize;

        // Convert brightness to a color
        const brightness = Math.floor(
            square.brightness * 255
        );

        ctx.fillStyle =
            `rgb(${brightness}, ${brightness}, ${brightness})`;

        ctx.fillRect(
            x,
            y,
            squareSize,
            squareSize
        );
    }

    requestAnimationFrame(draw);
}

draw();


// Randomly change squares
setInterval(() => {

    if (squares.length === 0) return;

    // Change a random number of squares
    const amount = Math.floor(
        Math.random() * 5
    ) + 1;

    for (let i = 0; i < amount; i++) {

        const square =
            squares[Math.floor(Math.random() * squares.length)];

        square.brightness =
            Math.random();
    }

}, changeSpeed);