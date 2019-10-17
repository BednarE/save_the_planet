"use strict";

import Navigo from "navigo";
import Workshop from "./workshop/workshop";
import Tutorial from "./tutorial/tutorial";
import Statistic from "./statistics/statistics";
import Clicker from "./clicker/clicker";

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
    }

    start() {
        console.log("Start wurde aufgerufen");
        this._router.resolve();
    }

    showWorkshop() {
        console.log("CALLLED")
        new Workshop();
    }

    showTutorial() {
        new Tutorial();
    }

    showStatistic() {
        new Statistic();
    }

    showClicker() {
        console.log("Called");
        new Clicker();
    }

    showError() {
        console.log("Ungültige Route");
    }
}


export default App;