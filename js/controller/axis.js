"use strict";
function Axis(instance){ 
	this.instance = instance;

  
}
Axis.prototype.verticalAxis = function(){
	var instance = this.instance;
    var draw = new PlotGraph(instance);
    var yShift = instance.yShift;
	var x1 = widthEachChart * distYAxisFromOr;
    var x2 = widthEachChart * distYAxisFromOr;
    //console.log(chartNo + 'chartNo');
    var y1 = (heightEachChart * yShift);
    var y2 = y1 + (heightEachChart);
    var style = "stroke:rgb(237, 237, 237);stroke-width:1;";
    var className = "axisDraw";
    draw.drawLine(x1, y1, x2, y2, style, className);
    instance.upLimitYAxis = y1;

};
Axis.prototype.horizontalAxis = function(){
	var instance = this.instance;
    var draw = new PlotGraph(instance);
    var x1 = widthEachChart * distYAxisFromOr; // distance from the origin to the yaxis
    instance.chartLowBoundXCoor = x1;

    var x2 = x1 + widthEachChart ;//+ (widthEachChart * distYAxisFromOr) /*+ (widthEachChart / 20)*/ ; //the extra divided by 20 added to keep some extra space
    instance.chartUpBoundXCoor = x2;
    var y1 = 0;
    var y2 = 0;
    if (obj.y_axis_map.length % 2 !== 2) { //check is being calculated many number of times
        instance.yShift = yShiftPer;
        var yShift = instance.yShift;
        y1 = (heightEachChart * yShift);
        y2 = (heightEachChart * yShift);
    } else {
        instance.yShift = yShiftPer;
        var yShift = instance.yShift;
        y1 = (heightEachChart * yShift) + (heightEachChart);
        y2 = (heightEachChart * yShift) + (heightEachChart);
    }
    var style = "stroke:rgb(237, 237, 237);stroke-width:1;";
    var className ="axisDraw";
    draw.drawLine(x1, y1, x2, y2, style, className);

};