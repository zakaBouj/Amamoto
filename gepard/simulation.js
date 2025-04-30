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

        this.addNode(0, 0);
        this.addNode(500, 0);
        this.addNode(500, 500);
        this.addNode(0, 500);

        // this.addRoad(this.nodes[0], this.nodes[1]);
        // this.addRoad(this.nodes[1], this.nodes[2]);
        // this.addRoad(this.nodes[2], this.nodes[3]);
        // this.addRoad(this.nodes[3], this.nodes[0]);

        this.addRoad(this.nodes[0], this.nodes[4]);
        this.addRoad(this.nodes[1], this.nodes[5]);
        this.addRoad(this.nodes[2], this.nodes[6]);
        this.addRoad(this.nodes[3], this.nodes[7]);

        this.addCircleRoad(this.nodes[0], this.nodes[1]);
        this.addCircleRoad(this.nodes[1], this.nodes[2]);
        this.addCircleRoad(this.nodes[2], this.nodes[3]);
        this.addCircleRoad(this.nodes[3], this.nodes[0]);

        this.addCar(4)
        this.addCar(5)
        this.addCar(6)
        this.addCar(7)
    },

    addNode: function(x, y) {
        this.nodes.push({x: x, y: y});
    },

    addRoad: function(startNode, endNode) {
        const dx = endNode.x - startNode.x;
        const dy = endNode.y - startNode.y;
        const orientation = Math.atan(dy / dx);
        const road = {
            start: startNode,
            end: endNode,
            orientation: orientation,
            shape: 'straight'
        };
        
        this.roads.push(road);
    },
    addCircleRoad: function(startNode, endNode, arcAngle = Math.PI * 0.5) {
        if (arcAngle > Math.PI) {
            arcAngle = Math.PI;
            console.log('arcAngle is greater than PI, setting to PI');
        } else if (arcAngle < Math.PI * 0.01) {
            arcAngle = Math.PI * 0.01;
            console.log('arcAngle is less than PI * 0.1, setting to PI * 0.1');
        }
        
        const dx = endNode.x - startNode.x;
        const dy = endNode.y - startNode.y;

        const d = Math.sqrt(dx * dx + dy * dy);
        const h = d / (2 * Math.tan(arcAngle / 2));

        const center = {
            x: startNode.x + dx / 2 - dy/d * h,
            y: startNode.y + dy / 2 + dx/d * h
        };

        const radius = d / (2 * Math.cos(Math.PI/2 - arcAngle/2));

        let sign = 1;
        if (dx === 0 && dy < 0) {
            sign = -1
        }
        const angleStartToEnd = Math.acos(dx/d) * sign;
        const angleOffset = angleStartToEnd - (arcAngle + Math.PI) / 2;

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

    addCar: function(roadIndex = 0, size = 10, color = {r: 50, g: 50, b: 255}) {
        if (roadIndex >= this.roads.length) {
            console.log('roadIndex is greater than the number of roads, setting to 0');
            roadIndex = 0;
        } else if (roadIndex < 0) {
            console.log('roadIndex is less than 0, setting to 0');
            roadIndex = 0;
        }

        const road = this.roads[roadIndex];
        const position = {x: road.start.x, y: road.start.y};

        const car = {
            position: position,
            size: size,
            orientation: this._getOrientation(road, position),
            color: color,
        };
        this.cars.push(car);
    },

    _getOrientation: function(road, position) {
        if (road.shape === 'straight') {
            return road.orientation;
        } else if (road.shape === 'circle') {
            const dx = position.x - road.center.x
            const dy = position.y - road.center.y
            let sign = 1;
            if (dx < 0) {
                sign = -1;
            }
            return Math.atan(dy/dx) + sign * Math.PI / 2;
        } else {
            console.log("undefined road shape");
            return 0;
        }
    }
}