
$(document).ready(function(){
  if ($(window).width() > 800) {
    $('#toggle-menu').prop('checked', true);
  }
  $(window).resize(() => {
    if($(window).width() > 800){
      $('#toggle-menu').prop('checked', true);
    }else{
      $('#toggle-menu').prop('checked', false);
    }
    $('.curtain').addClass('none');
  });
  $('.toggle').click(() => {
    if($('#toggle-menu').is(':checked')){
      $('.curtain').addClass('none');
    }else{
      $('.curtain').removeClass('none');
    }
  });
  $('.menu').click((e) => {
    e.preventDefault();
    if ($('#toggle-menu').is(':checked')) {
      $('.curtain').addClass('none');
      if ($(window).width() <= 800){
        $('#toggle-menu').prop('checked', false);
      }
    }
  });
});