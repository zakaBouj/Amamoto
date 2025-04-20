const UI = {
    setup:function() {
        document.getElementById('startButton').addEventListener('click', this.toggleSimulation);
    },

    toggleSimulation: function () {
        if (Simulation.state.running) {
            Simulation.stop();
        } else {
            Simulation.start();
        }
        const button = document.getElementById('startButton');
        button.textContent = Simulation.state.running ? 'Stop Simulation' : 'Start Simulation';
    },
}
