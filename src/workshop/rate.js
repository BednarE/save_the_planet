"use strict";

class Rate {

    constructor(used_amount, updateInterval, baseRate, currentRate){
        this.used_amount=used_amount;
        this.updateInterval=updateInterval;
        this.baseRate=baseRate;
        this.currentRate=currentRate;
    }

    get(currentRate){
        if(true){ // Timesclicked > 100
            currentRate=this.baseRate*((Math.random()+1)*10);
        }
        else{
            currentRate=this.baseRate*(Math.random()*10);
        }
        this.update(currentRate);
        return this.currentRate;
    }

    update(currentRate){

    }
}