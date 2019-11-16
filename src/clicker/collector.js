"use strict";

class Collector {

    constructor(name, picture, requiredMoney, id, plasticPerSecond, index) {
        this.name = name;
        this.picture = picture;
        this.requiredMoney = requiredMoney;
        this.id = id;
        this.unlocked = false;
        this.count = 0;
        this.plasticPerSecond = plasticPerSecond;

        this.index = index;

        this.firstUnlocked = false;

    }

    getPlasticPerSecond() {
        return this.plasticPerSecond;
    }


}
export default Collector;