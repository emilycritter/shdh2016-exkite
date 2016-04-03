function setTextColor(picker) {
  document.getElementsByTagName('body')[0].style.color = '#' + picker.toString()
}

$(".jscolor").change(function() {
  var color = $( this ).css( "background-color" );
  var xkUpdate = $('strong');
  xkUpdate.css("color", color);
  $.ajax({
    method: 'POST',
    url: "changecolor",
    data: color,
    success: function(result){
      console.log(result);
    },
    error: function(error){
      console.error(error);
    }
  });
});
