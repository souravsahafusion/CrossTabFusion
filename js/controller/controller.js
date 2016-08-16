var drawChart = [];
function parseData(input) {

    
    var range = [];
    //console.log(input);
    var chartType = input.chartType;
    //console.log(chartType);
    //console.log(typeof input.zone_map);
    if(chartType == "CrossTab"){
        if(typeof input.zone_map !== 'undefined'){
            var ctrl = new ParsingData();
    var instanceArray = ctrl.setValues(input);
   
    var productLen  = instanceArray.length;
    findRangeModified();
    var addChartText = new CrossTab();
    addChartText.addHeader();
   
    for(var i = 0; i < instanceArray.length; i++){
        //modelChart[i] = new ModelChart();
        drawChart[i] = new CrossTab(instanceArray[i], input, i, productLen);
        
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
    var numberOfCharts = jsonData.y_axis_map.length;
    var chartArrange = new CalValues();
    chartArrange.customChartArrange();
    
    var expression = jsonData.chart_order_func;
        switch (expression) {
            case "minimum":
                arrangeOnMin();
                break;
            case "maximum":
                arrangeOnMax();
                break;

        }
    for (var i = 0; i < numberOfCharts; i++) {
        var tempMap = jsonData.y_axis_map[i];
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
parseData(json);
window.onresize = function(){ location.reload(); }
