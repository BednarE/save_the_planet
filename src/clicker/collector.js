"use strict";

class Collector {

    constructor(name, picture, requiredMoney, id, plasticPerSecond) {
        this.name = name;
        this.picture = picture;
        this.requiredMoney = requiredMoney;
        this.id = id;
        this.unlocked = false;
        this.count = 0;
        this.plasticPerSecond = plasticPerSecond;
    }


}
export default Collector;