google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  // var jsonData = $.ajax({
  //   url: "getData.php",
  //   dataType: "json",
  //   async: false
  //   }).responseText;

  var data = google.visualization.arrayToDataTable([
    ['Year', 'Altitude', 'Temperature'],
    ['2004',  1000,      400],
    ['2005',  1170,      460],
    ['2006',  660,       1120],
    ['2007',  1030,      540]
  ]);

  var options = {
    title: 'exkite live',
    curveType: 'function',
    legend: { position: 'bottom' },
    colors: ['#808080','#333333', '#0d0d0d']
  };

  function resize () {
      var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
      chart.draw(data, options);
    }

    window.onload = resize();
    window.onresize = resize;
}
