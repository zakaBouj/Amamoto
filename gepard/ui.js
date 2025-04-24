const UI = {
    onSetup:function() {
        document.getElementById('startButton').addEventListener('click', this.toggleSimulation);
        
        const renderScaleSlider = document.getElementById('renderScale');
        
        renderScaleSlider.addEventListener('input', function() {
            const value = parseFloat(this.value);
            UI.updateRenderScale(value);
        });

        document.getElementById('resetScaleButton').addEventListener('click', function() {
            UI.updateRenderScale(1);
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

    onMouseWheel: function(event) {
        const currentScale = Render.renderScale;
        
        const zoomFactor = event.delta > 0 ? 0.95 : 1.05;
        const newScale = Math.max(0.1, Math.min(5, currentScale * zoomFactor));
        
        this.updateRenderScale(newScale);
    },

    updateRenderScale: function(newScale) {
        const renderScaleSlider = document.getElementById('renderScale');
        const renderScaleValue = document.getElementById('renderScaleValue');
        
        renderScaleSlider.value = newScale;
        renderScaleValue.textContent = newScale.toFixed(2) + 'x';

        newScale = Math.max(renderScaleSlider.min, Math.min(renderScaleSlider.max, newScale));

        Render.setRenderScale(newScale);
    },
}
