"use strict";

class StatisticUtils {

    static createClickObject(){
        let clickObject = {"date": new Date()}; // clickObject hat ein property(date)
        clickObject.dateString = clickObject.date.toISOString(); // "2019-10-24T19:23:40.427Z"
        clickObject.dateUnix = clickObject.date.getTime(); // 1571945020427
        clickObject.value = 1;
        return clickObject
    }
}
export default StatisticUtils;