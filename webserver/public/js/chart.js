var colorDark = '#808080';
var colorLight = '#333333';


google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

setInterval(function(){
  var jsonData = $.ajax({
    url: "getGeneralData",
    dataType: "json",
    success: function(data){
      drawChart(data);
    }
    }).responseText;
}, 5000);

function drawChart(info) {
  var obj = [];
  obj.push(['time', 'altitude', 'temperature']);
  for(var i = 0; i < info.altitude.length; i++) {
    obj.push([info.altitude[i].time, info.altitude[i].val, info.temperature[i].val]);
  }

  var data = google.visualization.arrayToDataTable(obj);

  var options = {
    title: 'exkite live',
    curveType: 'function',
    legend: { position: 'bottom' },
    colors: [colorDark, colorLight],
    titleTextStyle: {
      color: '#333333',
      fontName: 'Orbitron',
      fontSize: 18
    },
    hAxis: {
      textStyle: {
        color: '#333333',
        fontName: 'Orbitron',
        fontSize: 12
      }
    },
    vAxis: {
      textStyle: {
        color: '#333333',
        fontName: 'Orbitron',
        fontSize: 12
      }
    },
    legend: {
      textStyle: {
        color: '#333333',
        fontName: 'Orbitron',
        fontSize: 12
      },
      position: 'bottom'
    }
  };

  function resize () {
      var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
      chart.draw(data, options);
    }

    window.onload = resize();
    window.onresize = resize;
}

$(document.body).delegate("h1 strong", 'change', function() {
  var color = $( this ).css( 'background-color' );
  colorLight = color;
  colorDark = color;
  drawChart();
});
