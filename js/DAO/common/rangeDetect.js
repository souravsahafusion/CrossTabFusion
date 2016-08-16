function RangeDetect(){
	this.instance = instance;
}
RangeDetect.prototype.findYTipsModified = function(diffTenthPow) {

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
RangeDetect.prototype.findRangeModified = function() {

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