"use strict";

class Game {

    constructor() {
        this._plastic = 0;
        this._money = 0;
    }

    setPlastic(plasticAmount) {
        this._plastic = plasticAmount;
    };

    getPlastic() {
        return this._plastic;
    };
    getMoney() {
        return this._money;
    }
    setMoney(money) {
        this._money = money;
    }

}

export default Game;