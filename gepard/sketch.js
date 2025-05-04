function setup() {
    createCanvas(windowWidth, windowHeight);

    UI.onSetup();
    Simulation.onSetup();
    Render.onSetup();
}

function draw() {
    Simulation.onUpdate();
    Render.onUpdate();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    Render.onResize();
}

function mouseWheel(event) {
    // Prevent default scrolling
    event.preventDefault();
    
    UI.onMouseWheel(event);
    
    return false;
}