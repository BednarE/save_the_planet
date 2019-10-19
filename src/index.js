"use strict";

//import App from "./app";
<!---Mainside: Zählbuttons Upgrades-->

window.onload = function() {
    let test1 = document.getElementById("test1");
    test1.setAttribute("disabled", "disabled");
    let bBucket = document.getElementsByTagName("bBucket");
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

    /*document.addEventListener("DOMContentLoaded", function () {
        document.querySelector('[name="button"]').addEventListener('change', changeStyle);
        document.querySelector('[name="background"]').addEventListener('change', changeStyle);

        function changeStyle() {
            let output = document.querySelector('output');
            output.style.color = document.querySelector('[name="test1"]').value;
            output.style.backgroundColor = document.querySelector('[name="background"]').value;
            document.getElementById("test1").style.color = "#585858";
        }
    });*/
    function checkBucket(clicks)
    {


        if(100 <= clicks)
        {
            test1.removeAttribute("disabled")
            /*Button enablen*/
            bBucket.disabled = false;

        }
        else if(100 > clicks /*&& bBucket.disabled === false*/)
        {
            test1.setAttribute("disabled", "disabled");
            /*Hintergrundbild ausgrauen und disablend*/
            //bBucket.disabled = true;
        }
        else
        {
            /*Grundbild lassen*/
        }

    }
    window.setInterval(function() {
        checkBucket(clicks);

    },100);

};


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











