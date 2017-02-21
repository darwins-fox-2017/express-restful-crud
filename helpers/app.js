let moment = require('moment')
module.exports = {
  beautifyDate : function(date){
    var start = moment(date);
    var end   = moment();
    // end.to(start);       // "5 days ago"
    // end.to(start, true); // "5 days
    return end.to(start)
  }
}
