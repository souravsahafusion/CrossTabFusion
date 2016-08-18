function ColumnChart(instance) {

    this.instance = instance;

}

ColumnChart.prototype.initiateDraw = function() {
    var instance = this.instance,
        className = "plotColumnBound",
        bound = new ChartFunc(instance);
        rectIns =  bound.drawBoundRectangle(className);

   
    instance.chartType = "column";
    this.plotColumnChart();
    this.selectChartListener(rectIns);
};
ColumnChart.prototype.plotColumnChart = function() {
    var instance = this.instance,
        draw = new PlotGraph(instance),
        svg,
        calculate,
        i,
        a,
        b,
        c,
        d,
        yPointPlot,
        value,
        dataLen = jsonData.data.length,
        scale = jsonData.scaleColChartFactor,
        xPointPlot,
        x,
        y,
        widthRect,
        heightRect,
        rectIns;


    for (i = 0; i < dataLen; i++) {
        value = instance.storeValue[i];         
        if (typeof value != 'undefined') {
            scaleColChartFactor = scale / 100;
            calculate = new ChartFunc(instance);
            a = instance.minTipValue;
            b = instance.maxTipValue;
            c = instance.upLimitYAxis;
            d = instance.lowLimitYAxis;
            yPointPlot = calculate.calculateMappingPoint(value, a, b, c, d);
            if(yPointPlot < 2){
                    yPointPlot = 2;
                }
            //console.log(range.length); need to debug
            instance.storeAncorPointsY[i] = yPointPlot;
            xPointPlot = instance.lowLimitXAxis + (widthEachChart / instance.noofXTips) * (i);
            storeAncorPointsX[i] = Math.floor(xPointPlot);
            x = xPointPlot - widthEachChart * scaleColChartFactor;
            y = instance.lowLimitYAxis;
            heightRect = y - yPointPlot;
            widthRect = widthEachChart * scaleColChartFactor * 2;
            var style = "fill:rgb(30, 122, 205);stroke-width:3;stroke:rgb(30, 122, 205)";
            var className = "plotColumnGraph";
            svg = this.instance.svg;
            rectIns = draw.drawRectangle(svg, x, yPointPlot, heightRect, widthRect, className, style);
            this.columnChartListener(rectIns, className);
            instance.lastPlottedPointX = xPointPlot;
            instance.lastPlottedPointY = yPointPlot;

            //skipping the 2D array for storing x-y w.r.t month and instead storing the previous x-y coordinates

        }
    }

};


ColumnChart.prototype.columnChartListener = function(rectIns, className) {
    var instance = this.instance;

    rectIns.addEventListener("mousemove", entercoordinates.bind(instance, className));

    rectIns.addEventListener("syncCrossHair", columnTrigger);
    rectIns.addEventListener("mouseout", removeToolTip);

    //divNames[i].addEventListener("mousemove", showCoords,false);
    //rect.addEventListener("mouseleave", clearcoor,false);
    instance.toolTipTextIns = document.createElementNS("http://www.w3.org/2000/svg", "text");
    instance.toolTipBoxIns = document.createElementNS("http://www.w3.org/2000/svg", "rect");

};

ColumnChart.prototype.selectChartListener = function(rectIns) {
    var instance = this.instance,
        _this = instance;
    instance.selectRectIns = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    instance.svg.appendChild(instance.selectRectIns)

    rectIns.addEventListener("mousedown", instantiateDragCol.bind(_this));
    rectIns.addEventListener("mousemove", dragColRect.bind(_this));
    rectIns.addEventListener("mouseup", releaseColRect.bind(_this));

    

};