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

        this.addCircleRoad(this.nodes[0], this.nodes[1], Math.PI)
        // this.addCircleRoad(this.nodes[1], this.nodes[2])
        // this.addCircleRoad(this.nodes[2], this.nodes[3])
        // this.addCircleRoad(this.nodes[3], this.nodes[0])

        this.addCar(0)
    },

    addNode: function(x, y) {
        this.nodes.push({x: x, y: y});
    },

    addRoad: function(startNode, endNode) {
        const road = {
            start: startNode,
            end: endNode,
            shape: 'straight'
        };
        
        this.roads.push(road);
    },
    addCircleRoad: function(startNode, endNode, arcAngle = Math.PI * 0.5) {
        if (arcAngle > Math.PI) {
            arcAngle = Math.PI;
            console.log('arcAngle is greater than PI, setting to PI');
        } else if (arcAngle < Math.PI * 0.1) {
            arcAngle = Math.PI * 0.1;
            console.log('arcAngle is less than PI * 0.1, setting to PI * 0.1');
        }
        
        const dx = endNode.x - startNode.x;
        const dy = endNode.y - startNode.y;

        const d = Math.sqrt(dx * dx + dy * dy);
        const h = d / 2 * Math.tan(arcAngle / 2);

        const gamma = atan(dx/dy);

        const center = {
            x: startNode.x + dx / 2 + h * Math.sin(gamma),
            y: startNode.y + dy / 2 + h * Math.cos(gamma)
        };

        //const radius = Math.sqrt(1/4 * (dx * dx + dy * dy) + h * h);
        const radius = d / 2 * Math.cos((Math.PI - arcAngle) / 2);

        const angleOffset = 0;//Math.atan((dy / dx));

        const road = {
            start: startNode,
            end: endNode,
            shape: 'circle',
            center: center,
            radius: radius,
            arcAngle: arcAngle,
            angleOffset: angleOffset
        };
        this.roads.push(road);
    },

    addCar: function(roadIndex = 0, size = 10, orientation = 0, color = {r: 0, g: 100, b: 255}) {
        if (roadIndex >= this.roads.length) {
            console.log('roadIndex is greater than the number of roads, setting to 0');
            roadIndex = 0;
        } else if (roadIndex < 0) {
            console.log('roadIndex is less than 0, setting to 0');
            roadIndex = 0;
        }

        const road = this.roads[roadIndex];

        const car = {
            position: {x: road.start.x, y: road.start.y},
            size: size,
            orientation: 0,
            color: color,
        };
        this.cars.push(car);
    },

    // _getOrientation: function(road, position) {
    //     if (road.shape === 'straight') {
    //         return Math.atan2(road.end.y - road.start.y, road.end.x - road.start.x);
    //     } else if (road.shape === 'circle') {
            
    //     } else {
    //         return Math.atan2(road.end.y - road.start.y, road.end.x - road.start.x);
    //     }
    // }
}