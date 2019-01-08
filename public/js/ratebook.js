/**
 * Star hover event; highlights stars corresponding to rating
 */
var parent
$('.star')
  .mouseenter(function () {
    parent = $(this).parent()
    for (var i = 0; i < $(this).data('val'); i++) {
      var star = $(parent).children()[i]
      $(star).css('color', '#DE681C')
    }
  })
  .mouseleave(function () {
    for (var i = 0; i < $(this).data('val'); i++) {
      var star = $(parent).children()[i]
      $(star).css('color', '#AAB5C1')
    }
  })

/**
 * Load the user's saved ratings if they have any
 */
// $.get(
//   '/api/book-rating/' +
//     $(this).data('isbn') +
//     '/' +
//     sessionStorage.getItem('userID'),
//   function (data) {
//     if (data) {
//       console.log(data)
//       if ($(this).data('isbn') == Object.values(data[0])[1]) {
//         var userRating = Object.values(data[0])[2]
//         console.log(userRating)
//         // $(this).html('Your Rating: ' + Object.values(data[0])[2])
//       }
//     }
//   }
// )

/**
 * Star on click event (posts to server)
 */
$('.star').on('click', function (event) {
  event.preventDefault()

  if (sessionStorage.getItem('userID') < 0) {
    // Prompt user to log in if they aren't already
    $('#modalLoginForm').modal('show')
  } else {
    // keep stars gold when submitted
    var parent = $(this).parent()
    var children = $(parent).children()
    for (var i = 0; i < $(children).length; i++) {
      if ($(children[i]).hasClass('saved-rating')) {
        $(children[i]).removeClass('saved-rating')
      }
    }
    for (var i = 0; i < $(this).data('val'); i++) {
      var star = $(parent).children()[i]
      $(star).addClass('saved-rating');
    }

    // Value of the star clicked
    var userRating = parseInt($(this).data('val'))
    userRating *= 2
    // Value of the star clicked
    rating = {
      isbn: $(this).data('isbn'),
      rating: userRating.toString(),
      userID: sessionStorage.getItem('userID')
    }

    $.post('/api/rate-book/', rating, function (data) {
      if (data.error) {
        alert(data.error)
      }
    })
  }
})
