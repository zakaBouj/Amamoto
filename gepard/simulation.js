const Simulation = {
    simSize: { x: 500, y : 500 },

    nodes: [],
    roads: [],

    cars: [],

    onSetup: function() {
        this.addNode(100, 100);
        this.addNode(400, 100);
        this.addNode(400, 400);
        this.addNode(100, 400);

        this.addRoad(this.nodes[0], this.nodes[1])
        this.addRoad(this.nodes[1], this.nodes[2])
        this.addRoad(this.nodes[2], this.nodes[3])
        this.addRoad(this.nodes[3], this.nodes[0])

        this.addCar(200, 100)
    },

    addNode: function(x, y) {
        this.nodes.push({x: x, y: y});
    },

    addRoad: function(startNode, endNode, shape = 'straight') {
        const road = {
            start: startNode,
            end: endNode,
            shape: shape
        };
        this.roads.push(road);
    },

    addCar: function(x, y, size = 10, orientation = 0, color = {r: 0, g: 200, b: 200}) {
        const car = {
            position: {x: x, y: y},
            size: size,
            orientation: 0,
            color: color,
        };
        this.cars.push(car);
    }
}