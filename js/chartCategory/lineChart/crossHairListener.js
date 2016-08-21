"use strict";
function displayCrossHair(event) {
    var x = event.detail.x % jsonData.chart.width,
        i,
        loopLen,
        lineElement;
    x = x - 8;
    lineElement = document.getElementsByClassName("drawCrossHairLines");
    loopLen = lineElement.length;
    for (i = 0; i < loopLen; i++) {
        lineElement[i].setAttribute("visibility", "visible");
        //console.log(x + 'crossHairLine');
        lineElement[i].setAttribute("x1", x);
        lineElement[i].setAttribute("x2", x);

    }
}

function removeCrossHair(event) {
    var lineElement = document.getElementsByClassName("drawCrossHairLines"),
         i,
         loopLen = lineElement.length;
    for (i = 0; i < loopLen; i++) {
        lineElement[i].setAttribute("visibility", "hidden");

    }
}