$(".rate-book").on("click", function(event) {
  event.preventDefault();
  rating = {isbn: $(this).data("isbn"), rating: parseInt($(this).text()), userID: sessionStorage.getItem("userID")}

  console.log(rating);
  $.post("/api/rate-book/", rating, function(data){
    console.log(data);
  });
});