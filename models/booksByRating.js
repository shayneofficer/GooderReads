var orm = require("../config/orm.js")

booksByRating = {
  grabRatings: function(cb){
    orm.all("ratings", function(res){
      cb(res)
    })
  }


}