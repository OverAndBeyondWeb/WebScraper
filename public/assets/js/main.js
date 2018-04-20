$('.get-articles').click(function() {
  $.post('/scrape', function(data) {
    $.get('api/all', function(data) {
      console.log(data);
    });
  });
});