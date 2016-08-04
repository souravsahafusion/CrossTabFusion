function ParsingData(){
	this.instance = '';
    this.input = '';
    this.index = 0;

} 
ParsingData.prototype.setZonalValues = function(){
    var input = this.input;
    var index =this.index;
    var instance = this.instance;
    for(var i = 0; i < input.zone_map.length; i++){
        var product = new ProductType();
        var zoneDataSet = object.data[index].values[i].zone;
        for(var j = 0; j < input.zone_map.length; j++){
            //if()
        }
        instance.productIns[i] = product;
    }
};
ParsingData.prototype.setValues = function(input){
 //var instance = this.instance;
 object =  input;
 //console.log(object);
 var modelChart = [];
 for(var i = 0; i < object.data.length; i++){
 	//console.log(object.data[i].values.length);
 	for(var j = 0; j < object.data[i].values.length; j++){
 		var value = object.data[i].values[j].zone;
 		if(object.zone_map.indexOf(value) < 0){
 			object.zone_map.push(value);
 			//console.log(value);
 		}
 	}
 	
 }


};
ParsingData.prototype.setProductName = function(){
    var input = this.input;
    var index = this.index;
    var instance = this.instance;
	
	
	instance.model = object.data[index].product_type;
	for( var i = 0; i < object.zone_map.length ; i++){
		//console.log(object.zone_map.length + 'zone_map');
        
    //object.data[2].values[1].productValues[1].product
        if(typeof object.data[index].values[i] !== 'undefined'){ //temporary error removed 
            
       
       
		for(var j = 0; j < object.data[index].values[i].productValues.length; j++){
            value = object.data[index].values[i].productValues[j].product;
            //console.log(value);
           
            if(instance.productTypes.indexOf(value) < 0){
                 console.log(value);
			instance.productTypes.push(value);
                
            }
            
			//var tempIns = pdtType[i].productTypes[j];
			//tempIns.productName = object.data[index].values[i].productValues[]


		}
             }
        
        
} //end of product setting


};
ParsingData.prototype.calculateValues = function(input, index){
    var pdtType = [];
    pdtType[index] = new ProductType();
    this.instance = pdtType[index];
    this.input = input;
    this.index = index;
    this.setProductName();
};
var object ={};
