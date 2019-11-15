"use strict";

import App from "./app";
import "babel-core/register";
import "babel-polyfill";
import 'regenerator-runtime/runtime';

window.addEventListener("load" , () => {
    //Anwendung starten
    let app = new App();
    app.start();
});