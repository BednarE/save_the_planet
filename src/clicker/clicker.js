"use strict";
import ClickerTemplate from "./clicker.html";

class Clicker {

    constructor(game) {
        this._game = game;
        document.getElementById("title").innerText = "Main Page";

        document.getElementById("content").innerHTML = ClickerTemplate.trim();
        document.getElementById("clickerButton").addEventListener("click", (product) => {
            this.incrementClick();
        });
    }

    incrementClick() {
        this._game.setPlastic(this._game.getPlastic()+1);

        document.getElementById("clicks").innerHTML = this._game.getPlastic();
    };


}

export default Clicker;