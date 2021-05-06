
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
         if (accuracy > 100)
            accuracy = 100;
        else if (accuracy < 0)
            accuracy = 0;
         return Math.round(accuracy);
 }

 export const setCookie = (name, value, days = 30, path = '/') => {
   const expires = new Date(Date.now() + days * 864e5).toUTCString()
   document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=' + path
 }

 export const getCookie = (name) => {
   return document.cookie.split('; ').reduce((r, v) => {
     const parts = v.split('=')
     return parts[0] === name ? decodeURIComponent(parts[1]) : r
   }, '')
 }

 export const deleteCookie = (name, path) => {
   setCookie(name, '', -1, path)
 }
