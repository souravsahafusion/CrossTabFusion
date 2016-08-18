function DrawXAxis(instance, x1, y1, inclination,svg) {
    Axis.call(this, instance, x1, y1, inclination,svg);
    this.instance = instance;
    this.x1 = x1;
    this.y1 = y1;

    
}
DrawXAxis.prototype = Object.create(Axis.prototype);
DrawXAxis.prototype.constructor = DrawXAxis;
DrawXAxis.prototype.drawAxis =function(){
    this.plotAxis();

};
DrawXAxis.prototype.drawXAxisComp = function(check, numberOfCharts) {
    var instance = this.instance;
    var chartNo = instance.chartNo;
    var yShift = instance.yShift,
        x1 = this.x1,
        y1 = this.y1,
        x2,
        y2,
        noofXTips;
    //drawTicks
    var numberOfTicks = jsonData.data.length;
    if (jsonData.chartType == "line") {
        var temp_x1 = x1 + (shiftXTipLine * widthEachChart); /*this variable is used to set the distance from y-axis to the first plotting point*/
    } else if (jsonData.chartType == "column") {
        var temp_x1 = x1 + (shiftXTipCol * widthEachChart);
    }

    instance.lowLimitXAxis = temp_x1; //setting the limits from the Tip value
    //var widthEachChart = this.widthEachChart;
    /*
     */
    instance.noofXTips = instance.storeValue.length;
    noofXTips = instance.noofXTips;
    //end of horizontal axis draw
    for (i = 0; i < noofXTips; i++) {
        //console.log(instance.noofXTips + 'noofXTips');
        x1 = temp_x1 + (widthEachChart / noofXTips) * (i);
        x2 = temp_x1 + (widthEachChart / noofXTips) * (i);
        instance.upLimitXAxis = x1;
        if (check !== 2) {
            y1 = (heightEachChart * yShift) - 4;
            y2 = (heightEachChart * yShift) + 4;
        } else {
            y1 = (heightEachChart * yShift) + (heightEachChart) - 4;
            y2 = (heightEachChart * yShift) + (heightEachChart) + 4;
        }
        if (jsonData.chartType == "line") {
            var style = "stroke:rgb(237, 237, 237);stroke-width:1;";
            var className = "axisTicks";

            var svg = instance.svg;
            this.drawLine(svg, x1, y1, x2, y2, style, className);
            

        }


        //put x-axis label 
        //console.log(check+ ' check'+ numberOfColCharts + ' numberOfColCharts');
        if (check !== 2 && chartNo <= numberOfColCharts) {
            //console.log("test");
            this.chartDivLabelX(jsonData.month[i], x1, y2, check);

        }

        if (check == 2 && chartNo > (numberOfCharts - numberOfColCharts)) {
            //console.log("test");
            this.chartDivLabelX(jsonData.month[i], x1, y2, check);
        }
    }
};