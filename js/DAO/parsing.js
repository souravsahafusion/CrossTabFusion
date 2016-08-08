function ParsingData(){
	this.instance = '';
    this.input = '';
    this.index = 0;

} 
function findRangeModified() {

    //var instance = this.instance;

    var minValue = 0/*instance.min*/;
    /*var lastDigit = minValue % 10;
    if (lastDigit < 0) {
        lastDigit = 10 + lastDigit;
    }

    minValue = minValue - lastDigit;*/
    var maxValue = maximum;
    var lastDigit = maxValue % 10;

    if (lastDigit < 0) {
        lastDigit = 10 - lastDigit;
    }
    if (lastDigit !== 0) {

        maxValue = maxValue + (10 - lastDigit) /** Math.pow(-1, instance.changeFactorMax)*/;

    }

    diffBwTips = (maxValue - minValue); // difference negative for negative values
    var padding = diffBwTips / 10;
    var diffTenthPow = 0;

    while (true) {
        if (Math.pow(10, diffTenthPow) < padding) {

            diffTenthPow++;

        } else {
            diffTenthPow--;
            break;
        }
    }

    if (padding < 10) {
        diffTenthPow = 1;
    } else if (padding < 1) {
        diffTenthPow = 0;
    }

    //var remMinValue = minValue % (Math.pow(10, diffTenthPow));
    //instance.minTipValue = 0/*minValue - remMinValue * Math.pow(-1, instance.changeFactorMin)*/;
    var remMaxValue = maxValue % (Math.pow(10, diffTenthPow));

    if (remMaxValue !== 0) {

        maximum = maxValue + ((Math.pow(10, diffTenthPow)) - remMaxValue)/* * Math.pow(-1, instance.changeFactorMax)*/;

    } else {
        maximum = maxValue;
    }

    diffBwTips = maximum - minValue;
    findYTipsModified(diffTenthPow);
};
function findYTipsModified(diffTenthPow) {

    var instance = this.instance;

    var minValue = 0;
    var maxValue = maximum;
    var diff = diffBwTips;

    for (var i = 0; i < 10; i++) {
        var flag = 0;
        if (((diff / 5) % (Math.pow(10, diffTenthPow))) == 0) {

            noOfYTips = 5;
            flag = 1;
            break;

        } else if (((diff / 3) % (Math.pow(10, diffTenthPow))) == 0) {

            noOfYTips = 3;
            flag = 1;
            break;

        } else if (((diff / 4) % (Math.pow(10, diffTenthPow))) == 0) {

            noOfYTips = 4;
            flag = 1;
            break;

        } else if (((diff / 6) % (Math.pow(10, diffTenthPow))) == 0) {

            noOfYTips = 6;
            flag = 1;
            break;

        } else if (((diff / 7) % (Math.pow(10, diffTenthPow))) == 0) {

            noOfYTips = 7;
            flag = 1;
            break;

        }

        diff = diff + Math.pow(10, diffTenthPow);
    }
    maximum = (maximum + (diff - diffBwTips)) /*/ instance.mulTiplyFactor*/;
    diffBwTips = diff /*/ instance.mulTiplyFactor*/;
    //instance.minTipValue = instance.minTipValue /*/ instance.mulTiplyFactor*/;
    //console.log(maximum + 'maximum' + diffBwTips + 'diffBwTips' + noOfYTips);
};
ParsingData.prototype.setZonalValues = function(){
    var input = this.input;
    var index =this.index;
    var instance = this.instance;
    //var maximum = this.maxTipValue;
    for(var i = 0; i < input.zone_map.length; i++){

        var product = new ProductType();
        instance.productIns[i] = product;
        var objectZone = input.zone_map[i];
        
        //console.log(zoneDataSet);
        
        for(var j = 0; j < object.data[index].values.length; j++){ //extra loop running
            if(object.data[index].values[j] !== undefined){ // to recover the error
            var zoneDataSet = object.data[index].values[j].zone;
        }

            if( objectZone == zoneDataSet){
                //console.log(zoneDataSet);
                for(var k = 0; k < instance.productTypes.length; k++){
                    for(var l = 0; l < object.data[index].values[j].productValues.length; l++){
                        var productTypeValue = object.data[index].values[j].productValues[l].product;
                        if(instance.productTypes[k] == productTypeValue){
                            instance.productIns[i].sos[k] = object.data[index].values[j].productValues[l].sos;
                            instance.productIns[i].sosTotal = instance.productIns[i].sosTotal + instance.productIns[i].sos[k];
                            if(maximum <= instance.productIns[i].sosTotal){
                                maximum = instance.productIns[i].sosTotal;
                            }
                            instance.productIns[i].sop[k] = object.data[index].values[j].productValues[l].sop;
                            instance.productIns[i].sopTotal = instance.productIns[i].sopTotal + instance.productIns[i].sop[k];
                            instance.productIns[i].productName[k] = productTypeValue;  //reduntant it's already stored
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
/*ParsingData.prototype.printValues = function(){
    var input = this.input;
    var index = this.index;
    var instance = this.instance;
    for(var i = 0; i < input.zone_map.length; i++){ 
        for(var j = 0; j < instance.productTypes.length; j++){
            if(instance.productIns[i].sos[j] == NaN || instance.productIns[i].sos[j] == undefined){
                instance.productIns[i].sos[j] = 0;
            }
            console.log(instance.productIns[i].sos[j] + instance.productIns[i].productName[j]+ ' '+instance.model+ ' '+input.zone_map[i]);
        }
        
    }


};*/

};
ParsingData.prototype.calculateValues = function(input, index){
    var pdtType = [];
    pdtType[index] = new ProductType();
    this.instance = pdtType[index];
    this.input = input;
    this.index = index;
    this.setProductName();
    this.setZonalValues();
    //this.printValues();
    //return this.instance;
};
var object ={};
var maximum = 0;

var diffBwTips = 0;
var noOfYTips = 0;