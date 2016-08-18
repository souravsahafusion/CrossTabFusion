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
    var instance = this.instance;
    var x1 = this.x1;
    var y1 = this.y1;
    var x2;
    var y2;
    var svg;

    //draw ticks
    var noOfYTips = instance.noOfYTips;
    var temp_y1 = y1;
    instance.upLimitYAxis = y1; //setting the top limit value of y axis

    var temp_x1 = x1;

    /*assigning label text to divs + assigning tics and division draw + rectangle for coloring*/
    var xl = instance.chartLowBoundXCoor;
    var width = instance.chartUpBoundXCoor - instance.chartLowBoundXCoor;
    var height = heightEachChart / noOfYTips;
    for (i = 0; i < noOfYTips; i++) {
        x1 = temp_x1 - 4;
        x2 = x1;
        y1 = temp_y1 + (heightEachChart / noOfYTips) * (i);
        y2 = temp_y1 + (heightEachChart / noOfYTips) * (i);

        //drawing ticks
        var style = "";
        var className = "axisTicks";
        var svg = instance.svg;
        this.drawLine(svg, x1, y1, x2, y2, style, className);
        //draw.drawLine(x1, y1, x2, y2, style, className);
        //drawing divs
        var style = "stroke:rgb(237, 237, 237);stroke-width:1;";
        className = "divLines";
        x2 = widthEachChart + (widthEachChart * distYAxisFromOr);
        this.drawLine(svg, x1, y1, x2, y2, style, className);
        //writing the labels

        //drawing the rect
        if ((i % 2 == 1)) {

            className = "designRect";
            style = "fill:rgb(247,247,247);";
            svg = instance.svg;
            this.drawRectangle(svg, xl, y1, height, width, className, style);
        }

    }
    instance.lowLimitYAxis = y1 + (heightEachChart / noOfYTips);
    for (i = 0; i <= noOfYTips; i++) {
        y2 = temp_y1 + (heightEachChart / noOfYTips) * (i);
        this.chartDivLabelY(y2, i);
    }

};