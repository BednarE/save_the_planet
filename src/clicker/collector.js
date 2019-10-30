"use strict";

class Collector {

    constructor(name, picture, requiredMoney, id) {
        this.name = name;
        this.picture = picture;
        this.requiredMoney = requiredMoney;
        this.id = id;
        this.unlocked = false;
        this.count = 0;
    }


}
export default Collector;