"use strict";

class StatisticUtils {

    static createClickObject(value){
        let clickObject = {"date": new Date()}; // clickObject hat ein property(date)
        clickObject.dateString = clickObject.date.toISOString(); // "2019-10-24T19:23:40.427Z"
        clickObject.dateUnix = clickObject.date.getTime(); // 1571945020427
        clickObject.value = value;
        return clickObject
    }

    static createPlasticObject(value){
        let plasticObject = {"date": new Date()};
        plasticObject.dateString = plasticObject.date.toISOString();
        plasticObject.dateUnix = plasticObject.date.getTime();
        plasticObject.value = value;
        return plasticObject
    }
}
export default StatisticUtils;