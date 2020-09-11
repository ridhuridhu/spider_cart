var data1 = document.getElementById("0").value;
var data2 = document.getElementById("1").value;
var data3 = document.getElementById("2").value;
var data4 = document.getElementById("3").value;
var data5 = document.getElementById("4").value;
var data6 = document.getElementById("5").value;
var data7 = document.getElementById("6").value;
//console.log(data4);
var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Day:1", "Day:2", "Day:3", "Day:4", "Day:5", "Day:6", "Day:7"],
        datasets: [{
            label: '# of Products sold ',
            data: [data1,data2, data3, data4, data5, data6, data7],
            backgroundColor: ['rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgb(255,128,171,0.4)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255,128,171,1),'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});