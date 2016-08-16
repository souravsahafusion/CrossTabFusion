"use strict";
function Axis(instance, x1, y1, inclination){ 
	this.instance = instance;
    this.x1 = x1;
    this.y1 = y1;
    this.inclinationAxis = inclination;
    
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
    console.log(x1, x2, y1, y2, inclination);
    var style = "stroke:rgb(237, 237, 237);stroke-width:1;";
    var className = "axisDraw";
    var svg = instance.svg;
    //this.drawLine(svg,x1, y1, x2, y2, style, className);   



};
Axis.prototype.verticalAxis = function(x1, y1){
	var instance = this.instance;
    var draw = new PlotGraph(instance);
   
	
    var x2 = x1;
    //console.log(chartNo + 'chartNo');
    
    var y2 = y1 + (heightEachChart);
    var style = "stroke:rgb(237, 237, 237);stroke-width:1;";
    var className = "axisDraw";
    var svg = instance.svg;
    this.drawLine(svg,x1, y1, x2, y2, style, className);
    //instance.upLimitYAxis = y1;

};
Axis.prototype.horizontalAxis = function(x1, y1){
	var instance = this.instance;
    
    

    var x2 = x1 + widthEachChart ;//+ (widthEachChart * distYAxisFromOr) /*+ (widthEachChart / 20)*/ ; //the extra divided by 20 added to keep some extra space
    
    var y2 = y1;
    
    

    
    var style = "stroke:rgb(237, 237, 237);stroke-width:1;";
    var className ="axisDraw";
    var svg = instance.svg;
    this.drawLine(svg,x1, y1, x2, y2, style, className);
    //draw.drawLine(x1, y1, x2, y2, style, className);

};