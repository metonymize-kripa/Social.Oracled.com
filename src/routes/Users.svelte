<svelte:head>
  <title>Friends of the Oracle</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="https://unpkg.com/chota@latest">
</svelte:head>

<script>
  import { onMount } from "svelte";
  import {createRandomAvataar} from './utils/rand_avataar.js';
  import SimpleTickerCard from './utils/SimplerTickerCard.svelte';
  import {push, pop, replace} from 'svelte-spa-router';
  import RangeSlider from "svelte-range-slider-pips";
    import NavBar from './utils/NavBar.svelte';

  import {
    Auth0LoginButton,
    Auth0LogoutButton,
    authError,
    isAuthenticated,
    userInfo,
  } from '@dopry/svelte-auth0';
  import {
    nav_ticker,
    overview_class,
    rating_class,
    user_class,
    is_home
  } from './utils/navbar.js';
  $is_home = false;
  $overview_class = '';
  $rating_class = '';
  $user_class = 'active';


  let user_array = ['FatTony','Pappe','Kripa','Pani', 'Harsha','Brad','Sunil','Deba'];
  let symbol_list = ['IBM','C',"MELI","CLOV","TSLA","GME","XOM",'AMC','SPY','PLTR', 'TWTR','IAC','PG', 'V','X','FB']
  user_array = shuffle(user_array);
  symbol_list = shuffle(symbol_list);
  let new_user= 'FatTony';
  let err_val="";
  let user_ratings = [];
  function getUsersList() {
      user_ratings = [];
      fetch("https://www.insuremystock.com/stocks/getalluserratings/"+params.name+"/?secret_key=Fat Neo")
          .then(d => d.text())
          .then(d =>
          {
              var api_output = JSON.parse(d);
              if ('error' in api_output)
                  err_val =  "error";
              else
              {
            //for (var i=0;i<api_output.user_list.length;i++)
            //      user_ratings.push({'symbol':api_output.user_list[i].symbol,'my_rating':[api_output.user_list[i].rating]});
              user_ratings = api_output.user_list;
              }

              console.log(user_ratings);

          });
  }

  export let params = {}
  let user = params.name;
  function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

$: params.name  && getUsersList();

let arrow = ['⬆','⬇'];
let rand_list=[];
for (var i=0;i<40;i++)
    rand_list.push([Math.round(Math.random() * (96 - 33) + 33)]);

function CalcFreshness(my_ts){
    let n = new Date();
    let diff = n - Date.parse(my_ts);
    let hrs_elapsed =  diff/(1000*60*60);
    console.log(my_ts);
    let freshness = 0;

    if (hrs_elapsed < 100)
        freshness = 100 - hrs_elapsed;
    return  Math.min(freshness,100);
}

function calcAccuracy(px_now,px_at_save,rating){
        let factor = 1;
        if (px_now != px_at_save)
            factor = (px_now-px_at_save)/Math.abs(px_now-px_at_save);
        return 2*factor*(rating-50);
}
</script>

  <div class ="row">
  <table style="margin-bottom:3rem;">
    <thead>

     {#if $isAuthenticated}
      <tr>
          <th width="100%"  class="text-center"><h1>{user.split('@')[0].toUpperCase()}'S prophesies</h1></th>
      </tr>
      {:else}
          <tr>
              <td width="100%"  class="text-center" style="padding:0;margin-bottom:0;"><h3>{user.split('@')[0].toUpperCase()}'S prophesies</h3></td>
          </tr>
          <tr>
            <th width="100%"  class="text-center"><Auth0LoginButton class="button text-center error">Login to 💎Oracle</Auth0LoginButton></th>
        </tr>
    {/if}

    </thead>
  </table>

  {#each user_ratings as {symbol,rating,timestamp,px_at_save,px_now}}
      <div class="col-4">
          <SimpleTickerCard my_ticker={symbol}  my_rating={rating} my_accuracy={calcAccuracy(px_now,px_at_save,rating)} my_freshness={Math.round(CalcFreshness(timestamp))}/>
      </div>
  {/each}
  </div>
