/*button ON-OFF*/
function onButtonClick() {
  var firebaseRef = firebase.database().ref("Relay1");
  firebaseRef.set("1");
}

function offButtonClick() {
  var firebaseRef = firebase.database().ref("Relay1");
  firebaseRef.set("0");
}

function openButtonClick() {
  var firebaseRef = firebase.database().ref("Relay2");
  firebaseRef.set("true");
}

function closeButtonClick() {
  var firebaseRef = firebase.database().ref("Relay2");
  firebaseRef.set("false");
}

/*show value of Temparature&Humidity*/
var firebaseRef = firebase.database().ref("Temp");
firebaseRef.on('value', function (dataSnapshot) {
var childData = dataSnapshot.val();
document.getElementById("dataTemp").innerHTML = "Temperature : " + childData + " &deg;C";
});

var firebaseRef = firebase.database().ref("Humi");
firebaseRef.on('value', function (dataSnapshot) {
var childData = dataSnapshot.val();
document.getElementById("dataHumi").innerHTML = "Humidity : " +  childData + " %";
});

/*Show Status Relay*/
var firebaseRef = firebase.database().ref("Relay1");
firebaseRef.on('value', function (dataSnapshot) {
var childData = dataSnapshot.val();
if(childData == "1"){
document.getElementById("StatusRelay1").innerHTML = "Relay1 Status : ON";
document.getElementById('Relay1LED').src='image/led on.png';
}else{
  document.getElementById("StatusRelay1").innerHTML = "Relay1 Status : OFF";
  document.getElementById('Relay1LED').src='image/led off.png';
}
});

var firebaseRef = firebase.database().ref("Relay2");
firebaseRef.on('value', function (dataSnapshot) {
var childData = dataSnapshot.val();
if(childData == "true"){
document.getElementById("StatusRelay2").innerHTML = "Relay2 Status : ON";
document.getElementById('Relay2LED').src='image/led on.png';
}else{
  document.getElementById("StatusRelay2").innerHTML = "Relay2 Status : OFF";
  document.getElementById('Relay2LED').src='image/led off.png';
}
});

/*Chart JS*/
var temp = [], hum = [];
var firebaseRef = new Firebase("fir-tony-space-default-rtdb.firebaseio.com/");
firebaseRef.on('value', function (snapshot) {
  for (let i in snapshot.val().temp) {
    temp.push(snapshot.val().temp[i]);
  }
  for (let i in snapshot.val().hum) {
    hum.push(snapshot.val().hum[i]);
  }
  drawGraph(temp, hum);
});

function drawGraph(temp, hum) {
  var labels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
  var ctx = document.getElementById("myChart").getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
          label: "temperature [°C]",
          labelString: "°C",
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgb(255, 99, 132)',
          fill: false,
          data: temp,
          // yAxisID: "y-axis-temp",
        },
        {
          label: "humidity [%RH]",
          labelString: "hum",

          borderColor: 'rgb(0, 99, 132)',
          backgroundColor: 'rgb(0, 99, 132)',
          fill: false,
          data: hum,
          // yAxisID: "y-axis-temp",

        }
      ]
    },
    options: {
      responsive: false,
      maintainAspectRatio: false,
      hoverMode: 'index',
      stacked: false,
      plugins:{
      title: {
        display: true,
        text: 'Temparature & Humidity Form Tony Space'
      }
    },

      scales: {
        yAxes: [{
          type: "linear",
          display: true,
          position: "left",
          id: "y-axis-temp",
          ticks: {
            beginAtZero: true,
            suggestedMax: 100
          }

        }],
      }
    }
  });
}