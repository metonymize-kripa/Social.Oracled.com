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
    Auth0Context,
    Auth0LoginButton,
    Auth0LogoutButton,
    authError,
    authToken,
    idToken,
    isAuthenticated,
    isLoading,
    login,
    logout,
    userInfo,
  } from '@dopry/svelte-auth0';


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
</script>

<style>
	body {
	    max-width:90rem;
	    margin:0 auto;
	    padding:2rem;
	}
	.card{
	    margin:1rem auto;
	}
</style>

<NavBar user="active" />
<body>

    <!--
    <div class ="card row">
       <table>
		    <thead>
		      <tr>
		         <th width="15%" class="text-center">   <img src={createRandomAvataar()} width = 50/></th>
		         <th width="65%" colspan="2" class="text-center" style="font-size:2.5rem;">{user}' ratings</th>
                 <th width="10%" class="text-center"> Accuracy</th>
                 <th width="10%" class="text-center">Freshness</th>
		      </tr>
		    </thead>

              {#each user_ratings as {symbol,rating,timestamp,px_at_save,px_now}}
               <tr>
                 <a class="text-left" href="/#/stock/{symbol}"><td width="15%" style="font-size:1.75rem;color:#1e1aa6;font-weight:500;"> {symbol}</td></a>
                 <td width="50%"><RangeSlider float pips all='label' disabled={true}  bind:values={rating}  pipstep={50} min={0} max={100} /></td>
                 <td width="15%" class="text-right" style="font-size:1.75rem;color:purple;">{rating}%({arrow[Math.round(Math.random() * +1)]})</td>
                 <td width="10%" class="text-right" style="font-size:1.75rem;color:purple;">{Math.round(Math.random() * (96 - 33) + 33)}%</td>
                 <td width="10%" class="text-right" style="font-size:1.75rem;color:purple;">{Math.round(CalcFreshness(timestamp))}%</td>
               </tr>
               {/each}
        </table>
      </div>
      -->



      <div class ="row">
      <table style="margin-bottom:3rem;">
        <thead>
         <Auth0Context domain="dev-gh9on756.us.auth0.com" client_id="lDh9u5tdu1Kk5CkXtZjmjjmUKuGARk0v">
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
        </Auth0Context>
        </thead>
      </table>

      {#each user_ratings as {symbol,rating,timestamp,px_at_save,px_now}}
          <div class="col-4">
              <SimpleTickerCard my_ticker={symbol}  my_rating={rating} my_accuracy={Math.round(Math.random() * (96 - 33) + 33)} my_freshness={Math.round(CalcFreshness(timestamp))}/>
          </div>
      {/each}
      </div>


 </body>
