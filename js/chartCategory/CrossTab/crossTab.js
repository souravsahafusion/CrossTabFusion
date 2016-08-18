"use strict";

function CrossTab(instance, input, index, productLen) {

    this.instance = instance;
    this.input = input;
    this.index = index;
    this.svg = [];
    this.chartId = '';
    this.chartLowBoundXCoor = 0;
    this.chartUpBoundXCoor = 0;
    this.ChartIndex = 0;
    this.noofXTips = 0;
    this.sepSVG = '';
    this.productLen = productLen;

}


CrossTab.prototype.addText = function(x, y, textValue, fontSize, className, transform, textElement, style) {

    if (typeof textElement == 'undefined') {
        textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");

    }

    textElement.setAttribute("x", x);
    textElement.setAttribute("y", y);
    textElement.innerHTML = textValue;
    textElement.setAttribute("class", "addedText");
    this.sepSVG.appendChild(textElement);

};




CrossTab.prototype.plotColumnChart = function() {

    var plot = new PlotGraph();
    var svg;
    var scaleColChartFactor;
    for (var i = 0; i < this.instance.productTypes.length; i++) { /*to be changed later '12' for any number of data i.e. find the last index of the storevalue array*/
        var value = this.instance.productIns[this.ChartIndex].sos[i];
        var svg = this.svg[this.ChartIndex];
        plot = new PlotGraph();

        if (typeof value != 'undefined') {
            scaleColChartFactor = jsonData.scaleColChartFactor / 100;

            var a = 0;
            var b = maximum;
            var c = 0;
            var d = widthEachChart;
            var chartFunc = new ChartFunc();
            var yPointPlot = chartFunc.calculateMappingPoint(value, a, b, c, d);

            //console.log(range.length); need to debug
            //this.storeAncorPointsY[i] = yPointPlot;
            if (yPointPlot < 2) {
                yPointPlot = 2;
            }
            //var xPointPlot = 0/*this.lowLimitXAxis + (widthEachChart / this.noofXTips) * (i)*/;
            var valueProfit = this.instance.productIns[this.ChartIndex].sop[i];
            var ratio = valueProfit / value;
            var generateColor = new GenColor();
            var styleColor = generateColor.genColor(ratio);

            var x = 0;
            var y = (heightEachChart / (this.noofXTips)) * (i);
            //console.log(y + 'y' + this.noofXTips);
            var heightRect = heightEachChart * scaleColChartFactor * 2;
            var widthRect = yPointPlot;
            var style = "stroke-width:3;stroke:rgb(30, 122, 205)";
            var className = "plotColumnGraph";
            console.log(styleColor);

            var rectIns = plot.drawRectangle(svg, x, y, heightRect, widthRect, className, style, styleColor);

            //this.columnChartListener(rectIns, className);
            //this.lastPlottedPointX = xPointPlot;
            //this.lastPlottedPointY = yPointPlot;

            //skipping the 2D array for storing x-y w.r.t month and instead storing the previous x-y coordinates

        }
    }

    style = "stroke:rgb(237, 237, 237);stroke-width:3;";
    className = "drawLine";
    svg = this.svg[this.ChartIndex];
    plot.drawLine(svg, 0, heightEachChart, widthEachChart, heightEachChart, style, className);

};




CrossTab.prototype.drawChartOutline = function() {
    this.chartId = document.getElementById("chart");
    var instance = this.instance;
    //this.chartNo = chartNo + 1;
    var x1 = 0;
    this.chartLowBoundXCoor = x1;

    var x2 = x1 + heightEachChart;
    this.chartUpBoundXCoor = x2;
    var y1 = 0;

    var inclination = "vertical";
    var svg = this.svg[this.ChartIndex];
    var xAxis = new DrawXAxis(instance, x1, y1, inclination, svg);
    xAxis.drawAxis();
    x1 = 0 /*widthEachChart * distYAxisFromOr*/ ;
    var y1 = 0;
    var inclination = "horizontal";
    this.noofXTips = this.instance.productTypes.length;
    var yAxis = new DrawYAxis(instance, x1, y1, inclination, svg);
    yAxis.drawAxis();
    yAxis.drawYAxis();
    //this.addChartName(chartNo, check); //this chartNo is the index value of the array 

    //this.addXLabel();

};



var heightEachChart = 0;
var widthEachChart = 0;

