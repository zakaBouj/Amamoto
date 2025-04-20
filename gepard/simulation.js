
const direction = {
    up: {x: 0, y: -1},
    right: {x: 1, y: 0},
    down: {x: 0, y: 1},
    left: {x: -1, y: 0},
};

const cellType = {
    empty: 0,
    road: 1,
    car: 2,
};

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
        roads: [],
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

        for (let i = 0; i < this.numberOfCars; i++) {
            const randomRoad = random(this.state.roads)
            this.createCar(randomRoad);
        }
    },

    createCircularRoad: function(distance) {
        // Create horizontal roads
        for (let x = distance; x < grid.width - distance; x++) {
            this.addRoad(x, distance, direction.right);
            this.addRoad(x, grid.height - distance - 1, direction.left);
        }
        // Create vertical roads
        for (let y = distance; y < grid.height - distance; y++) {    
            this.addRoad(distance, y, direction.up);
            this.addRoad(grid.width - distance - 1, y, direction.down);
        }

        this.state.roads.find(road => road.x === distance && road.y == distance).direction = direction.right;
        this.state.roads.find(road => road.x === grid.width - distance - 1 && road.y == distance).direction = direction.down;
        this.state.roads.find(road => road.x === distance && road.y == grid.height - distance - 1).direction = direction.up;
        this.state.roads.find(road => road.x === grid.width - distance - 1 && road.y == grid.height - distance - 1).direction = direction.left;
    },

    addRoad: function(x, y, direction){
        const newRoad = {
            x: x,
            y: y,
            direction: direction,
        }
        this.state.roads.push(newRoad);
        grid.cells[x][y] = cellType.road;
    },

    drawGrid: function() {
        for (let x = 0; x < grid.width; x++) {
            for (let y = 0; y < grid.height; y++) {
                const offsetX = (width - grid.width * this.cellSize) / 2;
                const offsetY = (height - grid.height * this.cellSize) / 2;

                if (grid.cells[x][y] === cellType.empty) {
                    fill(0, 0, 0);
                } else if (grid.cells[x][y] === cellType.road) {
                    fill(100, 100, 100);
                } else if (grid.cells[x][y] === cellType.car) {
                    const car = this.state.cars.find(car => car.x === x && car.y === y);
                    if (car.direction === direction.up) {
                        fill(0, 200, 0);
                    } else if (car.direction === direction.down) {
                        fill(0, 0, 200);
                    } else if (car.direction === direction.left) {
                        fill(200, 0, 200);
                    } else if (car.direction === direction.right) {
                        fill(0, 200, 200);
                    }
                } else {
                    fill(255, 255, 255);
                }
                
                rect(x * this.cellSize + offsetX, y * this.cellSize + offsetY, this.cellSize, this.cellSize);
            }
        }
    },

    createCar: function(road) {
        const newCar = {
            x: road.x,
            y: road.y,
            speed: 1,
            direction: road.direction,
        };
        this.state.cars.push(newCar);
        grid.cells[newCar.x][newCar.y] = cellType.car;
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
        
        for (let i = 0; i < this.state.cars.length; i++) {
            const car = this.state.cars[i];
            this.moveCar(car);
        }
        this.drawGrid();
    },

    moveCar: function(car) {
        const road = this.state.roads.find(road => road.x === car.x && road.y === car.y);
        grid.cells[car.x][car.y] = cellType.road;
        car.x += road.direction.x;
        car.y += road.direction.y;
        grid.cells[car.x][car.y] = cellType.car;
    },
}; 