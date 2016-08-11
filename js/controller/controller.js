var drawChart = [];
function parseData(input) {

    var range = [];
    var chartType = input.chartType;
    if(chartType == "CrossTab"){
        if(typeof input.zone_map !== 'undefined'){
            var ctrl = new ParsingData();
    ctrl.setValues(input);
    for(var i = 0; i < input.data.length; i++){
        //modelChart[i] = new ModelChart();
        range[i] = new ParsingData();
        range[i].calculateValues(input, i);
    } 
    //console.log(maximum);
    findRangeModified();
    var addChartText = new CrossTab();
    addChartText.addHeader();
    //need to create a separate loop for drawing since the maximum value need to be calculated from all the datas
     for(var i = 0; i < input.data.length; i++){
        //modelChart[i] = new ModelChart();
        drawChart[i] = new CrossTab(range[i].instance, input, i);
        
        drawChart[i].initiateDraw();

    }
    addChartText.addFooter();    
}else{
    document.getElementById("heading").innerHTML = "Chart type not supported";
}
        
    }else{
        if(typeof input.y_axis_map !== 'undefined'){
             var chartBound = new CalValues();
    chartBound.calculateChartOutLines(input);
    var numberOfCharts = obj.y_axis_map.length;
    var chartArrange = new CalValues();
    chartArrange.customChartArrange();
    
    var expression = obj.chart_order_func;
        switch (expression) {
            case "minimum":
                arrangeOnMin();
                break;
            case "maximum":
                arrangeOnMax();
                break;

        }
    for (var i = 0; i < numberOfCharts; i++) {
        var tempMap = obj.y_axis_map[i];
        //console.log(tempMap+ 'first step');
        var range = [];
        range[i] = new CalValues();
        var instance = range[i].setChartValues(tempMap, i);

        range[i] = new DrawChart(instance, i);
        range[i].initiateGraph();

    }  
        }else{
    document.getElementById("heading").innerHTML = "Chart type not supported";
}
     
    }
    


}
parseData(jsonData);
window.onresize = function(){ location.reload(); }
