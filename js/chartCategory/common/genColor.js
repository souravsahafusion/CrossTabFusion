function GenColor() {
	
}

 GenColor.prototype.genColor = function(ratio){
    var color1,
        color2;
       if(ratio > 0){
          color1 = jsonData.minProfitColor;
          color2 = jsonData.maxProfitColor; 
       }else{
          color1 = jsonData.minLossColor;
          color2 = jsonData.maxLossColor; 
          //console.log(ratio);
          ratio = ratio * -1;
       }
   color2 = color2.slice(1,color2.length);
   color1 = color1.slice(1,color1.length);
   

   var hex = function(x) {
       x = x.toString(16);
       return (x.length == 1) ? '0' + x : x;
   };

   var r = Math.ceil(parseInt(color1.substring(0,2), 16) * ratio + parseInt(color2.substring(0,2), 16) * (1-ratio));
   var g = Math.ceil(parseInt(color1.substring(2,4), 16) * ratio + parseInt(color2.substring(2,4), 16) * (1-ratio));
   var b = Math.ceil(parseInt(color1.substring(4,6), 16) * ratio + parseInt(color2.substring(4,6), 16) * (1-ratio));

   var middle = hex(r) + hex(g) + hex(b);
   return "#"+middle;
};
