var socket;

socket = io.connect('http://localhost:3000');
var i = 0;
var state = false;
var ctx = document.getElementById('chart').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [], //czas
    datasets: [{
      label: 's(t)',
      data: [], //odczyty dla czasu
      backgroundColor: "rgba(52, 152, 219,0.7)"
    }]
  }
});
 socket.on('connection',
    function(data) {
      console.log(data);
      if(state == true){
       myChart.data.datasets[0].data[i] = data;
       myChart.data.labels[i] = i;
       myChart.update();
       i++;
      }
     
    }
  );
  document.getElementById("startstop").addEventListener("click", function() {
    if(state == true){
      document.getElementById('startstop').innerHTML = "Rozpocznij odczyt";
      state = false;
    }else{
      document.getElementById('startstop').innerHTML = "Zatrzymaj odczyt";
      state = true;
    }
});
document.getElementById("reset").addEventListener("click", function() {
   state = false;
   location.reload();
});
   
  


