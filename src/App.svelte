<svelte:head>
	<title>Social traders, Level up</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="https://unpkg.com/chota@latest">
</svelte:head>
<script>
  import { onMount } from "svelte";
  import Avatar from "svelte-avatar";
  export let date;
  import RangeSlider from "svelte-range-slider-pips";
  let api_output ={};
	
  let show_entry_card = true;
  let ticker_array_wsb = ['GME ','AMC ','SPY ','PLTR']
  let ticker_array_gvip = ['MELI','TWTR','IAC ','TSLA']

  const moods = ["Sell","😫","😫","😫","😥","Weak","😥","😐","😐","😐","Hold","😐","😀","😀","😀","Meh","😀","😁","😁","😁","Buy"];

  onMount(async () => {
    const res = await fetch("/api/date");
    const newDate = await res.text();
    date = newDate;
    calculateKelly();

  });
  var my_kelly = [0];
  var show_kelly = [0];
  var fat_kelly = [0];
  var friend_kelly = [0];
  let gain_chance=0;
  let ticker = 'TSLA';
  let varx = 0;
  let new_ticker= 'TSLA';

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

function currencyFormat(num,decimals) {
  return num.toFixed(decimals).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
function calculateKelly() {
    
    my_kelly = "no";
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
function changeTicker(){
    ticker = new_ticker;
    calculateKelly();
    if ($isAuthenticated)
	    getMyRating($userInfo["email"]);

}

function getMyRating(user_email){
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
    submitRatings(ticker,show_kelly[0])
  navigator.clipboard.writeText(newClip).then(function() {
    window.open("https://www.robinhood.com/stocks/"+ticker);
  }, function() {
    /* clipboard write failed */
  });
}

function shareWith() {
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
	
{#if show_entry_card}
    <div class="card col-8 bg-light" >
      <header>
        <h4>Select from popular stock</h4>
        {#each ticker_array_wsb as tx}
            <button class="secondary button"  style="font:1.5rem;padding:1rem 0.8rem" on:click={e => new_ticker=tx}>{tx}</button>
        {/each}
        <br>
        {#each ticker_array_gvip as tx}
            <button class="secondary button"  style="font:1.5rem;padding:1rem 0.8rem" on:click={e => new_ticker=tx}>{tx}</button>
        {/each}
      </header>
      <div class="row">
          <div class="col-6"> Or enter symbol:</div>
         <!-- <div class="col-6"> Your portfolio size:</div> -->
      </div>
      <div class="row">
          <div class="col-7 text-uppercase"> <input bind:value={new_ticker} autofocus/></div>
	  <div class="col-5"><button class="button primary" on:click={changeTicker}> GO </button></div>
         <!--  <div class="col-6"> <input bind:value={portfolio_size}/></div> -->
      </div>
    </div>
{/if}

  <Auth0Context domain="dev-gh9on756.us.auth0.com" client_id="lDh9u5tdu1Kk5CkXtZjmjjmUKuGARk0v">
    <div class="row">
    {#if !$isAuthenticated}
	    <h1>💎Oracle, How much should I buy?</h1>
        <div class="col-5">
            <Auth0LoginButton class="button text-center error is-full-width is-big" >Login to get Oracled</Auth0LoginButton>
        </div>        
    {:else}
    <div class="col-2"><h1>💎Oracle, How much should I buy?</h1></div>
    <div class="col-3 hide-xs">
         <span class="tag is-large">Welcome {$userInfo["nickname"]}</span>
     </div>  
	{getMyRating($userInfo["email"]) || ""}
    {/if}
    </div>
  </Auth0Context>
	
<h3> Size {ticker} trade for Options & Social implied odds</h3>

<div class="row card">
<table>
<thead>
  <tr>
    <th width="20%" ></th>
    <th width="50%" class="text-center">% of cash to trade now</th>
    <th width="30%" class="text-center is-large">1Wk Gain Odds</th>
  </tr>
</thead>
  <tr>
    <td width="20%" ><img src='https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairTheCaesarSidePart&accessoriesType=Kurt&hairColor=Brown&facialHairType=BeardMajestic&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Angry&mouthType=Serious&skinColor=Pale'
                            width="50" /> <br> Fat Tony </td>
    <td width="50%"><RangeSlider float pips all='label' disabled={true} bind:values={fat_kelly}  pipstep={10} min={-10} max={10} formatter={ v => moods[v+10] }/></td>
    <td width="30%" class="text-center" style="font-size:4rem;color:purple;">{gain_chance}%</td>
  </tr>
  
     <tr>
 <!--
<td width="20%" ><img src='https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraightStrand&accessoriesType=Round&hairColor=Platinum&facialHairType=Blank&clotheType=ShirtVNeck&clotheColor=Pink&eyeType=EyeRoll&eyebrowType=UnibrowNatural&mouthType=Twinkle&skinColor=Tanned'
                                width="50" /><br> Friends </td>
-->
	<td width="20%" ><img src='pals.png' width="50"/><br> Friends </td>
        <td width="50%"><RangeSlider float pips all='label' disabled={true}  bind:values={friend_kelly}  pipstep={10} min={-10} max={10} formatter={ v => moods[v+10] }/></td>
        <td width="30%" class="text-center" style="font-size:4rem;color:purple;">{Math.round(((3*friend_kelly[0]/100)+varx)*100/(1+varx))}%</td>
     </tr>
   {#if $isAuthenticated}
     <tr>
	<td width="20%" ><img src='https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Prescription02&hairColor=BrownDark&facialHairType=Blank&clotheType=GraphicShirt&clotheColor=Red&graphicType=Diamond&eyeType=Surprised&eyebrowType=RaisedExcited&mouthType=Twinkle&skinColor=Light'
                                width="50" /><br> {$userInfo["nickname"]} </td>
<!--
        <td width="20%"> <img src={$userInfo["picture"]} width="50" /> <br> {$userInfo["nickname"]}</td>
-->
        <td width="50%"><RangeSlider float pips all='label'  bind:values={show_kelly}  pipstep={10} min={-10} max={10} formatter={ v => moods[v+10] }/></td>
        <td width="30%" class="text-center" style="font-size:4rem;color:purple;">{Math.round(((3*show_kelly/100)+varx)*100/(1+varx))}%</td>
     </tr>
  {:else}
   <tr> <td colspan="3">
   <Auth0Context domain="dev-gh9on756.us.auth0.com" client_id="lDh9u5tdu1Kk5CkXtZjmjjmUKuGARk0v">
        <Auth0LoginButton class="button text-center  outline primary is-full-width is-big" >Login to get Oracled</Auth0LoginButton>
   </Auth0Context>
   </td></tr>
  {/if}
</table>
</div>
	
<div class="row card">
	<h3 > Given {ticker} pricing odds, keep some tradeable cash for later</h3>
	<table>
		<tr>
		    <td width="15%"><button class="fa  fa-twitter pull-left bg-dark text-white" on:click={updateClipboard(show_kelly)}> &nbsp;&nbsp; Share</td>
		    <td width="70%" class="text-center" style="font-size:3rem;color:blue;font-weight:bolder;">Use {Math.round(show_kelly)}% now</td>
		    <td width="15%"><button class="text-white  bg-dark pull-right" on:click={shareWith}>Copy-Trade</button></td>
		</tr>
	</table>
		<iframe width="90%" style="margin-left:5%" height=420 src="https://public.com/stocks/{ticker}/embed" frameborder="0" allow="encrypted-media" allowfullscreen allowtransparency></iframe>

		<Auth0Context domain="dev-gh9on756.us.auth0.com" client_id="lDh9u5tdu1Kk5CkXtZjmjjmUKuGARk0v">
			<Auth0LogoutButton class="button text-center is-full-width is-big" >Logout once your work here is done</Auth0LogoutButton>
		</Auth0Context>

</div>
	
</body>
