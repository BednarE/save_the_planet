"use strict";

import tutorial from "../tutorial/tutorialText.html";
import carouselSection from "../tutorial/tutorialCarousel.html";

class Tutorial {

    constructor() {
        document.getElementById("title").innerText = "Die Erde retten, jetzt aber wirklich!";
        //document.getElementById("content").innerText = document.getElementById("story").innerText;
        let story = true;
        let standard = document.createElement("div");
        standard.innerHTML = tutorial.trim();
        document.getElementById("content").appendChild(standard);

        document.getElementById("next").addEventListener("click", (mouseEvent) => {
            console.log("Test", story);
            this.switchTutorialContent(story);
        });
    }

    switchTutorialContent(story) {
        story = !story;
        let newTutorial = document.createElement("div");
        if(story === true)
        {
            newTutorial.innerHTML = tutorial.trim();
            document.getElementById("content").innerHTML = "";
            document.getElementById("content").appendChild(newTutorial);
            document.getElementById("next").addEventListener("click", (mouseEvent) => {
                console.log("Test", story);
                this.switchTutorialContent(story);
            });
        }
        else {
            newTutorial.innerHTML = carouselSection.trim();
            document.getElementById("content").innerHTML = "";
            document.getElementById("content").appendChild(newTutorial);
            document.getElementById("next").addEventListener("click", (mouseEvent) => {
                console.log("Test", story);
                this.switchTutorialContent(story);
            });
        }
    }

}

export default Tutorial;