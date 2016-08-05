    function DrawChart(instance, input, index) {
        
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




    }
    
    DrawChart.prototype.createSVG = function(index) {
        this.svg[index] = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        //var chartNo = this.chartNo;
        this.svg[index].setAttribute("height", heightEachChart) ;
        this.svg[index].setAttribute("width", widthEachChart);
        chartId = document.getElementById("chart");
        this.svg[index].setAttribute("class", "chartSVG");
        //console.log(this.svg[index]);
        chartId.appendChild(this.svg[index]);
        return this.svg[index];

    };
    
    DrawChart.prototype.drawLine = function(x1, y1, x2, y2, style, className, visibility, strokedasharray) {
        var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
        line.setAttribute("class", className);
        //line.setAttribute("stroke-dasharray", strokedasharray);
        line.setAttribute("style", style);
        if (typeof visibility !== 'undefined') {
            line.setAttribute("visibility", "hidden");

        }

        this.svg[this.ChartIndex].appendChild(line);

    };
    DrawChart.prototype.drawLineSep = function(x1, y1, x2, y2, style, className, visibility, strokedasharray) {
        var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
        line.setAttribute("class", className);
        //line.setAttribute("stroke-dasharray", strokedasharray);
        line.setAttribute("style", style);
        if (typeof visibility !== 'undefined') {
            line.setAttribute("visibility", "hidden");

        }

        this.sepSVG.appendChild(line);

    };
    
    DrawChart.prototype.addText = function(x, y, textValue, fontSize,className,transform,  textElement,  style) {

        if (typeof textElement == 'undefined') {
            textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");

        }

        textElement.setAttribute("x", x);
        textElement.setAttribute("y", y);
        textElement.innerHTML = textValue;
        textElement.setAttribute("class", "addedText");
        //var fontSize  = widthEachChart * .06;
        //textElement.setAttribute("font-size", fontSize);
        //textElement.setAttribute("transform", transform);
        //textElement.setAttribute("style", style);
        this.sepSVG.appendChild(textElement);

    };
    DrawChart.prototype.drawXAxis = function() {
        //var chartNo = this.chartNo;


        var x1 = 0;/*widthEachChart * distYAxisFromOr*/; // distance from the origin to the yaxis
        this.chartLowBoundXCoor = x1;

        var x2 = 0/*widthEachChart + (widthEachChart * distYAxisFromOr) + (widthEachChart / 20)*/ ; //the extra divided by 20 added to keep some extra space
        this.chartUpBoundXCoor = x2;
        var y1 = 0;
        var y2 = heightEachChart;
      var style = "stroke:rgb(237, 237, 237);stroke-width:1;";
        var className = "drawXAxis";
        this.drawLine(x1, y1, x2, y2, style, className);
        

        this.lowLimitXAxis = x1; //setting the limits from the Tip value
        //var widthEachChart = this.widthEachChart;
        /*
         */
        this.noofXTips = this.instance.productTypes.length;
        this.upLimitXAxis = x1;

        /*for (i = 0; i < this.noofXTips; i++) {
            x1 = temp_x1 + (widthEachChart / this.noofXTips) * (i);
            x2 = temp_x1 + (widthEachChart / this.noofXTips) * (i);
            
            if (check !== 2) {
                y1 = (heightEachChart * yShift) - 4;
                y2 = (heightEachChart * yShift) + 4;
            } else {
                y1 = (heightEachChart * yShift) + (heightEachChart) - 4;
                y2 = (heightEachChart * yShift) + (heightEachChart) + 4;
            }
            if (obj.chartType == "line") {
                var style = "stroke:rgb(237, 237, 237);stroke-width:1;";
                var className = "axisTicks";
                //this.drawLine(x1, y1, x2, y2, style, className);

            }

            //put x-axis label 
            if (check !== 2 && chartNo <= numberOfColCharts) {
                //this.chartDivLabelX(obj.month[i], x1, y2, check);

            }

            if (check == 2 && chartNo > (numberOfCharts - numberOfColCharts)) {
                //this.chartDivLabelX(obj.month[i], x1, y2, check);
            }
        }*/
    };
    DrawChart.prototype.drawYAxis = function() {

        //var chartNo = this.chartNo;
        //var yShift = this.yShift;
        var x1 = 0/*widthEachChart * distYAxisFromOr*/;
        var x2 = widthEachChart/*widthEachChart * distYAxisFromOr*/;
        //console.log(chartNo + 'chartNo');
        var y1 = 0/*(heightEachChart * yShift)*/;
        var y2 = 0/*(heightEachChart) * yShift) + (heightEachChart)*/;
        var style = "stroke:rgb(237, 237, 237);stroke-width:1;";
        var className = "axisDraw";
        this.drawLine(x1, y1, x2, y2, style, className);

        //draw ticks
        //var noOfYTips = this.noOfYTips;


        //var heightEachChart = this.heightEachChart;
        var temp_y1 = y1;
        this.upLimitYAxis = y1; //setting the top limit value of y axis

        var temp_x1 = x1;
        var temp_x2 = x2;
        /*assigning label text to divs + assigning tics and division draw + rectangle for coloring*/
        

    };
    DrawChart.prototype.calculateMappingPoint = function(value) {
        var a = 0;
        var b = maximum;
        var c = 0/*this.upLimitYAxis*/;
        var d = widthEachChart/*this.lowLimitYAxis*/;
        return ((value - a) / (b - a) * (d - c));

    };
    

    DrawChart.prototype.plotColumnChart = function() {

        for (var i = 0; i < this.instance.productTypes.length; i++) { /*to be changed later '12' for any number of data i.e. find the last index of the storevalue array*/
            var value = this.instance.productIns[this.ChartIndex].sos[i]
            if (typeof value != 'undefined') {
                scaleColChartFactor = object.scaleColChartFactor / 100;
                console.log(value);

                var yPointPlot = this.calculateMappingPoint(value);
                //console.log(range.length); need to debug
                //this.storeAncorPointsY[i] = yPointPlot;
                var xPointPlot = 0/*this.lowLimitXAxis + (widthEachChart / this.noofXTips) * (i)*/;

                //storeAncorPointsX[i] = Math.floor(xPointPlot);
                var x = 0/*xPointPlot - widthEachChart * scaleColChartFactor*/;
                var y =  (heightEachChart / this.noofXTips) * (i);
                var heightRect = heightEachChart/*widthEachChart*/ * scaleColChartFactor * 2;
                var widthRect = yPointPlot;
                var style = "fill:rgb(30, 122, 205);stroke-width:3;stroke:rgb(30, 122, 205)";
                var className = "plotColumnGraph";

                var rectIns = this.drawRectangle(x, y, heightRect, widthRect, className, style);

                //this.columnChartListener(rectIns, className);
                this.lastPlottedPointX = xPointPlot;
                this.lastPlottedPointY = yPointPlot;

                //skipping the 2D array for storing x-y w.r.t month and instead storing the previous x-y coordinates

            }
        }

    };

    
    DrawChart.prototype.drawRectangle = function(x, y, height, width, className, style) {
        var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttributeNS(null, 'x', x);
        rect.setAttributeNS(null, 'y', y);
        rect.setAttributeNS(null, 'height', height);
        rect.setAttributeNS(null, 'width', width);
        rect.setAttribute("class", className);
        rect.setAttribute("style", style);
        this.svg[this.ChartIndex].appendChild(rect);
        return rect;


    };
    DrawChart.prototype.addChartName = function(chartNo, check) {
        var chartName = obj.y_axis_map[chartNo];
        var x = this.chartLowBoundXCoor;
        var y = 0;
        if (check !== 2) {
            y = this.lowLimitYAxis + heightEachChart * chartNameBoxShift;/*heightEachChart * .02; -> space between y-axis and the chartName box*/
             /*from where the chartName box rectangle will be plotted if the chart name lies below the chart*/
        } else {
            y = this.upLimitYAxis - heightEachChart * chartNameBoxShift - heightEachChart * chartNameBoxHtFactor;
        }

        var height = heightEachChart * chartNameBoxHtFactor;
        var width = this.chartUpBoundXCoor - this.chartLowBoundXCoor;
        var className = "chartName";
        var style = "fill:rgb(245,250,255);stroke:rgb(190,223,254);stroke-width:1;";
        this.drawRectangle(x, y, height, width, className, style);
        y = y + (height) * .6;
        x = (this.chartLowBoundXCoor + this.chartUpBoundXCoor) / 2 * .8;  //font position determination horizontally
        style = "stroke:rgb(6,48,86);"
        var fontSize = heightEachChart * .1;  //font position determination vertically within the box
        var transform = "rotate(0 " + x + "," + y + ")";
        var className = "textAdd";
        var textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");;
        //
        this.addText(x, y, chartName, transform, className, textElement, fontSize, style);

    };
    
    DrawChart.prototype.drawChartOutline = function() {
        this.chartId = document.getElementById("chart");
        //this.chartNo = chartNo + 1;

        /*var check = 1;

        if (numberOfCharts % 2 == 0) {
            check = 2; //even
        }*/
        this.drawXAxis();
        this.drawYAxis();
        //this.addChartName(chartNo, check); //this chartNo is the index value of the array 

        //this.addXLabel();

    };
    
    DrawChart.prototype.drawBoundRectangle = function(className) {
       
        style = "stroke:rgb(237, 237, 237);stroke-width:1;fill:transparent";
        var widthRect = this.chartUpBoundXCoor - this.chartLowBoundXCoor;
        var heightRect = this.lowLimitYAxis - this.upLimitYAxis;
        var rectBound = this.drawRectangle(this.chartLowBoundXCoor, this.upLimitYAxis, heightRect, widthRect, className, style);
        
        return rectBound;

    };

    DrawChart.prototype.drawDivRectangle = function(index) {
        /*var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");*/
        var x = this.lowLimitXAxis;
        var y = this.upLimitYAxis;
        var heightRect = this.lowLimitYAxis - this.upLimitYAxis;
        var widthRect = this.upLimitXAxis - this.lowLimitXAxis;
        var rectangleDiv = 'svgDivs';
        style = "fill:transparent";
        //plotted rectangle div
        /*rect.setAttributeNS(null, 'x', x);
        rect.setAttributeNS(null, 'y', y);
        rect.setAttributeNS(null, 'height', heightRect);
        rect.setAttributeNS(null, 'width', widthRect);
        rect.setAttribute("class", rectangleId);
        rect.setAttribute("style", "fill:transparent");
        //rect.setAttribute("visibility","hidden");
        this.svg.appendChild(rect);*/
        var rect = this.drawRectangle(x, y, heightRect, widthRect, rectangleDiv, style);
        
        rect.addEventListener("mousemove", entercoordinates.bind(this, rectangleDiv));
        /*rect.addEventListener("mousemove", function () {
                entercoordinates.call(this, rectangleId);  
            });*/
        rect.addEventListener("syncCrossHair", showCoords, false);
        //divNames[i].addEventListener("mousemove", showCoords,false);
        rect.addEventListener("mouseleave", clearcoor, false);
        this.toolTipTextIns = document.createElementNS("http://www.w3.org/2000/svg", "text"); //might need to be added in column as well
        this.toolTipBoxIns = document.createElementNS("http://www.w3.org/2000/svg", "rect");

        this.selectRectIns = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        var _this = this;
        this.svg.appendChild(this.selectRectIns);

        rect.addEventListener("mousedown", instantiateDragLine.bind(_this));
        rect.addEventListener("mousemove", dragLineRect.bind(_this));
        rect.addEventListener("mouseup", releaseLineRect.bind(_this));


        //svg chart area bound with x y axis
        /**/

    };

   
    var heightEachChart = 0;
    var widthEachChart = 0;
    //var crossHairInstance = '';
    var storeAncorPointsX = [];
    var flag = 0;
    //var flagRemoveColor = 0;
    var shiftXTipLine = 0; //first point plot shift on x-axis from y-axis for column chart
    var shiftXTipCol = 0; //first point plot shift on x-axis from y-axis for column chart
    //var distYAxisFromOr = .2; //widthEachChart * distYAxisFromOr
    //var yShiftPer = .25;
    //var chartNameBoxShift = .03;
    //var chartNameBoxHtFactor = .15;
    DrawChart.prototype.printValues = function(){
        var input = this.input;
        var index = this.index;
        var instance = this.instance;
        for(var i = 0; i < input.zone_map.length; i++){ 
            for(var j = 0; j < instance.productTypes.length; j++){
                /*if(instance.productIns[i].sos[j] == NaN || instance.productIns[i].sos[j] == undefined){
                    instance.productIns[i].sos[j] = 0;
                }*/
                console.log(instance.productIns[i].sos[j] + instance.productIns[i].productName[j]+ ' '+instance.model+ ' '+input.zone_map[i]);
            }
            
        }


    };
    DrawChart.prototype.initiateText = function(){
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        //var chartNo = this.chartNo;
        svg.setAttribute("height", 30) ;
        svg.setAttribute("width", window.innerWidth);
        chartId = document.getElementById("chart");
        svg.setAttribute("class", "chartSVG");

        //console.log(this.svg[index]);
        chartId.appendChild(svg);
        this.sepSVG = svg;
        var textProductType = "Product Type";
        var textProduct = "Product";
        var x = 0;
        var y = 12;
        var fontSize  = widthEachChart * .06;
        var className = "addedText";
        this.addText(x, y, textProductType,fontSize);
        x = Math.floor(window.innerWidth / (object.zone_map.length + 2));
        this.addText(x / 2, y, textProduct,fontSize);
        for(var i = 0; i < object.zone_map.length;i++){
            var x1 = x * (i+1);
            var x2 = x * (i+1);
            var y1 = 0;
            var y2 = 30;
            var style = "stroke:rgb(237, 237, 237);stroke-width:1;";
            this.drawLineSep(x1,y1,x2,y2,style);
            var textZone = object.zone_map[i];
            this.addText(x1 + x * .3, y, textZone,fontSize);

        }




    };


    DrawChart.prototype.initiateDraw = function(){
        //this.printValues();
        heightEachChart = (window.innerHeight - 30) / object.data.length;
        widthEachChart = Math.floor(window.innerWidth / (object.zone_map.length + 2));
        this.sepSVG = this.createSVG(object.zone_map.length);
        var productType = this.instance.model;
        var fontSize  = widthEachChart * .06
        this.addText(0, 12,productType,fontSize);
         for(var j = 0;j < this.instance.productTypes.length; j++){
            var x = widthEachChart / 2 ;
            //var y = (heightEachChart / this.noofXTips) * (j) + 12;
            //console.log(this.instance.productTypes[j] + 'y' +y);
            this.addText(x, 12 + (j)* heightEachChart/this.instance.productTypes.length,this.instance.productTypes[j],fontSize);
         }

        for(var i = 0; i < object.zone_map.length; i++){ 

            this.ChartIndex = i;
            this.createSVG(i);
            this.drawChartOutline();
            this.plotColumnChart();
        }
        //this.drawYAxis();
        

    };


    