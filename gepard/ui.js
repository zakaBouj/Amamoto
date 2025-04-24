const UI = {
    setup:function() {
        document.getElementById('startButton').addEventListener('click', this.toggleSimulation);
        
        // Add render scale slider handler
        const renderScaleSlider = document.getElementById('renderScale');
        const renderScaleValue = document.getElementById('renderScaleValue');
        
        renderScaleSlider.addEventListener('input', function() {
            const value = parseFloat(this.value);
            renderScaleValue.textContent = value + 'x';
            Render.setRenderScale(value);
        });
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
