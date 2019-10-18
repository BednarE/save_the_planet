"use strict";
import StatisticTemplate from "./statistic.html";
import Chart from "chart.js";

class Statistic {

    constructor() {
        document.getElementById("title").innerText = "Statistics";
        let statisticDiv = document.createElement("div");
        statisticDiv.innerHTML = StatisticTemplate.trim();
        document.getElementById("content").appendChild(statisticDiv);

        let ctx1 = document.getElementById('plasticChart');
        new Chart(ctx1, {
            type: 'line',
            data: {
                labels: ['1', '2', '3', '4', '5', '6', '7'],
                datasets: [{
                    label: 'Plastics gathered',
                    data: [12, 19, 3, 17, 6, 3, 7],
                    backgroundColor: "rgba(153,255,51,0.4)"
                }, {
                    label: 'Money in the Bank',
                    data: [2, 29, 5, 5, 2, 3, 10],
                    backgroundColor: "rgba(255,153,0,0.4)"
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Plastics gathered'
                },
            }
        });

        let ctx2 = document.getElementById('buildingsOwnedChart');
        new Chart(ctx2, {
            type: 'line',
            data: {
                labels: ['1', '2', '3', '4', '5', '6', '7'],
                datasets: [{
                    label: 'Number of activists',
                    data: [1, 4, 5, 6, 14, 30, 31],
                    backgroundColor: "rgba(153,255,51,0.4)"
                }, {
                    label: 'Number of helping hands',
                    data: [2, 3, 5, 5, 6, 7, 10],
                    backgroundColor: "rgba(255,153,0,0.4)"
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Buildings owned'
                }
            }
        });
    }


}

export default Statistic;