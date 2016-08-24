"use strict";
function CalValues() {
    this.instance = '';

}
var jsonData = {};                                    //global scope need to change after adding IIFE
var widthEachChart = 0;
var heightEachChart = 0;
/**   
  * checked with by diving by the number of tick values with the difference in range
    that can beautify the number in each range
  * Math.pow(10, diffTenthPow) 
  * modulus 10 for difference 100, modulus 100 for difference 1000 likewise
  * loop continued for 10 times and in each time the respective Math.pow(10, diffTenthPow)
  * for small difference of range 3 to less multiplyFactor is preset else it is 1
  * multiplyFactor is -1  for negative values
  * (diff - instance.diffBwTips) is > 1 when some number is added to beautify the range
*/
CalValues.prototype.findYTipsModified = function(diffTenthPow) { //detecting the number of ticks for each chart

    var instance = this.instance,
        minValue = instance.minTipValue,
        maxValue = instance.maxTipValue,
        diff = instance.diffBwTips,
        i,
        flag,
        mulTiplyFactor = instance.mulTiplyFactor;
    //console.log(diff+ 'first');
    for (i = 0; i < 10; i++) {
        flag = 0;
        if (((diff / 5) % (Math.pow(10, diffTenthPow))) === 0) {

            instance.noOfYTips = 5;
            flag = 1;
            break;

        } else if (((diff / 3) % (Math.pow(10, diffTenthPow))) === 0) {

            instance.noOfYTips = 3;
            flag = 1;
            break;

        } else if (((diff / 4) % (Math.pow(10, diffTenthPow))) === 0) {

            instance.noOfYTips = 4;
            flag = 1;
            break;

        } else if (((diff / 6) % (Math.pow(10, diffTenthPow))) === 0) {

            instance.noOfYTips = 6;
            flag = 1;
            break;

        } else if (((diff / 7) % (Math.pow(10, diffTenthPow))) === 0) {

            instance.noOfYTips = 7;
            flag = 1;
            break;

        }

        diff = diff + Math.pow(10, diffTenthPow);
    }
    
    //might need a little change in logic

    instance.maxTipValue = (maxValue + (diff - instance.diffBwTips)) / mulTiplyFactor;

    instance.diffBwTips = diff / mulTiplyFactor;
    instance.minTipValue = minValue / mulTiplyFactor;
};
/**
  * calculating the unit digit for the min value
  * detect maximum value is negative or not
 */

