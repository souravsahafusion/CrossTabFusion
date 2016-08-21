function releaseColRect(event) {
    var rect = this.selectRectIns;

    rect.setAttributeNS(null, 'height', 0);
    rect.setAttributeNS(null, 'width', 0);

    flag = 0;


};

function dragColRect(event) {
    if (flag == 1) {
        var rect = this.selectRectIns,
            xC = event.clientX % jsonData.chart.width - 10,
            //need to shorten YC value
            yC = event.pageY % jsonData.chart.height - heightEachChart * chartModel[0].yShift - 47,
            xBeg = rect.getAttribute("x"),
            yBeg = rect.getAttribute("y"),
            width = Math.abs(xC - xBeg),
            height = Math.abs(yBeg - yC),
            i,
            loopLen,
            testX,
            testY,
            columnElement;



        /*if(xBeg < x){
            rect.setAttributeNS(null, 'x', xC );
            rect.setAttributeNS(null, 'y', yC );
        }*/
        /*if((xC - xPrev) < 0){
            rect.setAttributeNS(null, 'x', xC );
        }
        if((yc - yPrev) < 0){
            rect.setAttributeNS(null, 'y', yC );
        }   */
        flagRemoveColor = 1;

        rect.setAttributeNS(null, 'width', width);
        rect.setAttributeNS(null, 'height', height);
        columnElement = document.getElementsByClassName("plotColumnGraph");
        //console.log(columnElement);
        loopLen = columnElement.length;
        for (i = 0; i < loopLen; i++) {
            testX = Math.floor(columnElement[i].getAttribute("x"));
            //console.log(testX + testX);
            testX = testX + widthEachChart * jsonData.scaleColChartFactor / 100;
            testY = Math.floor(columnElement[i].getAttribute("y"));
            if (testX <= xC && testX >= xBeg && testY <= yC && testY >= yBeg) {
                //console.log(x);
                columnElement[i].style.fill = "red";
                columnElement[i].style.stroke = "red";

            }

        }
    }
};




function instantiateDragCol(event) {
    if (flagRemoveColor !== 1) {
        var xC = event.clientX % jsonData.chart.width - 10,
            yC = event.pageY % jsonData.chart.height - heightEachChart * chartModel[0].yShift - 47,
            rect = this.selectRectIns;
        rect.setAttributeNS(null, 'x', xC);
        rect.setAttributeNS(null, 'y', yC);
        rect.setAttributeNS(null, 'height', 1);
        rect.setAttributeNS(null, 'width', 1);
        rect.setAttribute("class", "selectRect");
        rect.setAttribute("style", "fill:transparent;stroke:rgb(0,0,0)");
        flag = 1;

        //console.log(parameter);
        //this.svg.appendChild(rect);
    } else {

        var columnElement = document.getElementsByClassName("plotColumnGraph"),
            i,
            loopLen = columnElement.length;
        for (i = 0; i < loopLen; i++) {

            columnElement[i].style.fill = "rgb(30, 122, 205)";
            columnElement[i].style.stroke = "rgb(30, 122, 205)";

        }
        flagRemoveColor = 0;

    }




};