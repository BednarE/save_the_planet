"use strict";

class Rate {

    constructor(used_amount, updateInterval, baseRate, currentRate){
        this.used_amount=used_amount;
        this.updateInterval=updateInterval;
        this.baseRate=baseRate;
        this.currentRate=currentRate;
    }

    getCurrentRate(){
        if(true){ // Timesclicked > 100
            this.currentRate=this.baseRate*((Math.random()+1)*10);
        }
        else{
            this.currentRate=this.baseRate*(Math.random()*10);
        }
        return this.currentRate;
    }

    update(){
        this.getCurrentRate();
    }
}