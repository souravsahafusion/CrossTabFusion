"use strict";
function showCoords(event) {
    //console.log(this);
    var x = event.detail.x % jsonData.chart.width,
        index = -1,
        i,
        check1,
        check2,
        object,
        loopLen,
        value,
        y,
        toolTipRect,
        textElement,
        className;
    x = x - 8;
   

    //for loop might not be the best solution for finding the range
    for (i = 5; i > 0; i--) {
        check1 = storeAncorPointsX.indexOf(x + i);
        check2 = storeAncorPointsX.indexOf(x - i);

        if (check1 !== -1 || check2 !== -1) {
            //index = 0;  //find better way for choosing index
            if (check1 !== -1) {
                index = check1;
                x = x + i;
            }
            if (check2 !== -1) {
                index = check2;
                x = x - i;
            }
            //console.log(index);

        }

    }

    object = chartModel;
    if (index !== -1) {

        textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
        loopLen = object.length;
        for (i = 0; i < loopLen; i++) {

            if (typeof object[i].storeAncorPointsY[index] !== 'undefined') {
                value = object[i].storeValue[index];
                y = object[i].storeAncorPointsY[index];

                var transform = "rotate(0 " + x + "," + y + ")";
                className = "toolTipText";
                textElement = object[i].toolTipTextIns;
                toolTipRect = object[i].toolTipBoxIns;

                //object[i].addText(x, y, value, transform, className, textElement);
                //function call is costly hence avoided
                toolTipRect.setAttributeNS(null, 'x', x + widthEachChart * shiftXTipLine); //for setting the bound offset of the tooltip
                toolTipRect.setAttributeNS(null, 'y', y - heightEachChart * .1);
                toolTipRect.setAttributeNS(null, 'height', heightEachChart * .1);
                toolTipRect.setAttributeNS(null, 'width', widthEachChart * .25);
                toolTipRect.setAttribute("class", "toolTipRect");
                toolTipRect.setAttribute("style", "stroke:rgb(157, 119, 106);fill:rgb(255, 217, 204)");


                object[i].svg.appendChild(toolTipRect);
                toolTipRect.setAttribute("visibility", "visible");

                y = y - heightEachChart * .05;
                textElement.setAttribute("x", x + widthEachChart * .05);
                textElement.setAttribute("y", y);
                textElement.innerHTML = value;
                var fontSize = heightEachChart * .05;
                textElement.setAttribute("font-size", fontSize);
                textElement.setAttribute("transform", transform);
                textElement.setAttribute("style", "rgb(197, 159, 146)");
                object[i].svg.appendChild(textElement);
                textElement.setAttribute("visibility", "visible");
            }


        }
    } else {
        loopLen = object.length;
        for (i = 0; i < loopLen; i++) {

            toolTipRect = object[i].toolTipBoxIns;
            toolTipRect.setAttribute("visibility", "hidden");
            textElement = object[i].toolTipTextIns;
            textElement.setAttribute("visibility", "hidden");

        }

    }


}

function clearcoor(event) {


    var object = chartModel,
        i,
        loopLen,
        toolTipRect,
        textElement;
    loopLen = object.length;    
    for (i = 0; i < loopLen; i++) {

        toolTipRect = object[i].toolTipBoxIns;
        toolTipRect.setAttribute("visibility", "hidden");
        textElement = object[i].toolTipTextIns;
        textElement.setAttribute("visibility", "hidden");


    }
}