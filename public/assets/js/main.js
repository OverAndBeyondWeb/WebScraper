$('.scrape').click(function() {
  $.post('/scrape', function(data) {

    data.forEach(function(article) {
      var articleEl = $('<div>');
      articleEl.append('<div class="article-title">' + article.headline + '</div>');
      articleEl.append('<div class="article-summary">' + article.summary + '</div>');
      articleEl.append('<div class="article-url">' + article.url + '</div>');

      $('.articles').append(articleEl);
    });
    
    // $.get('api/all', function(data) {
      console.log(data);
    // });
  });
});