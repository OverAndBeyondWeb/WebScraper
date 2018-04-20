$.get('/api/saved-articles', function(data) {
  data.forEach(function(article) {

    $('.saved-article-message').text('Saved Articles');

    var articleEl = $('<div class="article">');

    var articleContent = $('<div class="article-content">')
    articleContent.append('<div class="article-title">' + article.headline + '</div>');
    articleContent.append('<div class="article-summary">' + article.summary + '</div>');
    articleContent.append('<div class="article-url">' + article.url + '</div>');

    articleEl.append(articleContent);
    articleEl.append('<button class="save-btn">delete</button>');

    $('.saved-articles').append(articleEl);
  });
});

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
    
  }).then(function() {
    $('.article').on('click', '.save-btn', function() {
      var articleContent = $(this).parent().find('.article-content');
      var articleContentObj = {
        headline: articleContent.find('.article-title').text(),
        summary: articleContent.find('.article-summary').text(),
        url: articleContent.find('.article-url').text()
      }
      console.log(articleContentObj);

      $.post('/saved-articles', articleContentObj, function() {
        
      });
    });
  });
});



