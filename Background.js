const container = document.getElementById("main-background");
const canvas = document.getElementById("backgroundCanvas");

const ctx = canvas.getContext("2d");

const squareSize = 15;
const changeSpeed = 100;

const defaultColor = {
    r: 0,
    g: 5,
    b: 20
};

const highlightColor = {
    r: 0,
    g: 10,
    b: 24
};
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
                brightness: Math.random(),
                targetBrightness: Math.random()
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

    for (const square of squares) {

        // Smoothly move toward target
        square.brightness +=
            (square.targetBrightness - square.brightness) * 0.05;

        const x = square.x * squareSize;
        const y = square.y * squareSize;

        const brightness = square.brightness

        const center = canvas.width / 2;
        const distanceFromCenter = Math.abs(x - center);
        const maxDistance = canvas.width / 2;

        // 0 = center, 1 = edge
        const edgeDistance = distanceFromCenter / maxDistance;

        // Make the gradient concentrated toward the edges
        const edgeBrightness = Math.pow(edgeDistance, 10);

        const finalBrightness =
        brightness * (0.2 + edgeBrightness * 4);
        

        const r =
            defaultColor.r +
            (highlightColor.r - defaultColor.r) * finalBrightness;

        const g =
            defaultColor.g +
            (highlightColor.g - defaultColor.g) * finalBrightness;

        const b =
            defaultColor.b +
            (highlightColor.b - defaultColor.b) * finalBrightness;

        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;

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

setInterval(() => {

    if (squares.length === 0) return;

    const amount = Math.floor(Math.random() * 500) + 1;

    for (let i = 0; i < amount; i++) {

        const square =
            squares[Math.floor(Math.random() * squares.length)];

        square.targetBrightness = Math.random();
    }

}, changeSpeed);