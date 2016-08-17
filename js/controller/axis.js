"use strict";
function Axis(instance, x1, y1, inclination, svg){ 
	this.instance = instance;
    this.x1 = x1;
    this.y1 = y1;
    this.inclinationAxis = inclination;
    this.svg = svg;
    
    PlotGraph.call(this);
  
}
Axis.prototype = Object.create(PlotGraph.prototype);
Axis.prototype.constructor = Axis;
Axis.prototype.plotAxis = function(){
    var draw = new PlotGraph(instance);
    var instance = this.instance,
        x1 = /*instance &&*/ this.x1,
        y1 = /*instance &&*/ this.y1,
        inclination = /*instance &&*/ this.inclinationAxis,
        x2,
        y2;
    if(inclination == "vertical"){
        x2 = x1;
        y2 = y1 + (heightEachChart);

    }else if(inclination == "horizontal"){
        x2 = x1 + widthEachChart ;//+ (widthEachChart * distYAxisFromOr) /*+ (widthEachChart / 20)*/ ; //the extra divided by 20 added to keep some extra space
        y2 = y1;

    } 
    //console.log(x1, x2, y1, y2, inclination);
    var style = "stroke:rgb(237, 237, 237);stroke-width:1;";
    var className = "axisDraw";
    var svg = this.svg;
    this.drawLine(svg,x1, y1, x2, y2, style, className);   



};
Axis.prototype.drawTicks = function(){

};
