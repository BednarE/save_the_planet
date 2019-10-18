"use strict";

class Statistic {

    constructor() {
        console.log("Statistic opened");
    }

}
var ctx1 = document.getElementById('plasticChart').getContext('2d');
var plasticChart = new Chart(ctx1, {
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
        }
    }
});

var ctx2 = document.getElementById('buildingsOwnedChart').getContext('2d');
var plasticChart = new Chart(ctx2, {
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
        }
    }
});
export default Statistic;