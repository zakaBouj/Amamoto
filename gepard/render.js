const Render = {
    renderScale: 2,

    setRenderScale: function(scale) {
        this.renderScale = scale;
        this.onResize();
    },

    onSetup: function() {
        background(180);

        const offsetX = (width - Simulation.simSize.x * this.renderScale) / 2;
        const offsetY = (height - Simulation.simSize.y * this.renderScale) / 2;
        
        fill(120, 200, 180);
        //noStroke();
        rect(offsetX, offsetY, Simulation.simSize.x * this.renderScale, Simulation.simSize.y * this.renderScale);
    },

    onResize: function() {
        this.onSetup();
        this.onUpdate();
    },

    onUpdate: function() {
        
    },
}