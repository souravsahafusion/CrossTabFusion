"use strict";
function PlotGraph(instance) {

    this.instance = instance;


}
PlotGraph.prototype.createSVG = function(widthSVG, heightSVG) {
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        //var chartNo = this.chartNo;
        svg.setAttribute("height", heightSVG) ;
        svg.setAttribute("width", widthSVG);
        var chartId = document.getElementById("chart");
        svg.setAttribute("class", "chartSVG");
        //console.log(this.svg[index]);
        chartId.appendChild(svg);
        return svg;

    };
    
PlotGraph.prototype.drawLine = function(svg, x1, y1, x2, y2, style, className, visibility, strokedasharray) {
    
    var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("class", className);
    line.setAttribute("stroke-dasharray", strokedasharray);
    line.setAttribute("style", style);
    if (typeof visibility !== 'undefined') {
        line.setAttribute("visibility", "hidden");

    }
    //console.log(instance.svg);
    svg.appendChild(line);

};
//svg, x, y, height, width, className, style,styleColor
PlotGraph.prototype.drawRectangleSep = function(svg, x, y, height, width, className, style) {
    var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttributeNS(null, 'x', x);
    rect.setAttributeNS(null, 'y', y);
    rect.setAttributeNS(null, 'height', height);
    rect.setAttributeNS(null, 'width', width);
    rect.setAttribute("class", className);
    rect.setAttribute("style", style);
    svg.appendChild(rect);
    return rect;


};
PlotGraph.prototype.drawRectangle = function(svg, x, y, height, width, className, style, styleColor) {
    var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttributeNS(null, 'x', x);
    rect.setAttributeNS(null, 'y', y);
    rect.setAttributeNS(null, 'height', height);
    rect.setAttributeNS(null, 'width', width);
    rect.setAttribute("class", className);
    if(typeof styleColor !== 'undefined'){
        rect.setAttribute("fill", styleColor);
        rect.setAttribute("stroke", styleColor);
    }else{
        rect.setAttribute("style", style);
    }
    
    
    svg.appendChild(rect);
    return rect;


};
PlotGraph.prototype.plotTipCirle = function(xPointPlot, yPointPlot, className) {
    var circleTip = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circleTip.setAttribute("cx", xPointPlot); // setting circle 
    
    circleTip.setAttribute("cy", yPointPlot); // coordinates
    circleTip.setAttribute("r", 5);
    circleTip.setAttribute("class", "ancorTipCicle");
    style = "stroke:blue; stroke-width:2;fill:white;";
    circleTip.setAttribute("style", style);
    this.instance.svg.appendChild(circleTip);

};
PlotGraph.prototype.addText = function(x, y, textValue, transform, className, textElement, fontSize, style) {

    if (typeof textElement == 'undefined') {
        textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");

    }

    textElement.setAttribute("x", x);
    textElement.setAttribute("y", y);
    textElement.innerHTML = textValue;
    //var fontSize  = heightEachChart * .04;
    textElement.setAttribute("font-size", fontSize);
    textElement.setAttribute("transform", transform);
    textElement.setAttribute("style", style);
    this.instance.svg.appendChild(textElement);

};
PlotGraph.prototype.chartDivLabelX = function(textValue, x, y, check) {

    var textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
    var x = x - (widthEachChart / 70);
    var y = y + (heightEachChart / 40);

    var transform = '';
    
    if (check !== 2) {
        y = y - 20;
        transform = "rotate(0 " + x + "," + y + ")";

    } else {
        transform = "rotate(90 " + x + "," + y + ")";
    }
    
    var className = "chartDivLabelX";
    var fontSize = heightEachChart * .05;
   
    this.addText(x, y, textValue, transform, className, textElement, fontSize);
    

};
PlotGraph.prototype.chartDivLabelY = function(y, index) {
    var instance = this.instance;
    var textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
    var x = widthEachChart / 16;
    var y = y;
    var fontSize = widthEachChart * .04;
    var textValue = instance.maxTipValue - (instance.diffBwTips * index / instance.noOfYTips);
    if (instance.mulTiplyFactor == 10000) {
        textValue = parseFloat(textValue).toFixed(3);
    } else if (instance.mulTiplyFactor == 100) {
        textValue = parseFloat(textValue).toFixed(1);
    }
    
    var className = "chartDivLabelY";
    var transform = "rotate(0 " + x + "," + y + ")"; // not required only given to match the order, need to remove it
    this.addText(x, y, textValue, transform, className, textElement, fontSize);
   

};