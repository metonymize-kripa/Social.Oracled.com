<svelte:head>
  <title>Friends of the Oracle</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="https://unpkg.com/chota@latest">
</svelte:head>

<script>
  import { onMount } from "svelte";
  import {calcFreshness,calcAccuracy } from './utils/common_functions.js';
  import SimpleTickerCard from './utils/SimplerTickerCard.svelte';
  import {push, pop, replace} from 'svelte-spa-router';
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
    settings_class,
    is_home
  } from './utils/navbar.js';
  $is_home = false;
  $overview_class = '';
  $rating_class = '';
  $settings_class = '';
  $user_class = 'active';

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

$: params.name  && getUsersList();



</script>
  <div class ="row">
  <table style="margin-bottom:3rem;">
    <thead>

     {#if $isAuthenticated}
      <tr>
          <th width="100%"  class="text-center"><h1>{user.split('@')[0].toUpperCase()}'S predictions (chance of up moves)</h1></th>
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
  {#if Math.round(calcFreshness(timestamp)) > 5}
      <div class="col-4">
          <SimpleTickerCard my_ticker={symbol}  my_rating={rating} my_accuracy={calcAccuracy(px_now,px_at_save,rating)} my_freshness={Math.round(calcFreshness(timestamp))}/>
      </div>
  {/if}
  {/each}
  </div>
