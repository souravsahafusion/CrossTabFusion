var range = [];
function parseData(input) {
//	var modelChart[];
	

	var ctrl = new ParsingData();
	ctrl.setValues(input);
	for(var i = 0; i < input.data.length; i++){
		//modelChart[i] = new ModelChart();
		range[i] = new ParsingData();
		range[i].calculateValues(input, i);


	} 
    
	 

}
parseData(jsonData);

