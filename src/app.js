"use strict";

import Navigo from "navigo";
import Workshop from "./workshop/workshop";
import Tutorial from "./tutorial/tutorial";
import Statistic from "./statistic/statistic";
import Clicker from "./clicker/clicker";
import Game from "./game";
import Swal from "sweetalert2";

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
                }
            }
        );
        //Try to load any existing gamesave
        let saveName = JSON.parse(localStorage.getItem("defaultSaveName"));
        if (saveName === undefined || saveName === null || saveName === "") {
            //First time playing!
            saveName = "defaultGame";
            localStorage.setItem("defaultSaveName", JSON.stringify(saveName));
            let saveNames = [saveName];
            localStorage.setItem("saveNames", JSON.stringify(saveNames));
        }
        let data = JSON.parse(localStorage.getItem(saveName));
        this._game = new Game(data);


        document.getElementById("optionsButton").addEventListener("click", () => {
            this.fillOptions();
        });

        //start the auto-save loop
        setInterval(()=> {
            let defaultSaveGameName = JSON.parse(localStorage.getItem("defaultSaveName"));
            this._game._lastSaved = new Date().getTime();
            localStorage.setItem(defaultSaveGameName, JSON.stringify(this._game));
            console.log("Saved to " + defaultSaveGameName)
            document.getElementById("savedInfo").classList.remove("hidden");
            setTimeout(() => {
                document.getElementById("savedInfo").classList.add("hidden");
            }, 2000);
        }, 10000); //Alle 10 Sekunden
    }

    start() {
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

    async fillOptions() {
        document.getElementById("storedSaves").innerHTML = "";
        let template = await import("./saveSelectionTemplate");

        let defaultSaveName = JSON.parse(localStorage.getItem("defaultSaveName"));
        if (defaultSaveName === null || defaultSaveName === "") {
            defaultSaveName = "defaultGame"
        }

        let saveNames = JSON.parse(localStorage.getItem("saveNames"));
        if (saveNames === null) {
            //Started for the first time
            saveNames = [];
            saveNames.push("defaultGame")
        }

        for (let saveName of saveNames) {
            let saveDiv = document.createElement("div");
            saveDiv.innerHTML = template.trim();
            document.getElementById("storedSaves").appendChild(
                saveDiv
            );
            saveDiv.getElementsByClassName("saveName")[0].innerText = saveName;
            let data = JSON.parse(localStorage.getItem(saveName));
            if (data === null) {
                data = this._game;
            }
            saveDiv.getElementsByClassName("startedGame")[0].innerText = data._appStart;
            if (saveName === defaultSaveName) {
                saveDiv.getElementsByClassName("isAutoSave")[0].innerText = "Ja";
            } else {
                saveDiv.getElementsByClassName("isAutoSave")[0].innerText = "Nein";
            }
            if (data._lastSaved === null) {
                saveDiv.getElementsByClassName("lastSaved")[0].innerText = " Noch nie!";
            } else {
                saveDiv.getElementsByClassName("lastSaved")[0].innerText = new Date(data._lastSaved).toLocaleDateString() + " um " + new Date(data._lastSaved).toLocaleTimeString();
            }
            saveDiv.getElementsByClassName("deleteSaveGame")[0].addEventListener("click", () => {
                if (saveName === defaultSaveName) {
                    Swal.fire("Fehler", "Der Auto-Speicherort kann nicht entfernt werden!", "error");
                    return;
                }
                //Remove the right item
                for( let i = 0; i < saveNames.length; i++){
                    if ( saveNames[i] === saveName) {
                        saveNames.splice(i, 1);
                    }
                }
                localStorage.setItem("saveNames", JSON.stringify(saveNames));
                localStorage.removeItem(saveName);
                this.fillOptions();
            });
            saveDiv.getElementsByClassName("setToAutoSave")[0].addEventListener("click", () => {
                localStorage.setItem("defaultSaveName", JSON.stringify(saveName));
                this.fillOptions();
            })
        }

        document.getElementById("newSaveGame").addEventListener("click", () => {
            let saveName = document.getElementById("newSaveGameName").value;
            console.log(saveName);
            if (saveName === "" || (saveNames.indexOf(saveName)>-1)) {
                Swal.fire("Fehler", "Bitte gib einen gültigen Namen ein, der noch nicht vorhanden ist", "error");
            } else {
                saveNames.push(saveName);
                localStorage.setItem("saveNames", JSON.stringify(saveNames));
                localStorage.setItem(saveName, JSON.stringify(this._game));
                this.fillOptions();
                Swal.fire("Gespeichert", "Aktuelles Spiel unter dem Namen " + saveName + " gespeichert.", "success");
            }
        })


    }
}


export default App;