import { API_PRODUCT, API_USER } from "./contants";
var i11 = [];
var i12 = [];
var i13 = [];
var i14 = [];
var ss = [];
var tablet = [];
const array_check = ['Laptop', 'Macbook']
var computer = [];
const product_res = await fetch(API_PRODUCT);
// Storing data in form of JSON
var data_product = await product_res.json();
data_product.forEach(element => {
    if (element.description.includes("iphone 14")) {
        i14.push(element)
    } else if(element.description.includes("iphone 13")) {
        i13.push(element)
    } else if(element.description.includes("iphone 12")) {
        i12.push(element)
    } else if(element.description.includes("iphone 11")) {
        i11.push(element)
    } else if ((element.name.indexOf('Macbook') !== -1
        || element.name.indexOf('Laptop') !== -1)
        && (array_check.includes("Macbook")
            || array_check.includes("Laptop"))
        ) {
        computer.push(element)
    }else if(element.description.indexOf('Samsung') !== -1 ) {
        ss.push(element)
    } else {
        tablet.push(element)
    }
});

export const chartProduct = {
    type: "doughnut",
    chartData: {
        labels: ['Statistics on the number of products'],
        datasets: [
            {
                label: "Iphone 14",
                data: [i14.length],
                backgroundColor: "rgba(125, 19, 203, 1)",
            },
            {
                label: "Iphone 13",
                data: [i13.length],
                backgroundColor: "rgba(28, 19, 203, 1)",
            },
            {
                label: "Iphone 12",
                data: [i12.length],
                backgroundColor: "rgba(36, 203, 19, 1)",
            },
            {
                label: "Iphone 11",
                data: [i11.length],
                backgroundColor: "rgba(0, 0, 0, 1)",
            },
            {
                label: "Samsung",
                data: [ss.length],
                backgroundColor: "rgba(211, 22, 11, 1)",
            },
            {
                label: "Computer",
                data: [computer.length],
                backgroundColor: "rgba(0, 0, 0, 0.18)",
            },
            {
                label: "Other",
                data: [tablet.length],
                backgroundColor: "rgba(255, 108, 75, 0.46)",
            },
            {
                label: "Total",
                data: [data_product.length],
                backgroundColor: "rgba(2, 229, 179, 0.8)",
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
                max: 30,
                ticks: {
                    stepSize: 1,
                    padding: 0,
                },

            }
        }
    }
};
export default chartProduct; 