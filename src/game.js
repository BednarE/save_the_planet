"use strict";

class Game {

    constructor() {
        this._plastic = 0;
    }

    setPlastic(plasticAmount) {
        this._plastic = plasticAmount;
    };

    getPlastic() {
        return this._plastic;
    };
}

export default Game;