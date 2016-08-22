function PlotColumnBar(instance, loopLen){
	this.instance = instance;
	this.loopLen = loopLen;
	this.alignment = alignment;
}

PlotColumnBar.prototype.plotColumnChart = function(plotArr, svg, cmpArr){

  var instance = this.instance,
        //svg,
        scaleColChartFactor,
        i,
        loopLen = this.loopLen,
        value,
        a,
        b,
        c,
        d,
        chartFunc = new ChartFunc(),
        yPointPlot,
        valueProfit,
        ratio,
        generateColor = new GenColor(),
        styleColor,
        x,
        y,
        heightRect,
        widthRect,
        rectIns,
        plot = new PlotGraph(),
        className,
        scale = jsonData.scaleColChartFactor;
    for (i = 0; i < loopLen; i++) { 
        value = plotArr[i];
        //svg = this.svg[this.ChartIndex];
       

        if (typeof value != 'undefined') {
            scaleColChartFactor = scale / 100;

            a = 0;
            b = maximum;
            c = 0;
            d = widthEachChart;
            yPointPlot = chartFunc.calculateMappingPoint(value, a, b, c, d);
            if (yPointPlot < 2) {
                yPointPlot = 2;
            }
            if(jsonData.cmpArr == "true" && typeof cmpArr != 'undefined'){
                valueProfit = cmpArr[i];
                ratio = valueProfit / value;
                styleColor = generateColor.genColor(ratio);
            }
            

            x = 0;
            y = (heightEachChart / (loopLen)) * (i);
            heightRect = heightEachChart * scaleColChartFactor * 2;
            widthRect = yPointPlot;
            var style = "stroke-width:3;stroke:rgb(30, 122, 205)";
            className = "plotColumnGraph";

            rectIns = plot.drawRectangle(svg, x, y, heightRect, widthRect, className, style, styleColor);

            //skipping the 2D array for storing x-y w.r.t month and instead storing the previous x-y coordinates

        }
    }
 
   

};


