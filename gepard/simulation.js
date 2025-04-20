
const direction = {
    up: 0,
    right: 1,
    down: 2,
    left: 3,
};

const cellType = {
    empty: 0,
    road: 1,
    car: 2,
}

const car = {
    x: 0,
    y: 0,
    speed: 0,
    direction: direction.up,
};

const grid = {
    width: 30,
    height: 30,
    cells: [],
};

const Simulation = {  
    state: {
        running: false,
        cars: [],
    },

    cellSize: 20,
    numberOfCars: 10,

    setup: function() {
        frameRate(5);
        this.createGrid();
        this.drawGrid();
    },

    createGrid: function() {
        for (let x = 0; x < grid.width; x++) {
            grid.cells[x] = [];
            for (let y = 0; y < grid.height; y++) {
                grid.cells[x][y] = cellType.empty;
            }
        }

        this.createCircularRoad(5);
        this.createCircularRoad(6);
    },

    createCircularRoad: function(distance) {
        // Create horizontal roads
        for (let x = distance; x < grid.width - distance; x++) {
            grid.cells[x][distance] = cellType.road;
            grid.cells[x][grid.height - distance - 1] = cellType.road;
        }
        // Create vertical roads
        for (let y = distance; y < grid.height - distance; y++) {    
            grid.cells[distance][y] = cellType.road;
            grid.cells[grid.width - distance - 1][y] = cellType.road;
        }
    },

    drawGrid: function() {
        for (let i = 0; i < grid.width; i++) {
            for (let j = 0; j < grid.height; j++) {
                const offsetX = (width - grid.width * this.cellSize) / 2;
                const offsetY = (height - grid.height * this.cellSize) / 2;

                if (grid.cells[i][j] === cellType.empty) {
                    fill(0, 0, 0);
                } else if (grid.cells[i][j] === cellType.road) {
                    fill(100, 100, 100);
                } else if (grid.cells[i][j] === cellType.car) {
                    fill(0, 200, 0);
                } else {
                    fill(255, 255, 255);
                }
                
                rect(i * this.cellSize + offsetX, j * this.cellSize + offsetY, this.cellSize, this.cellSize);
            }
        }
    },

    createCars: function() {
        for (let i = 0; i < this.numberOfCars; i++) {
            const newCar = {
                x: random(5, grid.width - 5),
                y: random(5, grid.height - 5),
                speed: 1,
                direction: random(0, 3),
            };
            this.state.cars.push(newCar);
        }
    },

    start: function() {
        this.state.running = true;
        console.log('Starting simulation');
    },

    stop: function() {
        this.state.running = false;
        console.log('Stopping simulation');
    },

    update: function() {
        if (!this.state.running) return;
        
        
        this.drawGrid();
    },
}; 