function columnTrigger(event) {
    var x = event.detail.x % jsonData.chart.width,
        index = -1,
        posScale,
        i,
        object,
        value,
        columnElement,
        loopLen,
        test,
        scale,
        y,
        textElement,
        toolTipRect;
    x = x - 8;
    
    
    posScale = jsonData.scaleColChartFactor / 100 * widthEachChart;

    for (i = posScale; i > 0; i--) {
        storeAncorPointsX.indexOf(x + i);

        if (storeAncorPointsX.indexOf(x + i) !== -1 || storeAncorPointsX.indexOf(x - i) !== -1) {
            //index = 0;  //find better way for choosing index
            if (storeAncorPointsX.indexOf(x + i) !== -1) {
                index = storeAncorPointsX.indexOf(x + i);
                x = x + i;
            }
            if (storeAncorPointsX.indexOf(x - i) !== -1) {
                index = storeAncorPointsX.indexOf(x - i);
                x = x - i;
            }
        }

    }

    object = chartModel;
    value = 0;

    scale = jsonData.scaleColChartFactor;
    if (index !== -1) {
        columnElement = document.getElementsByClassName("plotColumnGraph");
        loopLen = columnElement.length;
        for (i = 0; i < loopLen; i++) {
            test = Math.floor(columnElement[i].getAttribute("x"));
            test = test + widthEachChart * scale / 100;

            if (test == x) {
                //console.log(x);
                columnElement[i].style.fill = "red";
                columnElement[i].style.stroke = "red";

            }

        }
        loopLen = jsonData.y_axis_map.length;

        for (i = 0; i < loopLen; i++) {
            //for(var j = 0; j < jsonData.data.length; j++){
            if (typeof object[i].storeAncorPointsY[index] !== 'undefined') {

                value = object[i].storeValue[index];
                y = object[i].storeAncorPointsY[index];
                var transform = "rotate(0 " + x + "," + y + ")";
                var className = "toolTipText";
                textElement = object[i].toolTipTextIns;
                toolTipRect = object[i].toolTipBoxIns;

                //object[i].addText(x, y, value, transform, className, textElement);
                //function call is costly hence avoided
                toolTipRect.setAttributeNS(null, 'x', x + widthEachChart * shiftXTipLine);
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
        

    }



};



function removeToolTip(event) {
    var object = chartModel,
        columnElement = document.getElementsByClassName("plotColumnGraph"),
        i,
        loopLen = columnElement.length,
        toolTipRect,
        textElement;
    if (flagRemoveColor !== 1) {
        for (i = 0; i < loopLen; i++) {

            columnElement[i].style.fill = "rgb(30, 122, 205)";
            columnElement[i].style.stroke = "rgb(30, 122, 205)";

        }
    }
    loopLen = object.length;
    for (i = 0; i < loopLen; i++) {
        //console.log("removed");
        toolTipRect = object[i].toolTipBoxIns;
        toolTipRect.setAttribute("visibility", "hidden");
        textElement = object[i].toolTipTextIns;
        textElement.setAttribute("visibility", "hidden");


    }



};