
 export function calcFreshness(my_ts){
     let n = new Date();
     let diff = n - Date.parse(my_ts);
     let hrs_elapsed =  diff/(1000*60*60);
     console.log(my_ts);
     let freshness = 0;

     if (hrs_elapsed < 400)
         freshness = (400 - hrs_elapsed)/4;
     return  Math.min(freshness,400);
 }

 export function calcAccuracy(px_now,px_at_save,rating){
         let factor = 1;
         let sign = 1;
         if (px_now < px_at_save)
            sign = -1;
         let accuracy = 100*(px_now-px_at_save)/px_at_save;
         accuracy = accuracy + sign*(rating-50) + 50;
         return Math.round(accuracy);
 }
