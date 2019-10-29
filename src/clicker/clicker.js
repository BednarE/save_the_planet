"use strict";

import clickerTemplate from "./clicker.html";
import collectortemplate from "./collectortemplate.html";
import Collector from "./Collector";
import StatisticUtils from "../statistic/statisticutils";

class Clicker {

    constructor(game) {
        this._game = game;
        this.collectors = [
            new Collector("bucket","./../img/bucket.png", 10, "bBucket"),
            new Collector("vacuum cleaner", "./../img/vacuumCleaner.jpg", 100, "bVacuumCleaner"),
            new Collector("IdeonellaSakariensis", "./../img/IdeonellaSakariensis.jpg", 100, "bIdeonellaSakariensis"),
            new Collector("drone", "./../img/drone.jpg", 100, "bDrone"),
            new Collector("dip net", "./../img/dipNet.jpg", 100, "bDipNet"),
            new Collector("magnetic","./../img/magnetic.jpg", 100, "bMagnetic"),
            new Collector("cat", "./../img/cat.jpg", 100, "bCat"),
            new Collector("net", "./../img/net2.jpg", 100, "bNet2"),
            new Collector("time machine", "./../img/TimeMachine.jpg", 100, "bTimeMachine"),
            new Collector("blackhole", "./../img/blackhole.jpg", 100, "bBlackhole")
        ];
    }

    incrementClick() {
        this._game.setPlastic(this._game.getPlastic()+1);
        /*Für Testzwecke erhöhung Money*/
        this._game.setMoney(this._game.getMoney()+1);
        document.getElementById("clicks").innerHTML = this._game.getPlastic();
        this._game.insertClickObjectToClickStorage(StatisticUtils.createClickObject(1));
    };

    /*Methodenname*/
    showMainpage() {
        /*zieht sich das Element mit der ID Titel und setzt den Text auf main page, Änderung des Titelbilds pro Seite*/
        document.getElementById("title").innerText = "Main Page";
        /*Dom div wird neu erstelllt */
        let newClicker = document.createElement("div");
        /*INhalt des Templates in das Div kopieren*/
        newClicker.innerHTML = clickerTemplate.trim();
        /*Der Clicker wird zum Content hinzugefügt, appendChild nimmt den Inhalt und setzt den Inhalt in den contect von index.html
        *Die Zeile:  um es komplett auf die Seite zu bringen*/
        document.getElementById("content").appendChild(newClicker);
        /*Neuer EventListener wird hinzugefügt, document = gesamte Webseite, getElementbyI sucht den PlasticBall raus (steht in der Clicker
        html, addEventListener mit dem Eventtyp "click" also wenn es geklickt wurde, Methode wird mitgegeben, die den Clicker um 1 erhöht
         */
        document.getElementById("plasticBall").addEventListener("click", (product) => {
            this.incrementClick();
        });
        for (let collector of this.collectors) {
            /*div Element wird erzeugt*/
            let newCollector = document.createElement("div");
            /*Inhalt des Templates in das DIV kopieren*/
            newCollector.innerHTML = collectortemplate.trim();
            /*Im collectortemplate Collectorname wird gesetzt im p */
             newCollector.getElementsByClassName("collectorName")[0].innerText = collector.name;

/*Die Id vom div wird auf die Id vom neuen Collector gesetzt, um das newCollector.div im Nachhinein noch verändern zu können */
            newCollector.id = collector.id; //Set the id of the button
            /*Neuer Collector wird an die Collectorliste gehängt*/
            document.getElementById("collectorList").appendChild(newCollector);
            /*EventListener dem Collectorbutton hinzufügen, Collector wird nach Click gekauft*/
            newCollector.getElementsByClassName("collectorbutton")[0].addEventListener("click", (mouseEvent) => {
                this.buyCollector(collector);
            });
        }

        setInterval(() => {
            this.checkCollectorUnlock(this.collectors);
        }, 100);


        /*providing Upgrades, after quantity of clicks*/


        /*providing Upgrades, after quantity of clicks for Buckets*/

        /*
        if (clicks >= requiredClicksForBucket)

        {
            document.getElementById('button').style.disabled="true";
        }

        if(clicks < requiredClicksForBucket)
        {
            document.getElementById('button').style.disabled="false";
        }

        /*providing Upgrades, after quantity of clicks for IdeonellaSakariensis*/
        /*
        let requiredClicksForIdeonellaSakariensis;

        if (clicks >= requiredClicksForIdeonellaSakariensis)
        {
            document.getElementById('button').style.disabled="true";
        }
        if(clicks < requiredClicksForIdeonellaSakariensis)
        {
            document.getElementById('button').style.disabled="false";
        }

        */

    };

    checkCollectorUnlock(collectorList) {
        for (let collector of collectorList) {
            //enable button
            let htmlCollector = document.getElementById(collector.id);

            if(htmlCollector == null)
            {
                return;
            }
            let objCollectorButton = htmlCollector.getElementsByClassName("collectorbutton")[0];
            if (collector.requiredMoney <= this._game.getMoney()) {
                /*html Collector = dom Element der der Liste hinzugefügt wurde*/
                objCollectorButton.classList.remove("qmLockedCollectorButton");
                objCollectorButton.classList.remove("lockedCollectorButton");
                /*Bilder setzen*/
                htmlCollector.picture = "./../img/" + collector.picture;
                htmlCollector.disabled = false;
                htmlCollector.style.backgroundColor = "white";
                objCollectorButton.classList.add("unlockedCollectorButton");
                htmlCollector.removeAttribute("disabled");

                collector.unlocked = true;
            }
            //gray background and button disabled
            else if (collector.requiredMoney > this._game.getMoney() && collector.unlocked === true) {
                document.getElementById(collector.id).setAttribute("disabled", "disabled");

                //bBucket.disabled = true;
                objCollectorButton.classList.remove("unlockedCollectorButton");
                objCollectorButton.classList.add("lockedCollectorButton");

            }
            //show questionmark picture
            else {
                //Collector noch nicht freigeschalten
                htmlCollector.getElementsByClassName("collectorbutton")[0].classList.add("qmLockedCollectorButton");
            }

        }
    }

    buyCollector(collector)
    {
        console.log("collector");
        this._game.setMoney(this._game.getMoney() - collector.requiredMoney )

    }
}
export default Clicker;