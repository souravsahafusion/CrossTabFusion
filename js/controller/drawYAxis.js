"use strict";
function DrawYAxis(instance, x1, y1, inclination, svg) {
    Axis.call(this, instance, x1, y1, inclination, svg);
    this.instance = instance;
    this.x1 = x1;
    this.y1 = y1;

}
DrawYAxis.prototype = Object.create(Axis.prototype);
DrawYAxis.prototype.constructor = DrawYAxis;
DrawYAxis.prototype.drawAxis = function() {
    this.plotAxis();

};
DrawYAxis.prototype.drawYAxis = function() {
    var instance = this.instance,
        x1 = this.x1,
        y1 = this.y1,
        x2,
        y2,
        svg = instance.svg,
        noOfYTips = instance.noOfYTips,
        temp_y1 = y1,
        temp_x1 = x1,
        chartLowBoundXCoor = instance.chartLowBoundXCoor,
        chartUpBoundXCoor = instance.chartUpBoundXCoor,
        xl = chartLowBoundXCoor,
        width,
        height,
        i,
        argumentPass;

    //draw ticks
    
   
    instance.upLimitYAxis = y1; //setting the top limit value of y axis

    
    /*assigning label text to divs + assigning tics and division draw + rectangle for coloring*/
    
    width = chartUpBoundXCoor - chartLowBoundXCoor;
    height = heightEachChart / noOfYTips;
    for (i = 0; i < noOfYTips; i++) {
        x1 = temp_x1 - 4;
        x2 = x1;
        y1 = temp_y1 + (heightEachChart / noOfYTips) * (i);
        y2 = temp_y1 + (heightEachChart / noOfYTips) * (i);

        //drawing ticks
        var style = "stroke:rgb(237, 237, 237);stroke-width:1;";
        var className = "axisTicks";
        argumentPass = {
            "svg" : svg,
            "x1" : x1,
            "y1" : y1,
            "x2" : x2,
            "y2" : y2,
            "className" : className
        };
        this.drawLine(svg, x1, y1, x2, y2, style, className);
        //draw.drawLine(x1, y1, x2, y2, style, className);
        //drawing divs
        
        className = "divLines";
        x2 = widthEachChart + (widthEachChart * distYAxisFromOr);

        this.drawLine(svg, x1, y1, x2, y2, style, className);
        //writing the labels

        //drawing the rect
        if ((i % 2 == 1)) {

            className = "designRect";
            style = "fill:rgb(247,247,247);";
            svg = instance.svg;
            argumentPass = {
            "svg" : svg,
            "x" : xl,
            "y" : y1,
            "height" : height,
            "width" : width,
            "className" : className,
            "style" : style
            };
            this.drawRectangleSep(xl, y1, height, width, argumentPass);
        }

    }
    instance.lowLimitYAxis = y1 + (heightEachChart / noOfYTips);
    for (i = 0; i <= noOfYTips; i++) {
        y2 = temp_y1 + (heightEachChart / noOfYTips) * (i);
        this.chartDivLabelY(y2, i);
    }

};