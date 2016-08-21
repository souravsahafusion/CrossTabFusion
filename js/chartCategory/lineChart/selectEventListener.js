"use strict";
function instantiateDragLine(event) {

    if (flagRemoveColor !== 1) {
        var xC = event.clientX % jsonData.chart.width - 10;
        var yC = event.pageY % jsonData.chart.height - heightEachChart * chartModel[0].yShift - 49;
        

        var rect = this.selectRectIns;
        rect.setAttributeNS(null, 'x', xC);
        rect.setAttributeNS(null, 'y', yC);
        rect.setAttributeNS(null, 'height', 1);
        rect.setAttributeNS(null, 'width', 1);
        rect.setAttribute("class", "selectRect");
        rect.setAttribute("style", "fill:transparent;stroke:rgb(0,0,0)");
        flag = 1;
        

    } else {


        var columnElement = document.getElementsByClassName("ancorTipCicle");
        //console.log(flagRemoveColor + 'flagRemoveColor');
        for (var i = 0; i < columnElement.length; i++) {

            columnElement[i].style.fill = "white";
            columnElement[i].style.stroke = "rgb(30, 122, 205)";

        }
        flagRemoveColor = 0;

    }

}

function dragLineRect(event) {


    if (flag == 1) {
        var rect = this.selectRectIns,
            xC = event.clientX % jsonData.chart.width - 10,
            yC = event.pageY % jsonData.chart.height - heightEachChart * chartModel[0].yShift - 49,
            xBeg = rect.getAttribute("x"),
            yBeg = rect.getAttribute("y"),
            width = Math.abs(xC - xBeg),
            height = Math.abs(yBeg - yC),
            i,
            loopLen,
            columnElement,
            testX,
            testY,
            testR,
            scale = jsonData.scaleColChartFactor / 100;
        flagRemoveColor = 1;
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

        rect.setAttributeNS(null, 'width', width);
        rect.setAttributeNS(null, 'height', height);
        columnElement = document.getElementsByClassName("ancorTipCicle");
        loopLen = columnElement.length;
        for (i = 0; i < loopLen; i++) {
            testX = Math.floor(columnElement[i].getAttribute("cx"));
            testR = columnElement[i].getAttribute("r");

            testX = testX + widthEachChart * scale;
            testY = Math.floor(columnElement[i].getAttribute("cy"));
            



            if (testX <= xC && testX >= xBeg && testY <= yC && testY >= yBeg) {

                columnElement[i].style.fill = "red";
                columnElement[i].style.stroke = "red";

            }

        }



    }
}

function releaseLineRect(event) {
    var rect = this.selectRectIns;

    rect.setAttributeNS(null, 'height', 0);
    rect.setAttributeNS(null, 'width', 0);

    flag = 0;

}


function outLineRect(event) {
    var rect = this.selectRectIns;

    rect.setAttributeNS(null, 'height', 0);
    rect.setAttributeNS(null, 'width', 0);

    flag = 0;


}