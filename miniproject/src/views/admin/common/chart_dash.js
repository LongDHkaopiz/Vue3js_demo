
import { API_PRODUCT, API_USER } from "./contants";

export const planetChartData = {
    type: "line",
    chartData: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
            {
                label: "Expected",
                data: [90, 120, 161, 134, 105, 160, 165],
                backgroundColor: "rgba(54,73,93,.5)",
                borderColor: "#36495d",
                borderWidth: 2,

            },
            {
                label: "Actual",
                data: [118, 82, 91, 154, 162, 140, 145],
                backgroundColor: "rgba(71, 183,132,.5)",
                borderColor: "#47b784",
                borderWidth: 2,

            }
        ]
    },
    options: {
        responsive: true,
        lineTension: 1,
        maintainAspectRatio: true,
        animations: {
            tension: {
                duration: 1000,
                easing: 'linear',
                from: 1,
                to: 0,
                loop: true
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Day'
                },
                ticks: {
                    beginAtZero: true,
                    padding: 0,
                },
                Width: 600
            },
            y: {
                title: {
                    display: true,
                    text: 'Values'
                },
                min: 0,
                max: 200,
                ticks: {
                    stepSize: 10,
                    padding: 0,
                },

            }
        }
    }
};

var admin = [];
var user = []
var url = API_USER;
// Storing response
const response = await fetch(url);
// Storing data in form of JSON
var data = await response.json();
data.forEach(element => {
    if (element.role === 'user') {
        user.push(element)
    } else {
        admin.push(element)
    }
});

export const chartUser = {
    type: "bar",
    chartData: {
        labels: ['Statistics on the number of users'],
        datasets: [
            {
                label: "Admin",
                data: [admin.length],
                backgroundColor: "rgba(30, 246, 7, 0.8)",

            },
            {
                label: "User",
                data: [user.length],
                backgroundColor: "rgba(211, 22, 11, 1)",
            }
        ]
    },
    options: {
        responsive: true,
        lineTension: 1,
        maintainAspectRatio: true,
    
        scales: {
            x: {
                
                ticks: {
                    beginAtZero: true,
                    padding: 0,
                },
            },
            y: {
                min: 0,
                max: 10,
                ticks: {
                    stepSize: 1,
                    padding: 0,
                },

            }
        }
    }
};


export default { planetChartData, chartUser}; 