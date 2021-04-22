<svelte:head>
  <title>Social traders, Level up -- Stock </title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="https://unpkg.com/chota@latest">
</svelte:head>

<script>
  import { onMount } from "svelte";
  import Avatar from "svelte-avatar";
  import RangeSlider from "svelte-range-slider-pips";	
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
  // The params prop contains values matched from the URL
  export let params = {}
  let api_output ={};
	
  const moods = ["Sell","😫","😫","😫","😥","Weak","😥","😐","😐","😐","Hold","😐","😀","😀","😀","Meh","😀","😁","😁","😁","Buy"];
  onMount(async () => {
    const res = await fetch("/api/date");
    const newDate = await res.text();
    date = newDate;
    ticker = params.symbol;
    calculateKelly();
  });
  var my_kelly = [0];
  var show_kelly = [0];
  var fat_kelly = [0];
  var friend_kelly = [0];
  let gain_chance=0;
  let ticker = 'TSLA';
  let varx = 0;
	
function currencyFormat(num,decimals) {
  return num.toFixed(decimals).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
	
function calculateKelly() {
    my_kelly = "no";
    ticker = params.symbol;
    ticker = ticker.toUpperCase();
    fetch("https://www.insuremystock.com/options/kelly/"+ticker)
        .then(d => d.text())
        .then(d =>
        {
            api_output = JSON.parse(d);
            console.log(api_output);
            if ('error' in api_output)
                my_kelly="error";
            else
            {
                show_kelly = [(api_output.kelly_k*100)];
                my_kelly = (api_output.kelly_k);
                friend_kelly = [(api_output.kelly_k*100-2)];
                fat_kelly = [(api_output.kelly_k*100)];
                gain_chance = Math.round(api_output.prob_up*100);
                varx = api_output.prob_down_n/api_output.prob_up_n;
            }
        });
    fetch("https://www.insuremystock.com/stocks/getratings/"+ticker)
        .then(d => d.text())
        .then(d =>
        {
            api_output = JSON.parse(d);
            console.log(api_output);
            if ('error' in api_output)
                my_kelly="error";
            else
            {
                friend_kelly = [api_output.Rating];
            }
        });
   getMyRating($userInfo["email"]);
}
	
function getMyRating(user_email){
    ticker = params.symbol;
    var my_url = 'https://www.insuremystock.com/stocks/getuserratings/'+ticker+'/?secret_key=Fat Neo&user_email='+user_email;
    console.log($userInfo);
    fetch(my_url)
        .then(d => d.text())
        .then(d =>
        {
            api_output = JSON.parse(d);
            console.log(api_output);
            if ('error' in api_output)
                my_kelly="error";
            else
            {
                show_kelly = [(api_output.Rating)];
                my_kelly = (api_output.Rating);
            }
        });
}
	
function updateClipboard(newClip) {
  ticker = params.symbol;
  submitRatings(ticker,show_kelly[0])
  navigator.clipboard.writeText(newClip).then(function() {
    window.open("https://www.robinhood.com/stocks/"+ticker);
  }, function() {
    /* clipboard write failed */
  });
}
function shareWith() {
    ticker = params.symbol;
    submitRatings(ticker,show_kelly[0]);
    window.open("https://twitter.com/share?url="+post_url+ticker+"&text="+post_title+ticker+"&hashtags="+ticker);
}
function submitRatings(my_ticker,my_ratings) {
    let put_url = 'https://www.insuremystock.com/stocks/setratings/'+my_ticker+'/?secret_key=Fat Neo&user='+$userInfo["email"]+'&ratings='+my_ratings;
    fetch(put_url,
    {
        method:"PUT",
        headers: {
            'Content-Type': 'application/json',
          }, 
    }).then(d => console.log(d.text()));	
}
let post_url = encodeURIComponent("https://social.oracled.com/?symbol=");
let post_title =  encodeURIComponent("Social and options data made into actionable trade timing/size picks for ");
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
	:global(.rangeSlider){
	    background-color:#e909ec !important;
	}
	:global(.rangeSlider.disabled){
	    background-color:#fe92ff !important;
	}
	:global(.rangeSlider.disabled .rangeNub ){
	     background-color:#6500c1 !important;
	}
	:global(.rangeSlider .rangeNub ){
	     background-color:#68328a !important;
	}
</style>


<body>	
	
  <Auth0Context domain="dev-gh9on756.us.auth0.com" client_id="lDh9u5tdu1Kk5CkXtZjmjjmUKuGARk0v">
    <div class="row">
	    {#if !$isAuthenticated}
		<div class="col-9"><h1>💎Oracle, How much should I buy?</h1></div>
		<div class="col-3">
		    <Auth0LoginButton class="button text-center error is-full-width is-big" >Login</Auth0LoginButton>
		</div>        
	    {:else}
		    <div class="col-9"><h1>💎Oracle, How much should I buy?</h1></div>
		    <div class="col-3 hide-xs">
			 <span class="tag is-large">Welcome {$userInfo["nickname"]}</span>
		     </div>  
			{getMyRating($userInfo["email"]) || ""}
	    {/if}
    </div>
  </Auth0Context>

<h2>Hi there!</h2>

<p>
    Your route is:
    <b>{params.symbol}</b>
    <b>{#if params.cmd}{params.cmd}{/if}</b>
	
	<b>ticker:{ticker}, fatkelly:{fat_kelly}</b>
</p>
	
</body>
