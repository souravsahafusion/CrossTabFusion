"use strict";
function arrangeOnMin() {
    var minValueArray = [],
        i,
        loopLen,
        min,
        j,
        y_map_tmp,
        tmp,
        object;
    
    object = range2;
    loopLen = jsonData.y_axis_map.length;
    for (i = 0; i < loopLen; i++) {
        minValueArray.push(object[i].min);

    }
    loopLen = minValueArray.length;

    for (i = 0; i < loopLen - 1; i++) { //Number of passes
        min = i; //min holds the current minimum number position for each pass; i holds the Initial min number
        for (j = i + 1; j < loopLen; j++) { //Note that j = i + 1 as we only need to go through unsorted array
            if (minValueArray[j] < minValueArray[min]) { //Compare the numbers
                min = j; //Change the current min number position if a smaller num is found
            }
        }
        if (min != i) { //After each pass, if the current min num != initial min num, exchange the position.
            //Swap the numbers
            y_map_tmp = jsonData.y_axis_map[i];
            tmp = minValueArray[i];
            jsonData.y_axis_map[i] = jsonData.y_axis_map[min];
            minValueArray[i] = minValueArray[min];
            jsonData.y_axis_map[min] = y_map_tmp;
            minValueArray[min] = tmp;
        }
    }

    


}