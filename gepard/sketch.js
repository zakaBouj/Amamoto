function setup() {
    createCanvas(windowWidth, windowHeight);
    
    // Initialize UI and Simulation
    UI.setup();
    Simulation.setup();
}

function initalDraw() {
    background(180);
}

function draw() {
    Simulation.update();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
} 