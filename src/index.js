"use strict";

import App from "./app";

window.addEventListener("load" , () => {
    //Anwendung starten
    let app = new App();
    app.start();
});

/*providing Upgrades, after quantity of clicks*/
let clicks;


/*providing Upgrades, after quantity of clicks for Buckets*/
let requiredClicksForBucket;

if (clicks >= requiredClicksForBucket)
{
    document.getElementById('button').style.disabled="true";
}

if(clicks < requiredClicksForBucket)
{
    document.getElementById('button').style.disabled="false";
}

/*providing Upgrades, after quantity of clicks for IdeonellaSakariensis*/
let requiredClicksForIdeonellaSakariensis;

if (clicks >= requiredClicksForIdeonellaSakariensis)
{
    document.getElementById('button').style.disabled="true";
}
if(clicks < requiredClicksForIdeonellaSakariensis)
{
    document.getElementById('button').style.disabled="false";
}








