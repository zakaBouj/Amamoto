const Render = {
    renderScale: 1,

    setRenderScale: function(scale) {
        this.renderScale = scale;
        this.onResize();
    },

    onSetup: function() {
        background(180);
        
        this.drawRect(0, 0, Simulation.simSize, {r: 120, g: 200, b: 180});

        for (let i = 0; i < Simulation.roads.length; i++) {
            this.drawRoad(Simulation.roads[i]);
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
        if (road.shape === 'straight') {
            this.drawLine(road.start, road.end, {r: 100, g: 100, b: 100}, 2);
        } else {
            this.drawLine(road.start, road.end, {r: 255, g: 0, b: 0}, 2);
        }
    },

    localToGlobal: function(position) {
        // Validate inputs
        if (!position || typeof position.x !== 'number' || typeof position.y !== 'number') {
            console.error('Invalid position object passed to localToGlobal:', position);
            return { x: 0, y: 0 };
        }

        if (typeof width !== 'number' || typeof height !== 'number') {
            console.error('Canvas dimensions not properly initialized');
            return { x: 0, y: 0 };
        }

        const offset = {
            x: (width - Simulation.simSize.x) / 2,
            y: (height - Simulation.simSize.y) / 2
        };

        const globalPosition = {
            x: (position.x + offset.x) * this.renderScale,
            y: (position.y + offset.y) * this.renderScale   
        }

        // Validate output
        if (isNaN(globalPosition.x) || isNaN(globalPosition.y)) {
            console.error('NaN detected in localToGlobal calculation:', {
                position,
                width,
                height,
                renderScale: this.renderScale,
                offset,
                globalPosition
            });
            return { x: 0, y: 0 };
        }

        return globalPosition;
    },

    drawLine: function(start, end, color = {r: 255, g: 255, b: 255}, width = 1) {
        stroke(color.r, color.g, color.b);
        strokeWeight(width * this.renderScale);
        const scaledStart = this.localToGlobal(start);
        const scaledEnd = this.localToGlobal(end);
        line(scaledStart.x, scaledStart.y, scaledEnd.x, scaledEnd.y);
    },

    drawRect: function(position, size, color = {r: 255, g: 255, b: 255}) {
        const scaledPosition = this.localToGlobal(position);
        const scaledSize = this.localToGlobal(size);
        fill(color.r, color.g, color.b);
        rect(scaledPosition.x, scaledPosition.y, scaledSize.x, scaledSize.y);
    }
}