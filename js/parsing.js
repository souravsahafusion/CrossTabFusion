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
        instance.productIns[i] = product;
        var objectZone = input.zone_map[i];
        
        //console.log(zoneDataSet);
        
        for(var j = 0; j < object.data[index].values.length; j++){ //extra loop running
            if(object.data[index].values[j] !== undefined){ // to recover the error
            var zoneDataSet = object.data[index].values[j].zone;
        }

            if( input.zone_map[i] == zoneDataSet){
                //console.log(zoneDataSet);
                for(var k = 0; k < instance.productTypes.length; k++){
                    for(var l = 0; l < object.data[index].values[j].productValues.length; l++){
                        var productTypeValue = object.data[index].values[j].productValues[l].product;
                        if(instance.productTypes[k] == productTypeValue){
                            instance.productIns[i].sos = object.data[index].values[j].productValues[l].sos;
                            instance.productIns[i].sop = object.data[index].values[j].productValues[l].sop;
                            instance.productIns[i].productName = productTypeValue;
                            //console.log(instance.productIns[i].sos + instance.productIns[i].productName);

                            break;
                        }
                    }
                }
                break;
            }
        }
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
                 //console.log(value);
			instance.productTypes.push(value);
                
            }
            
			//var tempIns = pdtType[i].productTypes[j];
			//tempIns.productName = object.data[index].values[i].productValues[]


		}
             }
        
        
} //end of product setting
ParsingData.prototype.printValues = function(){
    var input = this.input;
    var index = this.index;
    //for(var i = 0; i < )


};

};
ParsingData.prototype.calculateValues = function(input, index){
    var pdtType = [];
    pdtType[index] = new ProductType();
    this.instance = pdtType[index];
    this.input = input;
    this.index = index;
    this.setProductName();
    this.setZonalValues();
};
var object ={};
