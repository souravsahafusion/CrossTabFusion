"use strict";
function DrawChart(instance, index) {

    this.instance = instance;
    this.index = index;

}
DrawChart.prototype.addChartName = function(check) {
    var instance = this.instance,
        draw = new PlotGraph(instance),
        chartName = jsonData.y_axis_map[this.index],
        x = instance.chartLowBoundXCoor,
        y,
        svg = instance.svg,
        lowLimitYAxis = instance.lowLimitYAxis,
        upLimitYAxis = instance.upLimitYAxis,
        commonShift = heightEachChart * chartNameBoxShift,
        chartUpBoundXCoor = instance.chartUpBoundXCoor,
        chartLowBoundXCoor = instance.chartLowBoundXCoor,
        height = heightEachChart * chartNameBoxHtFactor,//chart name box
        width = chartUpBoundXCoor - chartLowBoundXCoor,
        className,
        textElement;// chart name box

    if (check !== 2) {
        y = lowLimitYAxis + commonShift; /*heightEachChart * .02; -> space between y-axis and the chartName box*/
        /*from where the chartName box rectangle will be plotted if the chart name lies below the chart*/
    } else {
        y = upLimitYAxis - commonShift - height;
    }

    
    className = "chartName";
    var style = "fill:rgb(245,250,255);stroke:rgb(190,223,254);stroke-width:1;";
    draw.drawRectangle(svg, x, y, height, width, className, style);
    y = y + (height) * 0.6;
    x = (chartLowBoundXCoor + chartUpBoundXCoor) / 2 * 0.8; //font position determination horizontally
    style = "stroke:rgb(6,48,86);"
    var fontSize = heightEachChart * 0.1; //font position determination vertically within the box
    var transform = "rotate(0 " + x + "," + y + ")";
    className = "textAdd";
    textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
    //
    draw.addTextSVG(svg, x, y, chartName, textElement, className, transform, fontSize, style);

};
DrawChart.prototype.drawChartOutline = function() {
    var instance = this.instance,
        numberOfCharts = jsonData.y_axis_map.length,
        check = 1,
        yShift = yShiftPer,
        y1,
        y2,
        x1,
        x2,
        inclination,
        xAxis,
        yAxis;

    instance.chartId = document.getElementById("chart");
    instance.chartNo = this.index + 1;


    if (numberOfCharts % 2 === 0) {
        check = 2; //even
    }
    instance.yShift = yShift;
    if (check !== 2) { //check is being calculated many number of times
        
        
        y1 = (heightEachChart * yShift);
       
    } else {
       
        y1 = (heightEachChart * yShift) + (heightEachChart);
       
    }
    
    x1 = widthEachChart * distYAxisFromOr; // distance from the origin to the yaxis
    instance.chartLowBoundXCoor = x1;
    x2 = x1 + widthEachChart; 
    instance.chartUpBoundXCoor = x2;
    
    inclination = "horizontal";
    

    xAxis = new DrawXAxis(instance, x1, y1, inclination, instance.svg);
    xAxis.drawAxis();
    xAxis.drawXAxisComp(check, numberOfCharts);

    yShift = instance.yShift;
    x1 = widthEachChart * distYAxisFromOr;
    x2 = widthEachChart * distYAxisFromOr;
    //console.log(chartNo + 'chartNo');
    y1 = (heightEachChart * yShift);
    y2 = y1 + (heightEachChart);
   
    inclination = "vertical";
    yAxis = new DrawYAxis(instance, x1, y1, inclination, instance.svg);
    yAxis.drawAxis();
    yAxis.drawYAxis();
    this.addChartName(check); //this chartNo is the index value of the array 



};

DrawChart.prototype.initiateGraph = function() {
    var instance = this.instance,
        plot = new PlotGraph(),
        expression;

    instance.svg = plot.createSVG(jsonData.chart.width, jsonData.chart.height);
    this.drawChartOutline();

    expression = jsonData.chartType;
    switch (expression) {
        case "line":
            drawChart = new LineChart(instance);
            drawChart.initiateDraw();
            break;
        case "column":
            drawChart = new ColumnChart(instance);
            drawChart.initiateDraw();


            break;

    }




};

//var crossHairInstance = '';
var storeAncorPointsX = [];
var flag = 0;
var flagRemoveColor = 0;
var shiftXTipLine = 0.01; //first point plot shift on x-axis from y-axis for column chart
var shiftXTipCol = 0.07; //first point plot shift on x-axis from y-axis for column chart
var distYAxisFromOr = 0.2; //widthEachChart * distYAxisFromOr
var yShiftPer = 0.25;
var chartNameBoxShift = 0.03;
var chartNameBoxHtFactor = 0.15;