"use strict";

import clickerTemplate from "./clicker.html";
import Collector from "./collector";
import collectorButtonTemplate from "./collectortemplate.html";
import StatisticUtils from "../statistic/statisticutils";


class Clicker {

    constructor(game) {
        this._game = game;
        this.collectors = [
            new Collector("bucket","./../img/bucket.png", 10, "bBucket"),
            new Collector("vacuum cleaner", "./../img/vacuumCleaner.jpg", 100, "bVacuumCleaner"),
            new Collector("ideonella sakariensis", "./../img/IdeonellaSakariensis.jpg", 200, "bIdeonellaSakariensis"),
            new Collector("drone", "./../img/drone.jpg", 250, "bDrone"),
            new Collector("dip net", "./../img/dipNet.jpg", 350, "bDipNet"),
            new Collector("magnetic","./../img/magnetic.jpg", 450, "bMagnetic"),
            new Collector("cat", "./../img/cat.jpg", 550, "bCat"),
            new Collector("net", "./../img/net2.jpg", 700, "bNet2"),
            new Collector("time machine", "./../img/TimeMachine.jpg", 900, "bTimeMachine"),
            new Collector("blackhole", "./../img/blackhole.jpg", 1500, "bBlackhole")
        ];
    }

    incrementClick() {
        this._game.setPlastic(this._game.getPlastic() + this._game.getPlasticPerClick());
        document.getElementById("clicks").innerHTML = this._game.getPlastic();
        this._game.insertClickObjectToClickStorage(StatisticUtils.createClickObject());
    }

    /*Methodenname*/
    showMainpage() {
        /*zieht sich das Element mit der ID Titel und setzt den Text auf main page, Änderung des Titelbilds pro Seite*/
        document.getElementById("title").innerText = "Main Page";
        /*Dom div wird neu erstelllt */
        let newClicker = document.createElement("div");
        /*INhalt des Templates in das Div kopieren*/
        newClicker.innerHTML = clickerTemplate.trim();
        /*Der Clicker wird zum Content hinzugefügt, appendChild nimmt den Inhalt und setzt den Inhalt in den content von index.html
        *Die Zeile:  um es komplett auf die Seite zu bringen*/
        document.getElementById("content").appendChild(newClicker);
        /*Neuer EventListener wird hinzugefügt, document = gesamte Webseite, getElementbyI sucht den PlasticBall raus (steht in der Clicker
        html, addEventListener mit dem Eventtyp "click" also wenn es geklickt wurde, Methode wird mitgegeben, die den Clicker um 1 erhöht
         */
        document.getElementById("clicks").innerHTML=this._game.getPlastic();
        document.getElementById("moneyDisplayed").innerHTML=this._game.getMoney();
        document.getElementById("plasticBall").addEventListener("click", (product) => {
            this.incrementClick();
        });
        for (let collector of this.collectors) {
            /*div Element wird erzeugt*/
            let newCollector = document.createElement("div");
            /*Inhalt des Templates in das DIV kopieren*/
            newCollector.innerHTML = collectorButtonTemplate.trim();
            /*Im collectortemplate Collectorname wird gesetzt im p */
            newCollector.getElementsByClassName("collectorName")[0].innerText = "???";
            newCollector.getElementsByClassName("collectorCounts")[0].innerText = collector.count;
            newCollector.getElementsByClassName("collectorRequiredMoney")[0].innerText = collector.requiredMoney;
            newCollector.getElementsByClassName("collectorbutton")[0].classList.add("qmLockedCollectorButton");





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
                htmlCollector.count = collector.count;
                htmlCollector.requiredMoney = collector.requiredMoney;
                htmlCollector.disabled = false;
                htmlCollector.style.backgroundColor = "white";
                objCollectorButton.classList.add("unlockedCollectorButton");
                htmlCollector.removeAttribute("disabled");


                collector.unlocked = true;
            }
            //gray background and button disabled
            else if (collector.requiredMoney > this._game.getMoney() && collector.unlocked === true) {
                document.getElementById(collector.id).setAttribute("disabled", "disabled");

                //Collector noch nicht freigeschalten
                console.log("TEst2");
                htmlCollector.getElementsByClassName("collectorbutton")[0].classList.add("lockedCollectorButton");

                document.getElementById(collector.name).setAttribute("disabled", "disabled");

            }
            else if ((collector.requiredMoney*0.8) <= this._game.getMoney())
            {
                htmlCollector.getElementsByClassName("collectorName")[0].innerText = collector.name;
            }
            else
            {
                htmlCollector.getElementsByClassName("collectorbutton")[0].classList.add("qmLockedCollectorButton");
            }

        }
    }

    buyCollector(collector)
    {
        console.log("collector");
        this._game.setMoney(this._game.getMoney() - collector.requiredMoney);
        collector.count++;
        collector.requiredMoney = collector.requiredMoney*1.5;

    }
}
export default Clicker;