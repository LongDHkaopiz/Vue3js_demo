
var hours = [];
var url = 'http://api.weatherapi.com/v1/forecast.json?key=607d30125c34472888023252233105&q=Vietnam&days=1&aqi=yes&alerts=no';
// Storing response
const response = await fetch(url);
// Storing data in form of JSON
var data = await response.json();
var forecastday=data.forecast.forecastday
forecastday.forEach(element => {
    hours.push(element.hour)
})
let temp_c_values = hours[0].map(item => item.temp_c); 
let temp_f_values = hours[0].map(item => item.temp_f);
let time_values = hours[0].map(item => item.time);
const hourArray = time_values.map(time => {
  const date = new Date(time);
  return date.getHours();
});

export const weatherChart = {
    type: "line",
    chartData: {
        labels: hourArray,
        datasets: [
            {
                label: "Celsius temperature",
                data: temp_c_values,
                backgroundColor: "rgba(244, 231, 4, 0.8)",
                borderColor: "#f4e704cc",
                borderWidth: 2,

            },
            {
                label: "Fahrenheit temperature ",
                data: temp_f_values,
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
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Hours'
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
                    text: 'Temperature'
                },
                min: 0,
                max: 150,
                ticks: {
                    stepSize: 10,
                    padding: 0,
                },

            }
        }
    }
};


export default weatherChart; 