const Simulation = {
    simSize: { x: 500, y : 500 },

    roads: [],

    onSetup: function() {
        this.addRoad({x: 0, y: 0}, {x: 100, y: 0});
        this.addRoad({x: 100, y: 0}, {x: 100, y: 100});
        this.addRoad({x: 100, y: 100}, {x: 0, y: 100});
        this.addRoad({x: 0, y: 100}, {x: 0, y: 0});
    },

    addRoad: function(start, end, shape = 'straight') {
        const road = {
            start: start,
            end: end,
            shape: shape
        }
        this.roads.push(road);
    }
}