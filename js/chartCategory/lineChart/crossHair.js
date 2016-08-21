"use strict";
function CrossHair(instance) {
    this.instance = instance;
}

CrossHair.prototype.drawCrossHair = function() {
    var instance = this.instance,
        draw = new PlotGraph(instance),
        className = "drawCrossHairLines",
        x = instance.lowLimitXAxis,
        y1 = instance.lowLimitYAxis,
        y2 = instance.upLimitYAxis,
        style = "stroke:rgb(255, 0 , 0);stroke-width:1;",
        strokedasharray = "3, 2",
        visibility = "hidden",
        svg = instance.svg;
    draw.drawLine(svg, x, y1, x, y2, style, className, visibility, strokedasharray);
};