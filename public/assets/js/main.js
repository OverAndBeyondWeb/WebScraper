
//Populate '/saved-articles when site loads
$.get('/api/saved-articles', function(data) {
  data.forEach(function(article) {

    $('.saved-article-message').text('Saved Articles');

    var articleEl = $('<div class="article">');

    var articleContent = $('<div class="article-content">')
    articleContent.append('<div class="article-title">' + article.headline + '</div>');
    articleContent.append('<div class="article-summary">' + article.summary + '</div>');
    articleContent.append('<div class="article-url">' + article.url + '</div>');

    articleEl.append(articleContent);
   
    var buttons = '<span class="article-btns">' +
      '<button class="add-note">Add Note</button>' +
      '<button class="delete-btn" data-id="' + article._id + '">Delete</button>' +
      '</span>';

    articleEl.append(buttons);

    

    $('.saved-articles').append(articleEl);
  });
}).then(function() {
  
  $('.article').on('click', '.delete-btn', function(e) {
    var id = $(e.target).attr('data-id');
    $.ajax({
      type: 'DELETE',
      url: '/delete-article/' + id,
      success: function() {
        window.location.href = '/saved-articles'
      }
    });
  })

  $('.article').on('click', '.add-note', function() {
    var currentArticle = ($(this).parent().parent());
    var notepad = '<form  action="/note" method="POST" class="notepad">' +
      '<textarea name="note" class="note" cols="30" rows="10" placeholder="Enter note here..."></textarea>' +
      '<button type="submit" id="submit-note">Save Note</button>' +
      '</form>'

    currentArticle.append(notepad);
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



