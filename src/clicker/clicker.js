"use strict";

import StatisticUtils from "../statistic/statisticutils";

class Clicker {

    constructor(game) {
        this._game = game;
    }

    incrementClick() {
        this._game.addClick();
        let animationDiv = document.createElement("div");
        animationDiv.classList.add("animationPerClick");
        this.randomPosition(animationDiv);
        animationDiv.innerHTML = "+" + this._game.getPlasticPerClick();
        document.getElementById("imageCont").appendChild(animationDiv);
        this._game.setPlastic(this._game.getPlastic() + this._game.getPlasticPerClick());
        document.getElementById("plasticDisplay").innerHTML = this._game.getPlastic();
        this._game.insertClickObjectToShortTermClickStorage(StatisticUtils.createClickObject(1));
        setTimeout(function () {
            animationDiv.remove();
        }, 2000);
    };


    /*Methodenname*/
    async showMainpage() {
        let clickerTemplate = await import('./clicker.html');
        let collectorButtonTemplate = await import('./collectortemplate.html');

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
        document.getElementById("plasticDisplay").innerHTML = this._game.getPlastic();
        document.getElementById("moneyDisplayed").innerHTML = this._game.getMoney();
        document.getElementById("plasticPerSecondDisplayed").innerHTML = this._game.getPlasticPerSecond();

        document.getElementById("displayGameData").classList.add("col-md-5");
        document.getElementById("imageCont").classList.add("col-md-5");
        document.getElementById("collectorList").classList.add("col-md-6");

        document.getElementById("plasticBall").addEventListener("click", (product) => {
            this.incrementClick();
        });
        for (let collector of this._game.collectors) {
            /*div Element wird erzeugt*/
            let newCollector = document.createElement("div");
            /*Inhalt des Templates in das DIV kopieren*/
            newCollector.innerHTML = collectorButtonTemplate.trim();
            /*Im collectortemplate Collectorname wird gesetzt im p */
            newCollector.getElementsByClassName("collectorName")[0].innerText = "???";
            newCollector.getElementsByClassName("collectorCounts")[0].innerText = collector.count;
            newCollector.getElementsByClassName("collectorRequiredMoney")[0].innerText = collector.requiredMoney;
            /*Die Id vom div wird auf die Id vom neuen Collector gesetzt, um das newCollector.div im Nachhinein noch verändern zu können */
            newCollector.id = collector.id; //Set the id of the button
            /*Neuer Collector wird an die Collectorliste gehängt*/
            document.getElementById("collectorList").appendChild(newCollector);
            /*EventListener dem Collectorbutton hinzufügen, Collector wird nach Click gekauft*/
            newCollector.getElementsByClassName("collectorbutton")[0].addEventListener("click", (mouseEvent) => {
                this.buyCollector(collector);
            });
            newCollector.getElementsByClassName("collectorbutton")[0].addEventListener("mouseover", (mouseEvent) => {
                this.showCollectorText(collector);
            });
        }

        setInterval(() => {
            this.checkCollectorUnlock(this._game.collectors);
        }, 800);


    };

    checkCollectorUnlock(collectorList) {
        for (let collector of collectorList) {
            //enable button
            let htmlCollector = document.getElementById(collector.id);

            if (htmlCollector == null) {
                return;
            }
            let objCollectorButton = htmlCollector.getElementsByClassName("collectorbutton")[0];
            if (collector.requiredMoney <= this._game.getMoney()) {
                /*html Collector = dom Element der der Liste hinzugefügt wurde*/
                objCollectorButton.classList.remove("qmLockedCollectorButton");
                objCollectorButton.classList.remove("lockedCollectorButton");
                htmlCollector.count = collector.count;
                htmlCollector.requiredMoney = collector.requiredMoney;
                htmlCollector.disabled = false;
                objCollectorButton.classList.add("unlockedCollectorButton");
                htmlCollector.removeAttribute("disabled");

            }
            //gray background and button disabled
            else if (collector.requiredMoney > this._game.getMoney() && collector.unlocked === true) {

                //Collector noch nicht freigeschalten
                htmlCollector.getElementsByClassName("collectorbutton")[0].classList.add("lockedCollectorButton");

            } else if ((collector.requiredMoney * 0.8) <= this._game.getMoney() && collector.unlocked === false) {
                //Collector aufdecken, wenn 80% vom benötigten Geld erreicht wurden
                htmlCollector.getElementsByClassName("collectorName")[0].innerText = collector.name;
                htmlCollector.getElementsByClassName("collectorPicture")[0].src = collector.picture;
                collector.unlocked = true;
            } else {
                //Collector noch nicht freigeschalten -> Questionmark picture
                htmlCollector.getElementsByClassName("collectorbutton")[0].classList.add("qmLockedCollectorButton");
            }

        }
    }


    buyCollector(collector) {
        if (collector.requiredMoney <= this._game.getMoney()) {

            this._game.setMoney(this._game.getMoney() - collector.requiredMoney);
            this._game.setPlasticPerSecond(this._game.getPlasticPerSecond() + collector.getPlasticPerSecond());
            document.getElementById("moneyDisplayed").innerHTML = this._game.getMoney();
            collector.count = collector.count + 1;
            collector.requiredMoney = Math.round(collector.requiredMoney * 1.5);
            document.getElementById(collector.id).getElementsByClassName("collectorCounts")[0].innerText = collector.count;
            document.getElementById(collector.id).getElementsByClassName("collectorRequiredMoney")[0].innerText = collector.requiredMoney;
            document.getElementById("plasticPerSecondDisplayed").innerHTML = this._game.getPlasticPerSecond();

        }
    }

    showCollectorText(collector) {
        document.getElementById(collector.id).getElementsByClassName("collectorbutton")[0].title = "Cost: " + collector.requiredMoney + ". " +
            "\n" + "Each " + collector.name + " produces " + collector.plasticPerSecond + ". " +
            "\n" + collector.count + " " + collector.name + " producing " + (collector.plasticPerSecond * collector.count) + ". ";
    }


    randomPosition(animationDiv) {
        // animation für obendrüber
        animationDiv.style.left = document.getElementById("imageCont").style.left + (250 * Math.random()) + "px";
        animationDiv.style.top = document.getElementById("imageCont").style.top- (75 * Math.random()) + "px";
        //animation für darunter
       // animationDiv.style.left = document.getElementById("imageCont").style.left + (200 * Math.random()) + "px";
       // animationDiv.style.top = (document.getElementById("imageCont").style.top+25)+(10 * Math.random()) + "px";
    }
}

export default Clicker;