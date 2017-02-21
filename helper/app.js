
module.exports={
   tanggal : function(date){
     if (date!=null){
   var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
   var month =['jan','feb','mar','apr','mey','june','july','agst','sep','okt','nov','des']
   let hasil = `${days[date.getDay()]}, ${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()} `
   return hasil}
   else{ return date;}


  }
}
