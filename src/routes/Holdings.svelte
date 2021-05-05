<svelte:head>
  <title>Friends of the Oracle</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="https://unpkg.com/chota@latest">
</svelte:head>

<script>
  import { onMount } from "svelte";
  import {push, pop, replace} from 'svelte-spa-router'
  import SimpleUserCard from './utils/SimpleUserCard.svelte';
  import StockWidget from './utils/StockWidget.svelte';
  import {calcFreshness,calcAccuracy } from './utils/common_functions.js';
  import RangeSlider from "svelte-range-slider-pips";
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
  $rating_class = 'active';
  $user_class = '';

let gain_chance=[0];
let err_val="";
let user_ratings = [];
function getGainChance() {

    gain_chance = [0];
    if (params.symbol === null)
       params.symbol = 'SPY';
    ticker = params.symbol;
    ticker = ticker.toUpperCase();
    fetch("https://www.insuremystock.com/options/kelly/"+ticker)
        .then(d => d.text())
        .then(d =>
        {
            var api_output = JSON.parse(d);
            if ('error' in api_output)
                err_val="error";
            else
            {
                gain_chance = [Math.round(api_output.prob_up*100)];
            }
        });

}

function getPalsList() {
    user_ratings = [];
    fetch("https://www.insuremystock.com/stocks/getallfriendsratings/"+ticker+"/?secret_key=Fat Neo&user_email='anon@anon.com'")
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
  let ticker = params.symbol.toUpperCase();
  $nav_ticker = ticker;

$: params.name && params.symbol  && getPalsList();

</script>
<style>
.contact-card {
    max-width: 450px;
    border: 1px solid #aaa;
    box-shadow: 11px 9px 7px 2px rgb(0 0 0 / 10%);;
    padding: 1em;
}
.contact-card:hover{
    transform: scale(1.1);
    cursor:pointer;
}
</style>

    <div class ="row">
    <table style="margin-bottom:3rem;">
		<thead>
       {#if $isAuthenticated}
  		  <tr>
  			  <th width="100%"  class="text-center"><h1>{ticker} 💎council (chance of up move)</h1></th>
  		  </tr>
       {:else}
       <tr>
           <td width="100%"  class="text-center" style="padding:0;margin-bottom:0;"><h3>{user.split('@')[0].toUpperCase()}'S council on {ticker}</h3></td>
       </tr>
         <tr>
           <th width="100%"  class="text-center"><Auth0LoginButton class="button text-center error">Login and build your 💎council for {ticker} </Auth0LoginButton></th>
         </tr>
         {/if}

		</thead>
    </table>

<!--    <div class="col-4"><StockWidget  my_ticker={ticker} /></div> -->
    {#each user_ratings as {symbol,rating,timestamp,px_at_save,px_now,friend},i}
        <div class="col-4">
            <SimpleUserCard my_email={friend}  my_rating={rating} my_accuracy={calcAccuracy(px_now,px_at_save,rating)} my_freshness={Math.round(calcFreshness(timestamp))}/>
        </div>
    {/each}
    </div>