CrossTab.prototype.addHeader = function() {
    var div = document.getElementById("heading");
    document.body.removeChild(div);
    var plot = new PlotGraph();
    var sepSVG = plot.createSVG(window.innerWidth, 30);
    this.sepSVG = sepSVG;
    var textProductType = "Product Type";
    var textProduct = "Product";
    var x = 0;
    var y = 12;
    var fontSize = widthEachChart * .06;
    var className = "addedText";
    this.addText(x, y, textProductType, fontSize);
    x = Math.floor(window.innerWidth / (jsonData.y_axis_map.length + 2));
    this.addText(x / 2, y, textProduct, fontSize);
    for (var i = 0; i < jsonData.y_axis_map.length; i++) {
        var x1 = x * (i + 1);
        var x2 = x * (i + 1);
        var y1 = 0;
        var y2 = 30;
        var style = "stroke:rgb(237, 237, 237);stroke-width:2;";

        plot.drawLine(sepSVG, x1, y1, x2, y2, style);
        var textZone = jsonData.y_axis_map[i];
        this.addText(x1 + x * .3, y, textZone, fontSize);

    }
    plot.drawLine(sepSVG, x * (i + 1), y1, x * (i + 1), y2, style);




};
CrossTab.prototype.addFooter = function() {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var plot = new PlotGraph();
    var x,
        x1,
        x2,
        y1,
        y2,
        tempx1;
    var style;
    var sepSVG = plot.createSVG(window.innerWidth, 30);
    this.sepSVG = sepSVG;
    x = widthEachChart /*Math.floor(window.innerWidth / (jsondata.zone_map.length + 2))*/ ;

    for (var i = 0; i < jsonData.y_axis_map.length; i++) {

        x1 = x * (i + 1);
        x2 = x * (i + 1);
        y1 = 0;
        y2 = 30;
        style = "stroke:rgb(237, 237, 237);stroke-width:2;";

        //zone separator lines
        plot.drawLine(sepSVG, x1, y1, x2, y2, style);
        //console.log(noOfYTips);
        for (var j = 0; j < noOfYTips; j++) {
            var xLabelCoor = widthEachChart / noOfYTips;
            //ticks 
            plot.drawLine(sepSVG, x1 + xLabelCoor * (j + 1), 0, x1 + xLabelCoor * (j + 1), 4, style);
            //console.log(x1 *(j+1));
            if (j === 0) {

                this.addText(x1 + xLabelCoor * (j) + 5, 16, 0 + "K");
            } else if (j != noOfYTips) {
                var tickValue = maximum / noOfYTips * j / 1000;
                this.addText(x1 + xLabelCoor * (j) - 10, 16, tickValue + "K");
            }
        }
        tempx1 = x1 + x * .3;
        this.addText(tempx1, 28, jsonData.xAxisLabel);


    }
    //last separator line 
    x1 = x * (i + 1);
    x2 = x * (i + 1);
    plot.drawLine(sepSVG, x1, y1, x2, y2, style);




};


CrossTab.prototype.initiateDraw = function() {
    //this.printValues();
    var instance = this.instance;

    heightEachChart = (window.innerHeight - 100) / this.productLen; // 100 subtracted to compensate the 
    widthEachChart = Math.floor(window.innerWidth / (jsonData.y_axis_map.length + 2));
    //labelSVG box
    var plot = new PlotGraph();
    var sepSVG = plot.createSVG(widthEachChart, heightEachChart);
    this.sepSVG = sepSVG;
    var productType = instance.model;


    this.addText(0, 12, productType);
    //console.log("hello" +this.instance.productTypes.length);
    //console.log(index);
    //console.log("hello"+this.instance.productTypes.length);
    for (var j = 0; j < this.instance.productTypes.length; j++) {
        var x = widthEachChart / 2;
        //console.log("loop");
        //var y = (heightEachChart / this.noofXTips) * (j) + 12;
        //console.log(this.instance.productIns[index].productTypes[j]+'hello');
        //console.log(this.instance.productIns[index].productTypes[j] );
        this.addText(x, 12 + (j) * heightEachChart / (this.instance.productTypes.length + 1), this.instance.productTypes[j]);
    }
    //this.addText(x, 12 + (j)* heightEachChart/(this.instance.productTypes.length+1),"Total");
    var style = "stroke:rgb(237, 237, 237);stroke-width:3;";

    plot.drawLine(sepSVG, 0, 0, widthEachChart, 0, style);
    for (var i = 0; i < jsonData.y_axis_map.length; i++) {

        this.ChartIndex = i;

        this.svg[i] = plot.createSVG(widthEachChart, heightEachChart);
        this.drawChartOutline();
        this.plotColumnChart();

    }
    //draw boundary line at the end of product type
    var className = "drawLine";
    sepSVG = this.svg[this.ChartIndex];
    plot.drawLine(sepSVG, widthEachChart, 0, widthEachChart, heightEachChart, style, className);
    //this.drawYAxis();


};