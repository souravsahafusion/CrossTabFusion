function ParsingData() {
    this.instance = '';

}
var jsonData = {};
var widthEachChart = 0;
var heightEachChart = 0;
ParsingData.prototype.findYTipsModified = function(diffTenthPow) {

    var instance = this.instance;

    var minValue = instance.minTipValue;
    var maxValue = instance.maxTipValue;
    var diff = instance.diffBwTips;

    for (i = 0; i < 10; i++) {
        var flag = 0;
        if (((diff / 5) % (Math.pow(10, diffTenthPow))) == 0) {

            instance.noOfYTips = 5;
            flag = 1;
            break;

        } else if (((diff / 3) % (Math.pow(10, diffTenthPow))) == 0) {

            instance.noOfYTips = 3;
            flag = 1;
            break;

        } else if (((diff / 4) % (Math.pow(10, diffTenthPow))) == 0) {

            instance.noOfYTips = 4;
            flag = 1;
            break;

        } else if (((diff / 6) % (Math.pow(10, diffTenthPow))) == 0) {

            instance.noOfYTips = 6;
            flag = 1;
            break;

        } else if (((diff / 7) % (Math.pow(10, diffTenthPow))) == 0) {

            instance.noOfYTips = 7;
            flag = 1;
            break;

        }

        diff = diff + Math.pow(10, diffTenthPow);
    }
    instance.maxTipValue = (instance.maxTipValue + (diff - instance.diffBwTips)) / instance.mulTiplyFactor;
    instance.diffBwTips = diff / instance.mulTiplyFactor;
    instance.minTipValue = instance.minTipValue / instance.mulTiplyFactor;
};
ParsingData.prototype.findRangeModified = function() {

    var instance = this.instance;

    var minValue = instance.min;
    var lastDigit = minValue % 10;
    if (lastDigit < 0) {
        lastDigit = 10 + lastDigit;
    }

    minValue = minValue - lastDigit;
    var maxValue = instance.max;
    var lastDigit = maxValue % 10;

    if (lastDigit < 0) {
        lastDigit = 10 - lastDigit;
    }
    if (lastDigit !== 0) {

        maxValue = maxValue + (10 - lastDigit) * Math.pow(-1, instance.changeFactorMax);

    }

    var diffBwTips = (maxValue - minValue); // difference negative for negative values
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

    var remMinValue = minValue % (Math.pow(10, diffTenthPow));
    instance.minTipValue = minValue - remMinValue * Math.pow(-1, instance.changeFactorMin);
    var remMaxValue = maxValue % (Math.pow(10, diffTenthPow));

    if (remMaxValue !== 0) {

        instance.maxTipValue = maxValue + ((Math.pow(10, diffTenthPow)) - remMaxValue) * Math.pow(-1, instance.changeFactorMax);

    } else {
        instance.maxTipValue = maxValue;
    }

    instance.diffBwTips = instance.maxTipValue - instance.minTipValue;
    this.findYTipsModified(diffTenthPow);
};
ParsingData.prototype.checkingForNegative = function() {

    var instance = this.instance;

    if (instance.min < 0) { //checking for negative values of min and max
        instance.changeFactorMin++; // 1 if only the min is negative

    }
    if (instance.max < 0) {
        instance.changeFactorMax++;
    }

};
ParsingData.prototype.positionValues = function() {
    var instance = this.instance;

    var min = instance.min;
    var max = instance.max;
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
ParsingData.prototype.scaleValues = function() {

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
ParsingData.prototype.findMax = function(tempMap) {

    var maximum = 0; // need to change to first data value instead of zero
    var i = 0;
    var productChoose = jsonData.productChoose;
    /*if (typeof maximum == 'undefined') {

        while (true) {
            i++;
            maximum = jsonData.data[i][tempMap];
            if (typeof maximum !== 'undefined') {
                console.log(maximum + 'initial minimum value');
                break;
            }

        }
    }*/

    for (var i = 0; i < jsonData.data.length; i++) {
        if (jsonData.data[i].product == productChoose && jsonData.data[i].zone == tempMap) {
            //need to change the zone to selectType because zone is specific
            if (jsonData.data[i].sos > maximum) {
                maximum = jsonData.data[i].sos;
            }

        }

    }
    return maximum;

};
ParsingData.prototype.findMonth = function(index) {

    var chart_map = jsonData.chart_map;
    var date = jsonData.data[index][chart_map];
    dateObject = new Date(date);
    //console.log(jsonData.month[index]);
    if (dateObject.toString() === "Invalid Date") {
        jsonData.month[index] = jsonData.data[index][chart_map];
        return index;
    } else {
        return dateObject.getMonth();
    }
};
ParsingData.prototype.setZone = function() {
    var value;
    for (var i = 0; i < jsonData.data.length; i++) {
        value = jsonData.data[i].zone;
        if (jsonData.y_axis_map.indexOf(value) < 0) {
            jsonData.y_axis_map.push(value);
        }
    }
    jsonData.y_axis_map.sort();
};
ParsingData.prototype.setKeys = function() {
    var noOfDatas = jsonData.data.length;

    if (jsonData.y_axis_map.length < 1) {
        var arr = [];
        for (var i = 0; i < noOfDatas; i++) {
            arr[i] = Object.keys(jsonData.data[i]);
        }
        for (var i = 0; i < noOfDatas; i++) {
            for (var j = 0; j < arr[i].length - 1; j++) {
                var value = arr[i][j];
                if (jsonData.y_axis_map.indexOf(value) < 0) {
                    jsonData.y_axis_map.push(arr[i][j]);
                }

            }

        }

    }

};
ParsingData.prototype.setXAxisTicksLabel = function() {

    var productChoose = jsonData.productChoose;
    var selectType = jsonData.chartSelect;
    var value;
    for (var i = 0; i < jsonData.data.length; i++) {
        //setting value to the jsonDataect
        //var monthValue = this.findMonth(i);
        //will return month index if date is provided else return the index       
        value = jsonData.data[i].productType;
        if (jsonData.data[i].product == productChoose) {
            //need to change the zone to selectType because zone is specific
            if (jsonData.month.indexOf(value) < 0)
                jsonData.month.push(value);
        }


    }

};
ParsingData.prototype.calculateChartOutLines = function(input) {


    jsonData = input;

    widthEachChart = jsonData.chart.width - (jsonData.chart.width * .5); //kept global
    heightEachChart = jsonData.chart.height * 0.65; //kept global
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var chartWidth = jsonData.chart.width;
    var chartHeight = jsonData.chart.height;
    numberOfColCharts = Math.floor(windowWidth / chartWidth);

};

ParsingData.prototype.findMinAndSetDataValue = function(tempMap) {
    var instance = this.instance;
    var productChoose = jsonData.productChoose;
    var selectType = jsonData.chartSelect;


    var minimum = 0 /*jsonData.data[0][tempMap]*/ ; //would not work for negative values
    var i = 0;
    /*if (typeof minimum == 'undefined') {

        while (true) {
            i++;
            minimum = jsonData.data[i][tempMap];
            if (typeof minimum !== 'undefined') {
                break;
            }

        }
    }*/
    instance.tempMap = tempMap;
    
    for (var i = 0, count = 0; i < jsonData.data.length; i++) {
        //setting value to the jsonDataect
        //var monthValue = this.findMonth(i);
        //will return month index if date is provided else return the index       
        if (jsonData.data[i].product == productChoose && jsonData.data[i].zone == tempMap) {
            //need to change the zone to selectType because zone is specific
            //jsonData.month[count] = jsonData.data[i].productType;
            instance.storeValue[count] = jsonData.data[i].sos; //need to provide index of sos instead of key
            //console.log(jsonData.xAxisTicksLabel[count]); 
            count++;

        }


    }
    return minimum;

};
ParsingData.prototype.setChartValues = function(tempMap, i) {

    chartModel[i] = new ChartModel();
    this.instance = chartModel[i];
    this.setXAxisTicksLabel();
    chartModel[i].min = this.findMinAndSetDataValue(tempMap);
    chartModel[i].max = this.findMax(tempMap);
    this.positionValues();
    this.findRangeModified();

    return this.instance;


};

ParsingData.prototype.customChartArrange = function() {


    for (var i = 0; i < jsonData.y_axis_map.length; i++) {
        var tempMap = jsonData.y_axis_map[i];
        //console.log(tempMap+ 'first step');

        range2[i] = new ChartModel();
        this.instance = range2[i];
        range2[i].min = this.findMinAndSetDataValue(tempMap);
        //console.log(range[i].min + 'minimum calculated from different data values');
        range2[i].max = this.findMax(tempMap, i);
    }

};
var numberOfColCharts = 0;
var chartModel = [];
var range2 = [];