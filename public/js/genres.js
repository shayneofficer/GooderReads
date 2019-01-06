$('#submit-genres').on('click', function (event) {
  event.preventDefault()
  var likes = []

  $('.selected').each(function () {
    likes.push(this.id)
  })
  console.log(likes)
})

$('.genre-btn').on('click', function (event) {
  event.preventDefault()

  if ($(this).hasClass('selected')) {
    $(this).removeClass('selected')
  } else {
    $(this).addClass('selected')
  }
})

$('#reset').on('click', function (event) {
  event.preventDefault()

  $('.selected').removeClass('selected')
})

$(window).on('load', function () {
  $('#welcomeModal').modal('show')
  console.log('loaded')
})
