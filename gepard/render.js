const Render = {
    renderScale: 1,

    roadWidth: 10,
    carWidth: 7,

    setRenderScale: function(scale) {
        this.renderScale = scale;
        this.onResize();
    },

    onSetup: function() {
        background(180);
        
        this.drawRect({x: 0, y: 0}, Simulation.simSize, {r: 120, g: 200, b: 180});

        for (let i = 0; i < Simulation.roads.length; i++) {
            this.drawRoad(Simulation.roads[i]);
        }

        for (let i = 0; i < Simulation.cars.length; i++) {
            this.drawCar(Simulation.cars[i]);
        }
    },

    onResize: function() {
        this.onSetup();
        this.onUpdate();
    },

    onUpdate: function() {
        
    },

    drawRoad: function(road) {
        noStroke();
        fill(120, 200, 180);

        const roadColor = {r: 100, g: 100, b: 100};

        if (road.shape === 'straight') {
            this.drawLine(road.start, road.end, roadColor, this.roadWidth);
        } else if (road.shape === 'circle') {
            this.drawCircle(road.center, road.radius, road.arcAngle, road.angleOffset, roadColor, this.roadWidth);
        } else {
            this.drawLine(road.start, road.end, {r: 255, g: 0, b: 0}, this.roadWidth);
        }
    },

    drawCar: function(car) {
        const start = {
            x: car.position.x - car.size * Math.cos(car.orientation),
            y: car.position.y - car.size * Math.sin(car.orientation),
        };
        
        this.drawLine(start, car.position, car.color, this.carWidth);
    },

    drawLine: function(start, end, color = {r: 255, g: 255, b: 255}, width = 1) {
        stroke(color.r, color.g, color.b);
        strokeWeight(width * this.renderScale);
        start = this.toGlobalScaled(start);
        end = this.toGlobalScaled(end);
        line(start.x, start.y, end.x, end.y);
    },

    drawCircle: function(center, radius, arcAngle, angleOffset, color = {r: 255, g: 255, b: 255}, width = 1) {
        center = this.toGlobalScaled(center);
        radius = radius * this.renderScale;
        arcAngle = arcAngle;
        noFill();
        stroke(color.r, color.g, color.b);
        strokeWeight(width * this.renderScale);
        arc(center.x, center.y, radius * 2, radius * 2, angleOffset, angleOffset + arcAngle);

        stroke(0, 255, 0);
        point(center.x, center.y);
    },

    drawRect: function(position, size, color = {r: 255, g: 255, b: 255}, borderWidth = 1, borderColor = {r: 0, g: 0, b: 0}) {
        position = this.toGlobalScaled(position);
        size = this.scaled(size);
        fill(color.r, color.g, color.b);
        stroke(borderColor.r, borderColor.g, borderColor.b);
        strokeWeight(borderWidth * this.renderScale);
        rect(position.x, position.y, size.x, size.y);
    },

    scaled: function(position) {
        return {
            x: position.x * this.renderScale,
            y: position.y * this.renderScale
        };
    },

    toGlobal: function(position) {
        const offset = {
            x: (width - Simulation.simSize.x) / 2,
            y: (height - Simulation.simSize.y) / 2
        };

        const globalPosition = {
            x: position.x + offset.x,
            y: position.y + offset.y
        };

        return globalPosition;
    },

    toGlobalScaled: function(position) {
        const offset = {
            x: (width - Simulation.simSize.x * this.renderScale) / 2,
            y: (height - Simulation.simSize.y * this.renderScale) / 2
        };

        const globalPosition = {
            x: position.x * this.renderScale + offset.x,
            y: position.y * this.renderScale + offset.y
        };

        return globalPosition;
    },
}