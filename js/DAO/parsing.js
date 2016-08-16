"use strict";
function ParsingData(){
    this.instance = '';
    this.input = '';
    this.index = 0;
    this.pdts = [];
    this.pdtsIns = [];

} 
function findRangeModified(instance) {

    //var instance = this.instance;
    var minValue = 0;
    var maxValue;
    var lastDigit;
    if(jsonData.minYTickValue === true && typeof instance !== 'undefined'){
    minValue = instance.min;
    lastDigit = minValue % 10;
    if (lastDigit < 0) {
        lastDigit = 10 + lastDigit;
    }

    minValue = minValue - lastDigit;
    maxValue = instance.max;
    }
    
    maxValue = maximum;
    lastDigit = maxValue % 10;

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
}
function findYTipsModified(diffTenthPow) {

    //var instance = this.instance;

    var minValue = 0;
    var maxValue = maximum;
    var diff = diffBwTips;

    for (var i = 0; i < 10; i++) {
        var flag = 0;
        if (((diff / 5) % (Math.pow(10, diffTenthPow))) === 0) {

            noOfYTips = 5;
            flag = 1;
            break;

        } else if (((diff / 3) % (Math.pow(10, diffTenthPow))) === 0) {

            noOfYTips = 3;
            flag = 1;
            break;

        } else if (((diff / 4) % (Math.pow(10, diffTenthPow))) === 0) {

            noOfYTips = 4;
            flag = 1;
            break;

        } else if (((diff / 6) % (Math.pow(10, diffTenthPow))) === 0) {

            noOfYTips = 6;
            flag = 1;
            break;

        } else if (((diff / 7) % (Math.pow(10, diffTenthPow))) === 0) {

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
}

ParsingData.prototype.setZoneAndProduct = function(){
   var value;
   var pdts = [];
   
   
    
 for(var i = 0; i < jsonData.data.length; i++){
    //console.log(object.data[i].values.length);
    
        value = jsonData.data[i].zone;
        if(jsonData.zone_map.indexOf(value) < 0){
            jsonData.zone_map.push(value);


            //console.log(value);
        }
        value = jsonData.data[i].product;

        if(pdts.indexOf(value) < 0){
            pdts.push(value);
            this.pdts = pdts;

        }


 }
jsonData.zone_map.sort(); 
this.pdts.sort();

};
ParsingData.prototype.setProductTypes = function(){
var indexProduct;
var indexZone;
var productName;
var sosVal;
var sopVal;
var indexProductType;
var productType;
for(var i = 0; i < jsonData.data.length; i++){
      
    indexProduct = this.pdts.indexOf(jsonData.data[i].product);
    //console.log(jsonData.data[i]["product"]);
    indexZone = jsonData.zone_map.indexOf(jsonData.data[i].zone);
    productType = jsonData.data[i].productType;
    //console.log(productType);
    if(this.pdtsIns[indexProduct].productTypes.indexOf(productType) < 0){
        this.pdtsIns[indexProduct].productTypes.push(productType);
        //console.log(this.pdtsIns[indexProduct].productIns[indexZone].productName[1]+'productName');
    }
    sosVal = jsonData.data[i].sos;
    sopVal = jsonData.data[i].sop;
    indexProductType = this.pdtsIns[indexProduct].productTypes.indexOf(productType);
    this.pdtsIns[indexProduct].productIns[indexZone].sos[indexProductType] = sosVal;
    this.pdtsIns[indexProduct].productIns[indexZone].sop[indexProductType] = sopVal;

    if(sosVal > maximum){
        maximum = sosVal;
    }
    //console.log(this.pdtsIns[indexProduct].productIns[indexZone].sop[indexProductType]);


}
//this.pdtsIns[indexProduct].productTypes.sort();

    

};
ParsingData.prototype.setValues = function(input){
 //var instance = this.instance;
 jsonData =  input;
 var range = [];
 
 this.setZoneAndProduct();
 var productLen = this.pdts.length;
 
 var pdtsIns;
 
 for(var i = 0; i < productLen; i++){
    
    //creating a object of the model ProductType for each product viz. coffee, tea
    
    this.pdtsIns[i] = new ProductType();
    pdtsIns = this.pdtsIns[i];
    pdtsIns.model = this.pdts[i];
    range[i] = pdtsIns;

    for(var j = 0; j < jsonData.zone_map.length; j++){
        //creating a object of the model ProductType for each zone viz. west, east
        
        pdtsIns.productIns[j] = new ProductType();
    }

 }
 //console.log(pdtIns.productIns);

 this.setProductTypes();

return range;
};

var jsonData ={};
var maximum = 0;

var diffBwTips = 0;
var noOfYTips = 0;