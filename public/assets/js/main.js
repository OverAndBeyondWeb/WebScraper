$('.scrape').click(function() {
  $.post('/scrape', function(data) {

    data.forEach(function(article) {
      var articleEl = $('<div class="article">');

      var articleContent = $('<div class="article-content">')
      articleContent.append('<div class="article-title">' + article.headline + '</div>');
      articleContent.append('<div class="article-summary">' + article.summary + '</div>');
      articleContent.append('<div class="article-url">' + article.url + '</div>');

      articleEl.append(articleContent);
      articleEl.append('<button class="save-btn">Save Article</button>');

      $('.articles').append(articleEl);
    });
    
    // $.get('api/all', function(data) {
      console.log(data);
    // });
  });
});