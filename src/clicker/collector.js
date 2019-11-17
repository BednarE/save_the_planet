"use strict";

class Collector {

    constructor(name, picture, requiredMoney, id, plasticPerSecond, index, count, unlocked, firstUnlocked) {
        this.name = name;
        this.picture = picture;
        this.requiredMoney = requiredMoney;
        this.id = id;
        this.unlocked = unlocked;
        this.count = count;
        this.plasticPerSecond = plasticPerSecond;

        this.index = index;

        this.firstUnlocked = firstUnlocked;

    }

    getPlasticPerSecond() {
        return this.plasticPerSecond;
    }


}
export default Collector;