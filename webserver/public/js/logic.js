// function setTextColor(picker) {
//   document.getElementsByTagName('body')[0].style.color = '#' + picker.toString()
// }

function init() {
  $(".jscolor").on('change', function() {
    var color = $( this ).css( "background-color" );
    var xkUpdate = $('strong');
    xkUpdate.css("color", color);
    $.ajax({
      method: 'POST',
      url: "changecolor",
      data: {color: color},
      success: function(result){
        console.log(result);
      },
      error: function(error){
        console.error(error);
      }
    });
  });

  $('#GPSCheckBox').change(function() {
    var onoff = document.getElementsById('GPSCheckBox').checked;
    $.ajax({
      method: 'POST',
      url: 'gpstoggle',
      data: {
        onoff: onoff
      }
    });
  });

  $('#TheCheckBox').change(function() {
    var onoff = document.getElementsById('GPSCheckBox').checked;
    $.ajax({
      method: 'POST',
      url: 'colortoggle',
      data: {
        onoff: onoff
      }
    });
  });
}
