function setup() {
    createCanvas(windowWidth, windowHeight);

    UI.setup();
    Render.onSetup();
}

function draw() {
    Render.onUpdate();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    Render.onResize();
} 