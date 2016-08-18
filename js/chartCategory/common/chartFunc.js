function ChartFunc(instance) {
    this.instance = instance;
}

ChartFunc.prototype.drawBoundRectangle = function(className) {
    var instance = this.instance,
        widthRect,
        heightRect,
        chartLowBoundXCoor = instance.chartLowBoundXCoor,
        chartUpBoundXCoor = instance.chartUpBoundXCoor,
        lowLimitYAxis = instance.lowLimitYAxis,
        upLimitYAxis = instance.upLimitYAxis,
        rectBound;



    style = "stroke:rgb(237, 237, 237);stroke-width:1;fill:transparent";
    widthRect = chartUpBoundXCoor - chartLowBoundXCoor;
    heightRect = lowLimitYAxis - upLimitYAxis;

    drawRect = new PlotGraph(instance);
    rectBound = drawRect.drawRectangle(instance.svg, chartLowBoundXCoor, upLimitYAxis, heightRect, widthRect, className, style);

    return rectBound;

};

ChartFunc.prototype.calculateMappingPoint = function(value, a, b, c, d) {
   
    if(jsonData.chartType == "CrossTab"){
       return ((value - a) / (b - a) * (d - c)); 
    }else{
         return (d - (value - a) / (b - a) * (d - c));
    }
   

};