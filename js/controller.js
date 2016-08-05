var range = [];
var drawChart = [];
function parseData(input) {
//	var modelChart[];
	
    /*var instanceProduct = [];*/
	var ctrl = new ParsingData();
	ctrl.setValues(input);
	for(var i = 0; i < input.data.length; i++){
		//modelChart[i] = new ModelChart();
		range[i] = new ParsingData();
		range[i].calculateValues(input, i);
	} 
    console.log(maximum);
    findRangeModified();
    //need to create a separate loop for drawing since the maximum value need to be calculated from all the datas
	 for(var i = 0; i < input.data.length; i++){
		//modelChart[i] = new ModelChart();
		drawChart[i] = new DrawChart(range[i].instance, input, i);
		drawChart[i].initiateDraw();

	}

}
parseData(jsonData);

