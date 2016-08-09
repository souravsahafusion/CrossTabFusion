    function CrossTab(instance, input, index) {
        
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
    
    CrossTab.prototype.createSVG = function(widthSVG, heightSVG) {
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        //var chartNo = this.chartNo;
        svg.setAttribute("height", heightSVG) ;
        svg.setAttribute("width", widthSVG);
        chartId = document.getElementById("chart");
        svg.setAttribute("class", "chartSVG");
        //console.log(this.svg[index]);
        chartId.appendChild(svg);
        return svg;

    };
    
    CrossTab.prototype.drawLine = function(sepSVG, x1, y1, x2, y2, style, className, visibility, strokedasharray) {
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
        
            sepSVG.appendChild(line); 
       

    };
    
    
    CrossTab.prototype.addText = function(x, y, textValue, fontSize,className,transform,  textElement,  style) {

        if (typeof textElement == 'undefined') {
            textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");

        }

        textElement.setAttribute("x", x);
        textElement.setAttribute("y", y);
        textElement.innerHTML = textValue;
        textElement.setAttribute("class", "addedText");
        this.sepSVG.appendChild(textElement);

    };
    CrossTab.prototype.drawXAxis = function() {
        //var chartNo = this.chartNo;


        var x1 = 0;/*widthEachChart * distYAxisFromOr*/; // distance from the origin to the yaxis
        this.chartLowBoundXCoor = x1;

        var x2 = 0/*widthEachChart + (widthEachChart * distYAxisFromOr) + (widthEachChart / 20)*/ ; //the extra divided by 20 added to keep some extra space
        this.chartUpBoundXCoor = x2;
        var y1 = 0;
        var y2 = heightEachChart;
      var style = "stroke:rgb(237, 237, 237);stroke-width:3;";
        var className = "drawXAxis";
        var svg = this.svg[this.ChartIndex];
        this.drawLine(svg, x1, y1, x2, y2, style, className);
        

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
    CrossTab.prototype.drawYAxis = function() {

        //var chartNo = this.chartNo;
        //var yShift = this.yShift;
        var x1 = 0/*widthEachChart * distYAxisFromOr*/;
        var x2 = widthEachChart/*widthEachChart * distYAxisFromOr*/;
        //console.log(chartNo + 'chartNo');
        var y1 = 0/*(heightEachChart * yShift)*/;
        var y2 = 0/*(heightEachChart) * yShift) + (heightEachChart)*/;
        var style = "stroke:rgb(237, 237, 237);stroke-width:3;";
        var className = "axisDraw";
        var svg = this.svg[this.ChartIndex];
        this.drawLine(svg, x1, y1, x2, y2, style, className);

        //draw ticks
        //var noOfYTips = this.noOfYTips;


        //var heightEachChart = this.heightEachChart;
        var temp_y1 = y1;
        this.upLimitYAxis = y1; //setting the top limit value of y axis

        var temp_x1 = x1;
        var temp_x2 = x2;
        /*assigning label text to divs + assigning tics and division draw + rectangle for coloring*/
        

    };
    CrossTab.prototype.calculateMappingPoint = function(value) {
        var a = 0;
        var b = maximum;
        var c = 0/*this.upLimitYAxis*/;
        var d = widthEachChart/*this.lowLimitYAxis*/;
        return ((value - a) / (b - a) * (d - c));

    };
   CrossTab.prototype.genColor = function(ratio){
       if(ratio > 0){
          var color1 = object.minProfitColor;
          var color2 = object.maxProfitColor; 
       }else{
           var color1 = object.minLossColor;
          var color2 = object.maxLossColor; 
          //console.log(ratio);
          ratio = ratio * -1;
       }
   
   

   var hex = function(x) {
       x = x.toString(16);
       return (x.length == 1) ? '0' + x : x;
   };

   var r = Math.ceil(parseInt(color1.substring(0,2), 16) * ratio + parseInt(color2.substring(0,2), 16) * (1-ratio));
   var g = Math.ceil(parseInt(color1.substring(2,4), 16) * ratio + parseInt(color2.substring(2,4), 16) * (1-ratio));
   var b = Math.ceil(parseInt(color1.substring(4,6), 16) * ratio + parseInt(color2.substring(4,6), 16) * (1-ratio));

   var middle = hex(r) + hex(g) + hex(b);
   return middle;
};

    CrossTab.prototype.plotColumnChart = function() {

        for (var i = 0; i < this.instance.productTypes.length; i++) { /*to be changed later '12' for any number of data i.e. find the last index of the storevalue array*/
            var value = this.instance.productIns[this.ChartIndex].sos[i];
        var svg = this.svg[this.ChartIndex];
            if (typeof value != 'undefined') {
                scaleColChartFactor = object.scaleColChartFactor / 100;
                //console.log(value);

                var yPointPlot = this.calculateMappingPoint(value);
                //console.log(range.length); need to debug
                //this.storeAncorPointsY[i] = yPointPlot;
                var xPointPlot = 0/*this.lowLimitXAxis + (widthEachChart / this.noofXTips) * (i)*/;
                var valueProfit = this.instance.productIns[this.ChartIndex].sop[i];
                var ratio = valueProfit / value;
                
                var styleColor = this.genColor(ratio);
                //storeAncorPointsX[i] = Math.floor(xPointPlot);
                var x = 0/*xPointPlot - widthEachChart * scaleColChartFactor*/;
                var y =  (heightEachChart / (this.noofXTips+1)) * (i);
                var heightRect = heightEachChart/*widthEachChart*/ * scaleColChartFactor * 2;
                var widthRect = yPointPlot;
                var style = "stroke-width:3;stroke:rgb(30, 122, 205)";
                var className = "plotColumnGraph";
                
                var rectIns = this.drawRectangle(svg, x, y, heightRect, widthRect, className, style,styleColor);

                //this.columnChartListener(rectIns, className);
                //this.lastPlottedPointX = xPointPlot;
                //this.lastPlottedPointY = yPointPlot;

                //skipping the 2D array for storing x-y w.r.t month and instead storing the previous x-y coordinates

            }
        }
        //add total column
        value = this.instance.productIns[this.ChartIndex].sosTotal;
        if (typeof value != 'undefined') {
                scaleColChartFactor = object.scaleColChartFactor / 100;
                //console.log(value);

                yPointPlot = this.calculateMappingPoint(value);
        }
                valueProfit = this.instance.productIns[this.ChartIndex].sopTotal;
                ratio = valueProfit / value;
                styleColor = this.genColor(ratio);
                var x = 0/*xPointPlot - widthEachChart * scaleColChartFactor*/;
                var y =  (heightEachChart / (this.noofXTips+1)) * (i);
                var heightRect = heightEachChart/*widthEachChart*/ * scaleColChartFactor * 2;
                var widthRect = yPointPlot;
                var style = "fill:rgb(30, 122, 205);stroke-width:3;stroke:rgb(30, 122, 205)";
                var className = "plotColumnGraph";
             

                var rectIns = this.drawRectangle(svg, x, y, heightRect, widthRect, className, style,styleColor);
        var style = "stroke:rgb(237, 237, 237);stroke-width:3;";
        className = "drawLine";
        svg = this.svg[this.ChartIndex];
        this.drawLine(svg,0,heightEachChart,widthEachChart,heightEachChart,style,className);

    };

    
    CrossTab.prototype.drawRectangle = function(svg, x, y, height, width, className, style,styleColor) {
        var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttributeNS(null, 'x', x);
        rect.setAttributeNS(null, 'y', y);
        rect.setAttributeNS(null, 'height', height);
        rect.setAttributeNS(null, 'width', width);
        rect.setAttribute("class", className);
        //rect.setAttribute("style", style);
        rect.setAttribute("fill", "#"+styleColor);
        rect.setAttribute("stroke", "#"+styleColor);
        
        
        svg.appendChild(rect);
        return rect;


    };
    
    
    CrossTab.prototype.drawChartOutline = function() {
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
    CrossTab.prototype.printValues = function(){
        var input = this.input;
        var index = this.index;
        var instance = this.instance;
        for(var i = 0; i < input.zone_map.length; i++){ 
            for(var j = 0; j < instance.productTypes.length; j++){
                /*if(instance.productIns[i].sos[j] == NaN || instance.productIns[i].sos[j] == undefined){
                    instance.productIns[i].sos[j] = 0;
                }*/
                //console.log(instance.productIns[i].sos[j] + instance.productIns[i].productName[j]+ ' '+instance.model+ ' '+input.zone_map[i]);
            }
            
        }


    };
    CrossTab.prototype.addHeader = function(){
        var div = document.getElementById("heading");
        document.body.removeChild(div);
        var sepSVG = this.createSVG(window.innerWidth,30);
        this.sepSVG = sepSVG;
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
            var style = "stroke:rgb(237, 237, 237);stroke-width:2;";
            
            this.drawLine(sepSVG,x1,y1,x2,y2,style);
            var textZone = object.zone_map[i];
            this.addText(x1 + x * .3, y, textZone,fontSize);

        }
        this.drawLine(sepSVG,x * (i+1),y1,x * (i+1),y2,style);




    };
CrossTab.prototype.addFooter = function(){
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
       
        var sepSVG = this.createSVG(window.innerWidth, 30);
        this.sepSVG =sepSVG;
        x = widthEachChart/*Math.floor(window.innerWidth / (object.zone_map.length + 2))*/;
      
        for(var i = 0; i < object.zone_map.length;i++){
            
            var x1 = x * (i+1);
            var x2 = x * (i+1);
            var y1 = 0;
            var y2 = 30;
            var style = "stroke:rgb(237, 237, 237);stroke-width:2;";
            //zone separator lines
            this.drawLine(sepSVG,x1,y1,x2,y2,style);
            //console.log(noOfYTips);
            for(var j = 0;j < noOfYTips; j++){
                var xLabelCoor = widthEachChart / noOfYTips;
                //ticks 
             this.drawLine(sepSVG, x1 +xLabelCoor *(j+1),0,x1 + xLabelCoor *(j+1),4,style);
                //console.log(x1 *(j+1));
             if(j==0){
                 
                 this.addText(x1 +xLabelCoor *(j)+ 5,16,0+"K");
             }else if(j != noOfYTips){
                 var tickValue = maximum / noOfYTips * j/1000;
                this.addText(x1 +xLabelCoor *(j) - 10,16,tickValue+"K"); 
             }    
            }
            this.addText(x1 + x * .3, 28, object.xAxisLabel);
            

        }
        //last separator line 
    this.drawLine(sepSVG, x * (i+1),y1,x * (i+1),y2,style);
    




    };


    CrossTab.prototype.initiateDraw = function(){
        //this.printValues();
        heightEachChart = (window.innerHeight - 100) / object.data.length;
        widthEachChart = Math.floor(window.innerWidth / (object.zone_map.length + 2));
        var sepSVG = this.createSVG(widthEachChart, heightEachChart);
        this.sepSVG =sepSVG;
        var productType = this.instance.model;
        var fontSize  = widthEachChart * .06
        this.addText(0, 12,productType);
        
         for(var j = 0;j < this.instance.productTypes.length; j++){
            var x = widthEachChart / 2 ;
            //var y = (heightEachChart / this.noofXTips) * (j) + 12;
            //console.log(this.instance.productTypes[j] + 'y' +y);
            this.addText(x, 12 + (j)* heightEachChart/(this.instance.productTypes.length+1),this.instance.productTypes[j]);
         }
        this.addText(x, 12 + (j)* heightEachChart/(this.instance.productTypes.length+1),"Total");
        var style = "stroke:rgb(237, 237, 237);stroke-width:3;";
        this.drawLine(sepSVG, 0,0,widthEachChart,0,style); 
        for(var i = 0; i < object.zone_map.length; i++){ 

            this.ChartIndex = i;
            
            this.svg[i] = this.createSVG(widthEachChart, heightEachChart);
            this.drawChartOutline();
            this.plotColumnChart();
            
        }
        //draw boundary line at the end of product type
        var className = "drawLine";
        sepSVG = this.svg[this.ChartIndex];
        this.drawLine(sepSVG, widthEachChart,0,widthEachChart,heightEachChart,style,className);
        //this.drawYAxis();
        

    };


    