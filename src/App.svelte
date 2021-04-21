<svelte:head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="https://unpkg.com/chota@latest">
</svelte:head>
<script>
  import { onMount } from "svelte";
  export let date;
  import RangeSlider from "svelte-range-slider-pips";
  let api_output ={};

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

}
function updateClipboard(newClip) {
    submitRatings(ticker,show_kelly[0])
  navigator.clipboard.writeText(newClip).then(function() {
    window.open("https://www.robinhood.com/stocks/"+ticker);
  }, function() {
    /* clipboard write failed */
  });
}

function submitRatings(my_ticker,my_ratings) {
    console.log($userInfo["email"]);
    console.log(my_ticker);
    console.log(my_ratings);
    let put_url = 'https://www.insuremystock.com/stocks/setratings/'+my_ticker+'/?user='+$userInfo["email"]+'&ratings='+my_ratings;
    console.log(put_url);
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
.button.primary{
font-size:4rem !important;
}
</style>


<body>


  <Auth0Context domain="dev-gh9on756.us.auth0.com" client_id="lDh9u5tdu1Kk5CkXtZjmjjmUKuGARk0v">
    {#if !$isAuthenticated}
        <Auth0LoginButton class="button text-center error is-full-width is-big" >Login to get personal with the Oracled</Auth0LoginButton>
     {/if}
  </Auth0Context>

<div class="row card">
  <div class="col-1"></div>
  <div class="col-10">
    <iframe width="100%" height="420"  src="https://public.com/stocks/{ticker}/embed" frameborder="0" allow="encrypted-media" allowfullscreen allowtransparency></iframe>
  </div>
    <div class="col-1"></div>
</div>

    <h1> 💎Oracle: Cash allocation given Options & Social outlook</h1>

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
    <td width="20%" ><img src='https://avataaars.io/?avatarStyle=Circle&topType=ShortHairTheCaesarSidePart&accessoriesType=Kurt&hairColor=Brown&facialHairType=BeardMajestic&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Angry&mouthType=Serious&skinColor=Pale'
                            width="50" /> <br> Fat Tony </td>
    <td width="50%"><RangeSlider float pips all='label' disabled={true} bind:values={fat_kelly}  pipstep={10} min={-10} max={10} formatter={ v => moods[v+10] }/></td>
    <td width="30%" class="text-center" style="font-size:4rem;color:purple;">{gain_chance}%</td>
  </tr>
  
     <tr>
        <td width="20%" ><img src='https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraightStrand&accessoriesType=Round&hairColor=Platinum&facialHairType=Blank&clotheType=ShirtVNeck&clotheColor=Pink&eyeType=EyeRoll&eyebrowType=UnibrowNatural&mouthType=Twinkle&skinColor=Tanned'
                                width="50" /><br> Friends </td>
        <td width="50%"><RangeSlider float pips all='label' disabled={true}  bind:values={friend_kelly}  pipstep={10} min={-10} max={10} formatter={ v => moods[v+10] }/></td>
        <td width="30%" class="text-center" style="font-size:4rem;color:purple;">{Math.round(((3*friend_kelly[0]/100)+varx)*100/(1+varx))}%</td>
     </tr>
   {#if $isAuthenticated}
     <tr>
        <td width="20%"> <img src={$userInfo["picture"]} width="50" /> <br> {$userInfo["name"]}</td>
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
	<table>
		<tr>
		    <td width="20%"><a style="color:#168ed7;font-size:2rem;" href="https://twitter.com/share?url={post_url}{ticker}&text={post_title}{ticker}&hashtags={ticker}" class="button fa fa-twitter pull-left"></a></td>
		    <td width="50%" class="text-center" style="font-size:5rem;color:blue;font-weight:bolder;">Cash allocation: {Math.round(show_kelly)}%</td>
		    <td width="30%"><button class="text-white bg-dark pull-right" on:click={updateClipboard(show_kelly)}>Copy-Trade</button></td>
		</tr>
	</table>
	
{#if $isAuthenticated}
	<Auth0Context domain="dev-gh9on756.us.auth0.com" client_id="lDh9u5tdu1Kk5CkXtZjmjjmUKuGARk0v">
	        <Auth0LogoutButton class="button text-center is-full-width is-big" >Logout if your work here is done</Auth0LogoutButton>
	</Auth0Context>
{/if}
</div>



</body>
