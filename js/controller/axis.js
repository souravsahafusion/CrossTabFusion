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
    var yShift = instance.yShift;
	var x1 = widthEachChart * distYAxisFromOr;
    var x2 = widthEachChart * distYAxisFromOr;
    //console.log(chartNo + 'chartNo');
    var y1 = (heightEachChart * yShift);
    var y2 = y1 + (heightEachChart);
    var style = "stroke:rgb(237, 237, 237);stroke-width:1;";
    var className = "axisDraw";
    draw.drawLine(x1, y1, x2, y2, style, className);

};