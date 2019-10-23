"use strict";

import clickerTemplate from "./clicker.html";

class Clicker {

    constructor(game) {
        this._game = game;
    }

    incrementClick() {
        this._game.setPlastic(this._game.getPlastic()+1);
        document.getElementById("clicks").innerHTML = this._game.getPlastic();
    };

    showMainpage() {
        document.getElementById("title").innerText = "Main Page";
        let newProduct = document.createElement("div");
        newProduct.innerHTML = clickerTemplate.trim();
        document.getElementById("content").appendChild(newProduct);
        document.getElementById("plasticBall").addEventListener("click", (product) => {
            this.incrementClick();
        });

        //let bBucket = document.getElementById("bBucket");
        //bBucket.setAttribute("g", "l");
        let bVacuumCleaner = document.getElementById("bVacuumCleaner");
        let bIdeonella = document.getElementById("bIdeonella");
        let bDrone = document.getElementById("bDrone");
        let bDipNet= document.getElementById("bDipNet");
        let bMagnetic = document.getElementById("bMagnetic");
        let bCat = document.getElementById("bCat");
        let bNet2 = document.getElementById("bNet2");
        let bTimeMachine = document.getElementById("bTimeMachine");
        let bBlackhole = document.getElementById("bBlackhole");
        let clicks;
        let cookieclicker;

        clicks = 1000;
        let pictures = [
            {
                picture: "bucket.png",
                requiredClicks: 10,
                id: "bBucket"
            },
            {
                picture: "vacuumCleaner.jpg",
                requiredClicks: 100,
                id: "bVacuumCleaner"
            },
            {
                picture: "IdeonellaSakariensis.jpg",
                requiredClicks: 100,
                id: "bIdeonellaSakariensis"
            },
            {
                picture: "drone.jpg",
                requiredClicks: 100,
                id: "bDrone"
            },
            {
                picture: "dipNet.jpg",
                requiredClicks: 100,
                id: "bDipNet"
            },
            {
                picture: "magnetic.png",
                requiredClicks: 100,
                id: "bMagnetic"
            },
            {
                picture: "cat.jpg",
                requiredClicks: 100,
                id: "bCat"
            },
            {
                picture: "net2.jpg",
                requiredClicks: 100,
                id: "bNet2"
            },
            {
                pictrue: "timeMachine.jpg",
                requiredClicks: 100,
                id: "bTimeMachine"
            },
            {
                picture: "blackhole.jpg",
                requiredClicks: 100,
                id: "bBlackhole"
            }
        ];


        let sideBucket = "questionmark.png";



        setInterval(() => {
            this.checkCollectorUnlock(pictures);
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
        for (let picture of collectorList) {
            //enable button
            if (picture.requiredClicks <= this._game.getPlastic()) {
                document.getElementById(picture.id).removeAttribute("disabled");
                document.getElementById(picture.id).src = "./../img/" + picture.picture;
                document.getElementById(picture.id).disabled = false;
                document.getElementById(picture.id).style.backgroundColor = "white";
            }
            //gray background and button disabled
            else if (picture.requiredClicks > this._game.getPlastic() && document.getElementById(picture.id).disabled === false) {
                document.getElementById(picture.id).setAttribute("disabled", "disabled");

                //bBucket.disabled = true;
                document.getElementById(picture.id).style.backgroundColor = "#585858";
            }
            //show questionmark picture
            else {
                //Nächste Zeile nur zu Testzwecken
                document.getElementById(picture.id).style.backgroundColor = "#585858";
            }

        }
    }
}
export default Clicker;