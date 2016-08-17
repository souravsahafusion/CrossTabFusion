function ChartFunc(instance) {
    this.instance = instance;
}

ChartFunc.prototype.drawBoundRectangle = function(className) {
    var instance = this.instance;

    style = "stroke:rgb(237, 237, 237);stroke-width:1;fill:transparent";
    var widthRect = instance.chartUpBoundXCoor - instance.chartLowBoundXCoor;
    var heightRect = instance.lowLimitYAxis - instance.upLimitYAxis;

    drawRect = new PlotGraph(instance);
    var rectBound = drawRect.drawRectangle(instance.svg, instance.chartLowBoundXCoor, instance.upLimitYAxis, heightRect, widthRect, className, style);

    return rectBound;

};

ChartFunc.prototype.calculateMappingPoint = function(value, a, b, c, d) {
   
    if(jsonData.chartType == "CrossTab"){
       return ((value - a) / (b - a) * (d - c)); 
    }else{
         return (d - (value - a) / (b - a) * (d - c));
    }
   

};