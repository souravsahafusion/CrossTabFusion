"use strict";

function CrossTab(instance, input, index, productLen) {
    PlotColumnBar.call(this, instance);
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
CrossTab.prototype = Object.create(PlotColumnBar.prototype);
CrossTab.prototype.constructor = CrossTab;


CrossTab.prototype.drawChartOutline = function() {
    this.chartId = document.getElementById("chart");
    var instance = this.instance,
        x1,
        x2,
        y1,
        inclination,
        svg,
        xAxis,
        yAxis;       
    x1 = 0;
    this.chartLowBoundXCoor = x1;

    x2 = x1 + heightEachChart;
    this.chartUpBoundXCoor = x2;
    y1 = 0;

    inclination = "vertical";
    svg = this.svg[this.ChartIndex];
    xAxis = new DrawXAxis(instance, x1, y1, inclination, svg);
    xAxis.drawAxis();
    x1 = 0 /*widthEachChart * distYAxisFromOr*/ ;
    y1 = 0;
    inclination = "horizontal";
    this.noofXTips = this.instance.productTypes.length;
    yAxis = new DrawYAxis(instance, x1, y1, inclination, svg);
    yAxis.drawAxis();
    yAxis.drawYAxis();
};



var heightEachChart = 0;
var widthEachChart = 0;

CrossTab.prototype.addHeader = function() {
    var div = document.getElementById("heading"),
        argumentText;
    document.body.removeChild(div);

    var plot = new PlotGraph(),
        sepSVG,
        textProductType,
        textProduct,
        x,
        y,
        className,
        x1,
        x2,
        y1,
        y2,
        textZone,
        xTemp,
        sepSVG = plot.createSVG(window.innerWidth, 30),
        loopLen = jsonData.y_axis_map.length;
    this.sepSVG = sepSVG;
    textProductType = "Product Type";
    textProduct = "Product";
    x = 0;
    y = 12;
    var fontSize = widthEachChart * .06;
    className = "addedText";
    argumentText = {
        "svg" : sepSVG,
        "fontSize" : fontSize,
        "className" : className
        

    };
    plot.addText(x, y, textProductType, argumentText);
    x = Math.floor(window.innerWidth / (loopLen + 2));
    plot.addText(x / 2, y, textProduct, argumentText);
    for (var i = 0; i < loopLen; i++) {
        x1 = x * (i + 1);
        x2 = x * (i + 1);
        y1 = 0;
        y2 = 30;
        var style = "stroke:rgb(237, 237, 237);stroke-width:1;";

        plot.drawLine(sepSVG, x1, y1, x2, y2, style);
        textZone = jsonData.y_axis_map[i];
        xTemp = x1 + x * .3;
        plot.addText(xTemp, y, textZone, argumentText);

    }
    xTemp = x * (i + 1);
    plot.drawLine(sepSVG, xTemp, y1, xTemp, y2, style);




};
CrossTab.prototype.addFooter = function() {
    var plot = new PlotGraph();
    var x,
        x1,
        x2,
        y1,
        y2,
        tempx1,
        tickValue,
        i,
        j,
        y_axis_map_len = jsonData.y_axis_map.length,
        sepSVG = plot.createSVG(window.innerWidth, 30),
        className,
        argumentText;
    var style;
    
    this.sepSVG = sepSVG;
    x = widthEachChart;
    style = "stroke:rgb(237, 237, 237);stroke-width:1;";
    className = "drawLineend";
    //sepSVG = this.svg[this.ChartIndex];
    plot.drawLine(sepSVG, widthEachChart, 0, widthEachChart * (jsonData.y_axis_map.length+1) , 0, style, className);
    argumentText = {
        "svg" : sepSVG,
        "className" : "addedText"
        

    };
    for (i = 0; i < y_axis_map_len; i++) {

        x1 = x * (i + 1);
        x2 = x * (i + 1);
        y1 = 0;
        y2 = 30;
        style = "stroke:rgb(237, 237, 237);stroke-width:1;";

        //zone separator lines
        plot.drawLine(sepSVG, x1, y1, x2, y2, style);
        for (j = 0; j < noOfYTips; j++) {
            var xLabelCoor = widthEachChart / noOfYTips;
            //ticks 
            tempx1 = x1 + xLabelCoor * (j + 1);
            plot.drawLine(sepSVG, tempx1, 0, tempx1, 4, style);
            
            if (j === 0) {

                plot.addText(x1 + xLabelCoor * (j), 16, 0 + "K", argumentText);
            } else if (j != noOfYTips) {
                tickValue = maximum / noOfYTips * j / 1000;
                tempx1 = x1 + xLabelCoor * (j) - 10;
                plot.addText(tempx1, 16, tickValue + "K", argumentText);
            }
        }
        tempx1 = x1 + x * .3;
        plot.addText(tempx1, 28, jsonData.xAxisLabel, argumentText);


    }
    //last separator line 
    x1 = x * (i + 1);
    x2 = x * (i + 1);
    plot.addText(tempx1, 28, jsonData.xAxisLabel, argumentText);




};

CrossTab.prototype.setColumnChartAttr = function(){}
CrossTab.prototype.initiateDraw = function() {
    var instance = this.instance,
        plot = new PlotGraph(),
        sepSVG,
        productType,
        loopLen,
        x,
        y,
        i,
        y_axis_mapLen = jsonData.y_axis_map.length,
        className,
        drawColumnBar,
        a = 0,
        b = maximum,
        c = 0,
        d = widthEachChart,
        argumentText,
        plotArr,
        cmpArr;

    heightEachChart = (window.innerHeight - 100) / this.productLen; // 100 subtracted to compensate the 
    widthEachChart = Math.floor(window.innerWidth / (y_axis_mapLen + 2));
    //labelSVG box
   
    sepSVG = plot.createSVG(widthEachChart, heightEachChart);
    this.sepSVG = sepSVG;
    productType = instance.model;


    argumentText = {
        "svg" : sepSVG,
        "className" : "addedText"
        

    };
    plot.addText(0, 12, productType, argumentText);
    loopLen = instance.productTypes.length;
    for (i = 0; i < loopLen; i++) {
        x = widthEachChart / 2;
        y = 12 + (i) * heightEachChart / (loopLen + 1);
        plot.addText(x, y, instance.productTypes[i], argumentText);
    }
    
    var style = "stroke:rgb(237, 237, 237);stroke-width:1;";

    plot.drawLine(sepSVG, 0, 0, widthEachChart, 0, style);
    for (i = 0; i < y_axis_mapLen; i++) {

        this.ChartIndex = i;

        this.svg[i] = plot.createSVG(widthEachChart, heightEachChart);
        this.drawChartOutline();
        this.setColumnChartAttr();
        plotArr = instance.productIns[this.ChartIndex].sos;
        cmpArr =  instance.productIns[this.ChartIndex].sop;
        /*inherited the plotColumnChart method of PlotColumnBar*/
        this.plotColumnChart(plotArr, this.svg[i], cmpArr, loopLen);
        

    }
    
    //draw boundary line at the end of product type
    className = "drawLine";
    sepSVG = this.svg[this.ChartIndex];

    //vertical line at the end of each row 
    plot.drawLine(sepSVG, widthEachChart, 0, widthEachChart, heightEachChart, style, className);
    
};