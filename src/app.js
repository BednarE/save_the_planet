"use strict";

import Navigo from "navigo";
import Workshop from "./workshop/workshop";
import Tutorial from "./tutorial/tutorial";
import Statistic from "./statistic/statistic";
import Clicker from "./clicker/clicker";
import Game from "./game";

class App {

    constructor() {
        this._router = new Navigo(null, true);
        this._currentUrl = "";
        this._router.on({
            "main": () => this.showClicker(),
            "workshop": () => this.showWorkshop(),
            "tutorial" : () => this.showTutorial(),
            "statistic": () => this.showStatistic(),
            "*": () => this.showError()
        });
        this._router.hooks({
                after: (params) => {
                    // Navigation durchführen, daher die neue URL merken
                    this._currentUrl = this._router.lastRouteResolved().url;
                    console.log(this._currentUrl);
                }
            }
        );
        this._game = new Game();
    }

    start() {
        console.log("Start wurde aufgerufen");
        this._router.resolve();
    }

    showWorkshop() {
        document.getElementById("content").innerHTML = "";
        new Workshop(this._game);
    }

    showTutorial() {
        document.getElementById("content").innerHTML = "";
        new Tutorial();
    }

    showStatistic() {
        document.getElementById("content").innerHTML = "";
        new Statistic();
    }

    showClicker() {
        document.getElementById("content").innerHTML = "";

        let clicker = new Clicker(this._game);
        clicker.showMainpage();
    }

    showError() {
        this._router.navigate('main', false);
    }
}


export default App;