"use strict";
function LineChart(instance) {

    this.instance = instance;

}
LineChart.prototype.initiateDraw = function() {
    var instance = this.instance,
        className = "lineBound",
        bound = new ChartFunc(instance),
        rectIns = bound.drawBoundRectangle(className),
        draw = new CrossHair(instance);
    instance.chartType = "line";
    this.plotLineChart();
    this.drawDivRectangle(i); /*rectangle is not required since we don't need to restrict the crooshair, infact no crosshair is there*/
    
    draw.drawCrossHair();
};


LineChart.prototype.plotLineChart = function() {
    var instance = this.instance,
        draw = new PlotGraph(instance),
        flagFirstPoint = 0,
        i,
        loopLen,
        value,
        calculate = new ChartFunc(instance),
        a = instance.minTipValue,
        b = instance.maxTipValue,
        c = instance.upLimitYAxis,
        d = instance.lowLimitYAxis,
        lowLimitXAxis = instance.lowLimitXAxis,
        yPointPlot,
        lastPlottedPointX = instance.lastPlottedPointX,
        lastPlottedPointY = instance.lastPlottedPointY,
        noofXTips = instance.noofXTips;

    loopLen = jsonData.data.length;
    for (i = 0; i < loopLen; i++) { 
        value = instance.storeValue[i];
        if (typeof value != 'undefined') {
            
            
            yPointPlot = calculate.calculateMappingPoint(value, a, b, c, d);
            //console.log(range.length); need to debug
            instance.storeAncorPointsY[i] = yPointPlot;
            var xPointPlot = lowLimitXAxis + (widthEachChart / noofXTips) * (i);
            storeAncorPointsX[i] = Math.floor(xPointPlot);

            if (flagFirstPoint !== 0) //skipping the first plot
            {
                var style = "stroke:rgb(29, 121, 204);stroke-width:6";
                var className = "plotGraph";
                var svg = instance.svg;
                draw.drawLine(svg, lastPlottedPointX, lastPlottedPointY, xPointPlot, yPointPlot, style, className);
                className = "ancorTipCicle";

                draw.plotTipCirle(lastPlottedPointX, lastPlottedPointY);

            }
            lastPlottedPointX = xPointPlot;
            lastPlottedPointY = yPointPlot;
            instance.lastPlottedPointX = xPointPlot;
            instance.lastPlottedPointY = yPointPlot;

            flagFirstPoint = 1;
            //skipping the 2D array for storing x-y w.r.t month and instead storing the previous x-y coordinates

        }

    }
    draw.plotTipCirle(xPointPlot, yPointPlot);

};


LineChart.prototype.drawDivRectangle = function(index) {
    /*var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");*/
    var instance = this.instance,
        draw = new PlotGraph(instance),
        x = instance.lowLimitXAxis,
        y = instance.upLimitYAxis,
        heightRect = instance.lowLimitYAxis - instance.upLimitYAxis,
        widthRect = instance.upLimitXAxis - instance.lowLimitXAxis,
        rectangleDiv = 'svgDivs',
        style = "fill:transparent",
        svg = instance.svg,
        _this = instance,
        rect = draw.drawRectangle(svg, x, y, heightRect, widthRect, rectangleDiv, style);

    rect.addEventListener("mousemove", entercoordinates.bind(instance, rectangleDiv));
    /*rect.addEventListener("mousemove", function () {
            entercoordinates.call(this, rectangleId);  
        });*/
    rect.addEventListener("syncCrossHair", showCoords, false);
    rect.addEventListener("syncCrossHair", displayCrossHair, false);
    //divNames[i].addEventListener("mousemove", showCoords,false);
    rect.addEventListener("mouseleave", clearcoor, false);
    rect.addEventListener("mouseleave", removeCrossHair, false);
    instance.toolTipTextIns = document.createElementNS("http://www.w3.org/2000/svg", "text"); //might need to be added in column as well
    instance.toolTipBoxIns = document.createElementNS("http://www.w3.org/2000/svg", "rect");

    instance.selectRectIns = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    
    instance.svg.appendChild(instance.selectRectIns);

    rect.addEventListener("mousedown", instantiateDragLine.bind(_this));
    rect.addEventListener("mousemove", dragLineRect.bind(_this));
    rect.addEventListener("mouseup", releaseLineRect.bind(_this));


    //svg chart area bound with x y axis
    /**/

};