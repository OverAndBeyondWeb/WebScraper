$('.get-articles').click(function() {
  $.post('/scrape', function(data) {
    console.log(data);
  });
});