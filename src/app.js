"use strict";

class App {

    constructor() {
        console.log("Der Konstruktor der Main App wurde aufgerufen");
    }

    start() {
        console.log("Start wurde aufgerufen");
        let element = document.getElementById("test");
        let retten = false;
        setInterval(()=> {
            if (retten) {
                element.innerText = "Hallo,  Welt!";
            } else {
                element.innerText = "Hallo, du zu rettende Welt!";
            }
            retten = !retten;

        }, 1000);
    }
}


export default App;