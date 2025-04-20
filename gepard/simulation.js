// Create a namespace for simulation
const Simulation = {

    state: {
        running: false,
    },

    setup: function() {
        frameRate(60);
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
        
        // Update simulation state
        // This is where you'll add your traffic simulation logic
        console.log('Updating simulation');
    },
}; 