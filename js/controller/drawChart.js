function DrawChart(instance, index) {

    this.instance = instance;
    this.index = index;

}
DrawChart.prototype.addChartName = function(check) {
    var instance = this.instance;
    var draw = new PlotGraph(instance);
    var chartName = jsonData.y_axis_map[this.index];
    var x = instance.chartLowBoundXCoor;
    var y = 0;
    var svg;
    if (check !== 2) {
        y = instance.lowLimitYAxis + heightEachChart * chartNameBoxShift; /*heightEachChart * .02; -> space between y-axis and the chartName box*/
        /*from where the chartName box rectangle will be plotted if the chart name lies below the chart*/
    } else {
        y = instance.upLimitYAxis - heightEachChart * chartNameBoxShift - heightEachChart * chartNameBoxHtFactor;
    }

    var height = heightEachChart * chartNameBoxHtFactor;
    var width = instance.chartUpBoundXCoor - instance.chartLowBoundXCoor;
    var className = "chartName";
    var style = "fill:rgb(245,250,255);stroke:rgb(190,223,254);stroke-width:1;";
    svg = instance.svg;
    draw.drawRectangle(svg, x, y, height, width, className, style);
    y = y + (height) * .6;
    x = (instance.chartLowBoundXCoor + instance.chartUpBoundXCoor) / 2 * .8; //font position determination horizontally
    style = "stroke:rgb(6,48,86);"
    var fontSize = heightEachChart * .1; //font position determination vertically within the box
    var transform = "rotate(0 " + x + "," + y + ")";
    var className = "textAdd";
    var textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");;
    //
    draw.addText(x, y, chartName, transform, className, textElement, fontSize, style);

};
DrawChart.prototype.drawChartOutline = function() {
    var instance = this.instance;
    var numberOfCharts = jsonData.y_axis_map.length;

    instance.chartId = document.getElementById("chart");
    instance.chartNo = this.index + 1;

    var check = 1;
    var yShift;
    var y1;

    if (numberOfCharts % 2 == 0) {
        check = 2; //even
    }
    if (check !== 2) { //check is being calculated many number of times
        instance.yShift = yShiftPer;
        yShift = instance.yShift;
        y1 = (heightEachChart * yShift);
        //y2 = (heightEachChart * yShift);
    } else {
        instance.yShift = yShiftPer;
        var yShift = instance.yShift;
        y1 = (heightEachChart * yShift) + (heightEachChart);
        //y2 = (heightEachChart * yShift) + (heightEachChart);
    }
    //var yShift = instance.yShift;
    var x1 = widthEachChart * distYAxisFromOr; // distance from the origin to the yaxis
    instance.chartLowBoundXCoor = x1;
    var x2 = x1 + widthEachChart ;//+ (widthEachChart * distYAxisFromOr) /*+ (widthEachChart / 20)*/ ; //the extra divided by 20 added to keep some extra space
    instance.chartUpBoundXCoor = x2;
    //var y1 = (heightEachChart * yShift);;
    var inclination = "horizontal";
    console.log(y1 + 'yShift');

    var xAxis = new DrawXAxis(instance, x1, y1, inclination, instance.svg);
    xAxis.drawAxis();
    xAxis.drawXAxisComp(check, numberOfCharts);

    yShift = instance.yShift;
    x1 = widthEachChart * distYAxisFromOr;
    x2 = widthEachChart * distYAxisFromOr;
    //console.log(chartNo + 'chartNo');
    y1 = (heightEachChart * yShift);
    y2 = y1 + (heightEachChart);
    console.log(y1 + 'yShift2');
    inclination = "vertical";
    var yAxis = new DrawYAxis(instance, x1, y1, inclination, instance.svg);
    yAxis.drawAxis();
    yAxis.drawYAxis();
    this.addChartName(check); //this chartNo is the index value of the array 



};

DrawChart.prototype.initiateGraph = function() {
    var instance = this.instance;
    var plot = new PlotGraph();

    instance.svg = plot.createSVG(jsonData.chart.width, jsonData.chart.height);
    this.drawChartOutline();
    
    var expression = jsonData.chartType;
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

var crossHairInstance = '';
var storeAncorPointsX = [];
var flag = 0;
var flagRemoveColor = 0;
var shiftXTipLine = .01; //first point plot shift on x-axis from y-axis for column chart
var shiftXTipCol = .07; //first point plot shift on x-axis from y-axis for column chart
var distYAxisFromOr = .2; //widthEachChart * distYAxisFromOr
var yShiftPer = .25;
var chartNameBoxShift = .03;
var chartNameBoxHtFactor = .15;