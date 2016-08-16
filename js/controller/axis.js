"use strict";
function Axis(instance){ 
	this.instance = instance;
    PlotGraph.call(this);
  
}
Axis.prototype = Object.create(PlotGraph.prototype);
Axis.prototype.constructor = Axis;
Axis.prototype.verticalAxis = function(){
	var instance = this.instance;
    var draw = new PlotGraph(instance);
    var yShift = instance.yShift;
    if(jsonData.chartType == "CrossTab"){
        distYAxisFromOr = 1;
        yShift = 1;
    }
	var x1 = widthEachChart * distYAxisFromOr;
    var x2 = widthEachChart * distYAxisFromOr;
    //console.log(chartNo + 'chartNo');
    var y1 = (heightEachChart * yShift);
    var y2 = y1 + (heightEachChart);
    var style = "stroke:rgb(237, 237, 237);stroke-width:1;";
    var className = "axisDraw";
    var svg = instance.svg;
    this.drawLine(svg,x1, y1, x2, y2, style, className);
    //instance.upLimitYAxis = y1;

};
Axis.prototype.horizontalAxis = function(){
	var instance = this.instance;
    instance.yShift = yShiftPer;
    var yShift = instance.yShift;
    if(jsonData.chartType == "CrossTab"){
        distYAxisFromOr = 1;
        yShift = 1;
    }
    var draw = new PlotGraph(instance);
    var x1 = widthEachChart * distYAxisFromOr; // distance from the origin to the yaxis
    

    var x2 = x1 + widthEachChart ;//+ (widthEachChart * distYAxisFromOr) /*+ (widthEachChart / 20)*/ ; //the extra divided by 20 added to keep some extra space
    var y1 = 0;
    var y2 = 0;
    if(jsonData.chartType !== "CrossTab"){
        instance.chartLowBoundXCoor = x1;
        instance.chartUpBoundXCoor = x2;
        if (jsonData.y_axis_map.length % 2 !== 2) { //check is being calculated many number of times
        
        y1 = (heightEachChart * yShift);
        y2 = (heightEachChart * yShift);
    } else {
        
        y1 = (heightEachChart * yShift) + (heightEachChart);
        y2 = (heightEachChart * yShift) + (heightEachChart);
    }
    }else{
        y1 = (heightEachChart);
        y2 = (heightEachChart);
    }

    

    
    var style = "stroke:rgb(237, 237, 237);stroke-width:1;";
    var className ="axisDraw";
    var svg = instance.svg;
    this.drawLine(svg,x1, y1, x2, y2, style, className);
    //draw.drawLine(x1, y1, x2, y2, style, className);

};