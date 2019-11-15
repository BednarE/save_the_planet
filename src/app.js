"use strict";

import Navigo from "navigo";
import Workshop from "./workshop/workshop";
import Tutorial from "./tutorial/tutorial";
import Statistic from "./statistic/statistic";
import Clicker from "./clicker/clicker";
import Game from "./game";

class App {

    constructor() {
        this._router = new Navigo("http://localhost:1234/", false);
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
        this._router.updatePageLinks();
    }

    async showWorkshop() {
        this._router.updatePageLinks();
        document.getElementById("content").innerHTML = "";
        let workshop = new Workshop(this._game);
        await workshop.showProducts();
    }

    async showTutorial() {
        this._router.updatePageLinks();
        document.getElementById("content").innerHTML = "";
        let tutorial = new Tutorial();
        await tutorial.showContent();
    }

    async showStatistic() {
        this._router.updatePageLinks();
        document.getElementById("content").innerHTML = "";
        let statistics = new Statistic(this._game);
        await statistics.showContent();
    }

    async showClicker() {
        this._router.updatePageLinks();
        document.getElementById("content").innerHTML = "";

        let clicker = new Clicker(this._game);
        await clicker.showMainpage();
    }

    showError() {
        this._router.navigate('main', false);
    }
}


export default App;