"use strict";
var drawChart = [];

function parseData(input) {


    var range = [],
        chartType,
        ctrl,
        instanceArray,
        loopLen,
        addChartText,
        i;
    
    chartType = input.chartType;
    if (chartType == "CrossTab") {
        //if(typeof input.zone_map !== 'undefined'){
        ctrl = new Parsing();
        instanceArray = ctrl.setValues(input);

        loopLen = instanceArray.length;
        findRangeModified();
        addChartText = new CrossTab();
        addChartText.addHeader();

        for (i = 0; i < loopLen; i++) {
            //modelChart[i] = new ModelChart();
            drawChart[i] = new CrossTab(instanceArray[i], input, i, loopLen);

            drawChart[i].initiateDraw();

        }

        addChartText.addFooter();
        /*}else{
            document.getElementById("heading").innerHTML = "Chart type not supported";
        }*/

    } else {

        //if(typeof input.y_axis_map !== 'undefined'){
        var chartBound = new CalValues(),
            instance,
            chartArrange,
            expression,
            numberOfCharts;
        

        chartBound.calculateChartOutLines(input);
        if (input.chart_map == "false") {
            chartBound.setZone();
        } else {
            chartBound.setKeys();
            chartArrange = new CalValues();
            chartArrange.customChartArrange();

            expression = jsonData.chart_order_func;
            switch (expression) {
                case "minimum":
                    arrangeOnMin();
                    break;
                case "maximum":
                    arrangeOnMax();
                    break;

            }

        }
        numberOfCharts = jsonData.y_axis_map.length;

        for (i = 0; i < numberOfCharts; i++) {
            var tempMap = jsonData.y_axis_map[i];
            //console.log(tempMap+ 'first step');
            range = [];
            if (input.chart_map == "false") {
                range[i] = new ParsingData();
                
                instance = range[i].setChartValues(tempMap, i);
            } else {
                
                range[i] = new CalValues();
                instance = range[i].setChartValues(tempMap, i);
            }


            range[i] = new DrawChart(instance, i);
            range[i].initiateGraph();

        }
        /*}else{
    document.getElementById("heading").innerHTML = "Chart type not supported";
}*/

    }



}
parseData(json);
window.onresize = function() {
    location.reload();
};