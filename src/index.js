"use strict";

//import App from "./app";
<!---Mainside: Zählbuttons Upgrades-->

window.onload = function() {
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
    bBucket.disabled=false;
    console.log(bBucket.disabled);

    clicks = 10;
    let pictureUrl = [
        "bucket.png",
        "vacuumCleaner.jpg",
        "IdeonellaSakariensis.jpg",
        "drone.jpg",
        "dipNet.jpg",
        "magnetic.png",
        "cat.jpg",
        "net2.jpg",
        "timeMachine.jpg",
        "blackhole.jpg"
        ];


let sideBucket = "questionmark.png";
    function checkBucket(clicks)
    {
        //enable button
        if(100 <= clicks)
        {
            test1.removeAttribute("disabled");
            document.getElementById("eineID").src = "bucket.png";
            bBucket.disabled = false;
            sideBucket = ""

        }
        //gray background and button disabled
        else if(100 > clicks && bBucket.disabled === false)
        {
            test1.setAttribute("disabled", "disabled");

            //bBucket.disabled = true;
            document.getElementById("bBucket").style.backgroundColor = "#585858";
        }
        //show questionmark picture
        else
        {

        }

    }
    window.setInterval(function() {
        checkBucket(clicks);

    },100);




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









