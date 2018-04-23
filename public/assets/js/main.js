
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
   
    var buttons = '<div class="article-btns">' +
      '<a href="/saved-articles/' + article._id + '"><button class="btn view-article">View Article</button></a>' +
      '<button class="btn add-note" data-id="' + article._id + '">Add Comment</button>' +
      '<button class="btn delete-btn" data-id="' + article._id + '">Delete Article</button>' +
      '</div>';

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

  $('.article').on('click', '.add-note', function(e) {

    var id = $(e.target).attr('data-id');
    if($(this).hasClass('open')) {
      $('.notepad').remove();
      $('.add-note').text('Add Comment').removeClass('open');

    } else {
      var currentArticle = ($(this).parent().parent());
      $(this).text('Close Comment').addClass('open');
      var notepad = '<form  action="/note" method="POST" class="notepad">' +
        '<input type="text" name="title" class="title" placeholder="Title your comment...">' +
        '<textarea name="comment" class="comment" cols="30" rows="10" placeholder="Enter comment here..."></textarea>' +
        '<button type="submit" id="submit-note" class="btn">Save Comment</button>' +
        '<input type="hidden" name="id" value="' + id + '">'
        '</form>'

      currentArticle.append(notepad);
    }
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
      articleEl.append('<button class="btn save-btn">Save Article</button>');

      $('.articles').append(articleEl);
    });
    
  }).then(function() {
    $('.article').on('click', '.save-btn', function() {
      var articleContent = $(this).parent().find('.article-content');
      var articleContentObj = {
        headline: articleContent.find('.article-title').text(),
        summary: articleContent.find('.article-summary').text(),
        url: articleContent.find('.article-url').text()
      }

      $.post('/saved-articles', articleContentObj, function() {
        
      });
    });
  });
});



