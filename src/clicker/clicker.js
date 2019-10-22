"use strict";

class Clicker {

    constructor() {
        document.getElementById("title").innerText = "Main Page";
        this.showMainpage();
    }

    showMainpage() {
        let test1 = document.getElementById("test1");
        test1.setAttribute("disabled", "disabled");
        let bBucket = document.getElementById("bBucket");
        bBucket.setAttribute("disabled", "disabled");
        /*let bVacuumCleaner = document.getElementById(elementId: "bVacuumCleaner");
        let bIdeonella = document.getElementById(elementId: "bIdeonella");
        let bDrone = document.getElementById(elementId: "bDrone");
        let bDipNet= document.getElementById(elementId: "bDipNet");
        let bMagnetic = document.getElementById(elementId: "bMagnetic");
        let bCat = document.getElementById(elementId: "bCat");
        let bNet2 = document.getElementById(elementId: "bNet2");
        let bTimeMachine = document.getElementById(elementId: "bTimeMachine");
        let bBlackhole = document.getElementById(elementId: "bBlackhole"); */
        let clicks;
        let cookieclicker;
        console.log(bBucket);
        console.log(test1);

        console.log(bBucket.disabled);

        clicks = 1000;
        let pictures = [
            {
                picture: "bucket.png",
                requiredClicks: 100,
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

        function checkAllCollectors(clicks) {
            for (let i = 0; i <= pictures.length - 1; i++) {
                //enable button
                if (pictures[i].requiredClicks <= clicks) {
                    document.getElementById(pictures[i].id).removeAttribute("disabled");
                    document.getElementById(pictures[i].id).src = pictures[i].picture;
                    document.getElementById(pictures[i].id).disabled = false;

                }
                //gray background and button disabled
                else if (pictures[i].requiredClicks > clicks && document.getElementById(pictures[i].id).disabled === false) {
                    document.getElementById(pictures[i].id).setAttribute("disabled", "disabled");

                    //bBucket.disabled = true;
                    document.getElementById(pictures[i].id).style.backgroundColor = "#585858";
                }
                //show questionmark picture
                else {
                    //Nächste Zeile nur zu Testzwecken
                    document.getElementById(pictures[i].id).style.backgroundColor = "#585858";
                }

            }
        }

        setInterval(function () {
            checkAllCollectors(clicks);

        }, 100);


        /*window.addEventListener("load" , () => {
            //Anwendung starten
            let app = new App();
            app.start();
        });*/

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
}
export default Clicker;