CalValues.prototype.findRangeModified = function() {

    var instance = this.instance,
        minValue = instance.min,
        lastDigit = minValue % 10,                  // calculating the unit digit for the min value
        maxValue = instance.max,
        changeFactorMax = instance.changeFactorMax, // detect maximum value is negative or not
        diffBwTips,
        padding,
        diffTenthPow,
        remMinValue,
        remMaxValue;

    if (lastDigit < 0) {                           // for negative values unit digit is added  
        lastDigit = 10 + lastDigit;
    }

    minValue = minValue - lastDigit;
  
    lastDigit = maxValue % 10;

    if (lastDigit < 0) {
        lastDigit = 10 - lastDigit;
    }
    if (lastDigit !== 0) {                        // checking for the range values within 10

        maxValue = maxValue + (10 - lastDigit) * Math.pow(-1, changeFactorMax);

    }

    diffBwTips = (maxValue - minValue); // difference negative for negative values
    padding = diffBwTips / 10;
    diffTenthPow = 0;

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

    remMinValue = minValue % (Math.pow(10, diffTenthPow));
    instance.minTipValue = minValue - remMinValue * Math.pow(-1, instance.changeFactorMin);
    remMaxValue = maxValue % (Math.pow(10, diffTenthPow));

    if (remMaxValue !== 0) {

        instance.maxTipValue = maxValue + ((Math.pow(10, diffTenthPow)) - remMaxValue) * Math.pow(-1, instance.changeFactorMax);

    } else {
        instance.maxTipValue = maxValue;
    }

    instance.diffBwTips = instance.maxTipValue - instance.minTipValue;
    this.findYTipsModified(diffTenthPow);
};
CalValues.prototype.checkingForNegative = function() {

    var instance = this.instance;

    if (instance.min < 0) { //checking for negative values of min and max
        instance.changeFactorMin++; // 1 if only the min is negative

    }
    if (instance.max < 0) {
        instance.changeFactorMax++;
    }

};
CalValues.prototype.positionValues = function() {
    var instance = this.instance,
        min = instance.min,
        max = instance.max;
 
    if ((max - min) < 0.1) {
        // checking decimal values for four digit precision
        instance.mulTiplyFactor = 10000;
        this.scaleValues();


    } else if ((max - min) <= 2) {
        //checking decimal values for two digit precision
        instance.mulTiplyFactor = 100;
        this.scaleValues();


    } else if ((max - min) < 10) {

        instance.mulTiplyFactor = 10;
        this.scaleValues();


    } else {

        this.scaleValues();

    }
};
CalValues.prototype.scaleValues = function() {

    var instance = this.instance;

    instance.min = instance.min * instance.mulTiplyFactor;
    instance.max = instance.max * instance.mulTiplyFactor;
    this.checkingForNegative();
    if (instance.changeFactorMin == 1) {
        instance.min = Math.ceil(instance.min);
    } else {
        instance.min = Math.floor(instance.min);
    }

    if (instance.changeFactorMax == 1) {
        instance.max = Math.floor(instance.max);
    } else {
        instance.max = Math.ceil(instance.max);
    }
};
CalValues.prototype.findMax = function(tempMap) {

    var maximum = jsonData.data[0][tempMap],
        i;
        
    if (typeof maximum == 'undefined') {
        i = 0;
        while (true) {
            i++;
            maximum = jsonData.data[i][tempMap];
            if (typeof maximum !== 'undefined') {
                break;
            }

        }
    }

    for ( i = 0; i < jsonData.data.length; i++) {
        if (jsonData.data[i][tempMap] > maximum) {
            maximum = jsonData.data[i][tempMap];

        }
    }
    return maximum;

};
CalValues.prototype.findMonth = function(index) {

    var chart_map = jsonData.chart_map,
        date = jsonData.data[index][chart_map],
        dateObject = new Date(date);
    if (dateObject.toString() === "Invalid Date") {
        jsonData.month[index] = jsonData.data[index][chart_map];
        return index;
    } else {
        return dateObject.getMonth();
    }


};
CalValues.prototype.setZone = function() {
    var value,
        i;
    for ( i = 0; i < jsonData.data.length; i++) {
        value = jsonData.data[i].zone;
        if (jsonData.y_axis_map.indexOf(value) < 0) {
            jsonData.y_axis_map.push(value);
        }
    }
    jsonData.y_axis_map.sort();
};
CalValues.prototype.setKeys = function() {
    var noOfDatas = jsonData.data.length,
        arr = [],
        i,
        j,
        value;

    if (jsonData.y_axis_map.length < 1) {
       
        for ( i = 0; i < noOfDatas; i++) {
            arr[i] = Object.keys(jsonData.data[i]);

        }
        for ( i = 0; i < noOfDatas; i++) {
            for (j = 0; j < arr[i].length - 1; j++) {
                value = arr[i][j];
                if (jsonData.y_axis_map.indexOf(value) < 0) {
                    jsonData.y_axis_map.push(arr[i][j]);

                }

            }

        }

    }

};
CalValues.prototype.calculateChartOutLines = function(input) {
    var windowWidth = window.innerWidth,
        windowHeight = window.innerHeight,
        chartWidth = input.chart.width,
        chartHeight = input.chart.height;


    jsonData = input;

    widthEachChart = jsonData.chart.width - (jsonData.chart.width * 0.5); //kept global
    heightEachChart = jsonData.chart.height * 0.65; //kept global


   
    numberOfColCharts = Math.floor(windowWidth / chartWidth);

};
CalValues.prototype.SetDataValueCrossTab = function(tempMap) {
    var instance = this.instance,
        minimum = jsonData.data[0][tempMap],
        monthValue,
        i = 0;
    
    if (typeof minimum == 'undefined') {
        while (true) {
            i++;
            minimum = jsonData.data[i][tempMap];
            if (typeof minimum !== 'undefined') {
                break;
            }

        }
    }
    instance.tempMap = tempMap;

    for ( i = 0; i < jsonData.data.length; i++) {
        //setting value to the jsonDataect
        monthValue = this.findMonth(i);
        //will return month index if date is provided else return the index       

        instance.storeValue[monthValue] = jsonData.data[i][tempMap];
        if (jsonData.data[i][tempMap] < minimum) {
            minimum = jsonData.data[i][tempMap];

        }
    }
    return minimum;

};
CalValues.prototype.findMinAndSetDataValue = function(tempMap) {
    var instance = this.instance,
        minimum = jsonData.data[0][tempMap],
        monthValue,
        i;
    
    if (typeof minimum == 'undefined') {
         i = 0;
        while (true) {
            i++;
            minimum = jsonData.data[i][tempMap];
            if (typeof minimum !== 'undefined') {
                break;
            }

        }
    }
    instance.tempMap = tempMap;

    for ( i = 0; i < jsonData.data.length; i++) {
        //setting value to the jsonDataect
        monthValue = this.findMonth(i);
        //will return month index if date is provided else return the index       

        instance.storeValue[monthValue] = jsonData.data[i][tempMap];
        if (jsonData.data[i][tempMap] < minimum) {
            minimum = jsonData.data[i][tempMap];

        }
    }
    return minimum;

};
CalValues.prototype.setChartValues = function(tempMap, i) {

    chartModel[i] = new ChartModel();
    this.instance = chartModel[i];
    chartModel[i].min = this.findMinAndSetDataValue(tempMap);
    chartModel[i].max = this.findMax(tempMap);
    this.positionValues();
    this.findRangeModified();

    return this.instance;


};

CalValues.prototype.customChartArrange = function() {
    var i;

    for ( i = 0; i < jsonData.y_axis_map.length; i++) {
        var tempMap = jsonData.y_axis_map[i];
        range2[i] = new ChartModel();
        this.instance = range2[i];
        range2[i].min = this.findMinAndSetDataValue(tempMap);
        range2[i].max = this.findMax(tempMap, i);
    }

};
var numberOfColCharts = 0;
var chartModel = [];
var range2 = [];