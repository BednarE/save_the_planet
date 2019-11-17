"use strict";

import Navigo from "navigo";
import Workshop from "./workshop/workshop";
import Tutorial from "./tutorial/tutorial";
import Statistic from "./statistic/statistic";
import Clicker from "./clicker/clicker";
import Game from "./game";
import Swal from "sweetalert2";

const confirmationDialog = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
});

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
        let saveName = this.getDefaultSaveName();
        let data = JSON.parse(localStorage.getItem(saveName));
        this._game = new Game(data);


        document.getElementById("optionsButton").addEventListener("click", () => {
            this.fillOptions();
        });

        //start the auto-save loop
        this.startAutoSaveInterval();
    }

    start() {
        this._router.resolve();
        this._router.updatePageLinks();
    }

    startAutoSaveInterval() {
        window.autoSaveInterval = setInterval(()=> {
            let defaultSaveGameName = this.getDefaultSaveName();
            this.saveGame(defaultSaveGameName);
        }, this._game._autoSaveInterval); //Jede Minute
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
        this._router.navigate('tutorial', false);
    }

    getDefaultSaveName() {
        let saveName = JSON.parse(localStorage.getItem("defaultSaveName"));
        if (saveName === undefined || saveName === null || saveName === "") {
            //First time playing!
            saveName = "defaultGame";
            localStorage.setItem("defaultSaveName", JSON.stringify(saveName));
            let saveNames = [saveName];
            localStorage.setItem("saveNames", JSON.stringify(saveNames));
        }
        return saveName;
    }

    saveGame(saveName) {
        this._game._lastSaved = new Date().getTime();
        localStorage.setItem(saveName, JSON.stringify(this._game));
        //Check that the save name is inside the saveNames list
        let saveNames = JSON.parse(localStorage.getItem("saveNames"));
        if (saveNames.indexOf(saveName) === -1) {
            //It is not! --> Add it to the save Name list
            saveNames.push(saveName);
            localStorage.setItem("saveNames", JSON.stringify(saveNames));
        }

        console.log("Saved to " + saveName);
        document.getElementById("savedInfo").classList.remove("hidden");
        setTimeout(() => {
            document.getElementById("savedInfo").classList.add("hidden");
        }, 3000);

        if (document.getElementById("newSaveGame") !== undefined) {
            //We have the options open
            this.fillOptions();
        }
    }

    getSaveNames() {
        let saveNames = JSON.parse(localStorage.getItem("saveNames"));
        if (saveNames === null) {
            //Started for the first time
            saveNames = [];
            saveNames.push("defaultGame")
        }
        return saveNames;
    }

    async fillOptions() {
        document.getElementById("storedSaves").innerHTML = "";
        let template = await import("./saveSelectionTemplate");

        let defaultSaveName = JSON.parse(localStorage.getItem("defaultSaveName"));
        if (defaultSaveName === null || defaultSaveName === "") {
            defaultSaveName = "defaultGame"
        }

        let saveNames = this.getSaveNames();

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

            saveDiv.getElementsByClassName("save")[0].addEventListener("click", () => {
                this.saveGame(saveName);
                Swal.fire("Spiel gespeichert", "Spiel unter dem Namen " + saveName + " gespeichert.", "success");
            });

            saveDiv.getElementsByClassName("loadSave")[0].addEventListener("click", () => {
                this.fireConfirmationDialog("Den Spielstand '" + saveName + "' wirklich laden? Ungespeicherter Fortschritt geht verloren!",
                    () => {
                        this.resetAllIntervals();
                        this._game = new Game(data);
                        localStorage.setItem("defaultSaveName", JSON.stringify(saveName));
                        console.log("Loaded savegame " + saveName);
                        Swal.fire("Spiel geladen", "Spielstand " + saveName + " wurde geladen. Auto-Save speichert nun auf diesem Spielstand", "info");
                        this._router.navigate('tutorial', false);
                        this.fillOptions();
                    });
            });

            saveDiv.getElementsByClassName("deleteSaveGame")[0].addEventListener("click", () => {
                this.fireConfirmationDialog("Den Spielstand '" + saveName + "' wirklich löschen?",
                    () => this.deleteSave(saveName));
            });

            saveDiv.getElementsByClassName("setToAutoSave")[0].addEventListener("click", () => {
                localStorage.setItem("defaultSaveName", JSON.stringify(saveName));
                this.fillOptions();
            })
        }

        document.getElementById("autoSaveInterval").value = (this._game._autoSaveInterval / 1000);
        document.getElementById("autoSaveInterval").addEventListener("input", ()=> {
            let autoSaveInterval = document.getElementById("autoSaveInterval").value;
            if(autoSaveInterval !="") {
                autoSaveInterval = parseInt(autoSaveInterval);
                if (autoSaveInterval < 10) {
                    autoSaveInterval = 10; //Minimum ist alle 10 Sekunden
                }
                this._game._autoSaveInterval = (autoSaveInterval *1000);
            } else {
                this._game._autoSaveInterval = (60 * 1000);
            }
            //Restart the interval with the new timeout
            clearInterval(window.autoSaveInterval);
            this.startAutoSaveInterval();
            document.getElementById("autoSaveInterval").value = (this._game._autoSaveInterval / 1000);
        });

        document.getElementById("newSaveGame").addEventListener("click", () => {
            let saveName = document.getElementById("newSaveGameName").value;
            if (saveName === "" || (saveNames.indexOf(saveName)>-1)) {
                Swal.fire("Fehler", "Bitte gib einen gültigen Namen ein, der noch nicht vorhanden ist", "error");
            } else {
                this.fireConfirmationDialog("Sicher ein neues Spiel beginnen? Ungespeicherter Fortschritt geht verloren!",
                    () => this.createNewGameAndSave(saveName));
            }
        })
    }

    deleteSave(saveName) {
        let saveNames = this.getSaveNames();
        for( let i = 0; i < saveNames.length; i++){
            if ( saveNames[i] === saveName) {
                saveNames.splice(i, 1);
            }
        }
        localStorage.setItem("saveNames", JSON.stringify(saveNames));
        localStorage.removeItem(saveName);
        this.fillOptions();
    }

    createNewGameAndSave(saveName) {
        clearInterval(window.autoSaveInterval);
        this.resetAllIntervals();
        this._game = new Game();
        localStorage.setItem("defaultSaveName", JSON.stringify(saveName));
        this.saveGame(saveName);
        Swal.fire("Gespeichert", "Neues Spiel mit dem Namen " + saveName + " erstellt. Auto-Save speichert nun hier", "success");
        this._router.navigate('tutorial', false);
        this.startAutoSaveInterval();
    }

    resetAllIntervals() {
        // Set a fake timeout to get the highest timeout id
        var highestTimeoutId = setTimeout(";");
        for (var i = 0 ; i < highestTimeoutId ; i++) {
            console.log("clearing timeout with id:", i);
            clearTimeout(i);
        }
    }

    fireConfirmationDialog(text, callback) {
        confirmationDialog.fire({
            title: 'Sicher?',
            text: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ja',
            cancelButtonText: 'Nein'
        }).then((result) => {
            if (result.value) {
                callback();
            }
        })
    }
}


export default App;