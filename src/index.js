"use strict";

import App from "./app";
import "babel-core/register";
import "babel-polyfill";
import 'regenerator-runtime/runtime';
import "hacktimer/HackTimer.silent.min";
import "hacktimer/HackTimerWorker.min";

window.addEventListener("load" , () => {
    //Anwendung starten
    let app = new App();
    app.start();
});