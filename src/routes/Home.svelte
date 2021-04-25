<svelte:head>
  <title>Social traders, Level up -- Home</title>
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
	
  let api_output ={};
  let friend_output={};

  let show_entry_card = true;
  let ticker_array = ['GME','SPY','MELI','TWTR','TSLA']
  const moods = ["Sell","😫","😫","😫","😥","Weak","😥","😐","😐","😐","Hold","😐","😀","😀","😀","Meh","😀","😁","😁","😁","Buy"];
  onMount(async () => {
    //const res = await fetch("/api/date");
    //const newDate = await res.text();
    //date = newDate;
    calculateKelly();
  });
  let err_val = 'no';
  let my_kelly = [0];
  let fat_kelly = [0];
  let friend_kelly = [0];

  let gain_chance=0;
  let ticker = 'TSLA';
  let varx = 0;
  let new_ticker= 'TSLA';
function currencyFormat(num,decimals) {
  return num.toFixed(decimals).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function calculateKelly() {
    ticker = ticker.toUpperCase();
    fetch("https://www.insuremystock.com/options/kelly/"+ticker)
        .then(d => d.text())
        .then(d =>
        {
            api_output = JSON.parse(d);
            if ('error' in api_output)
                err_val="error";
            else
            {
                console.log(api_output);

                fat_kelly = [(api_output.kelly2/1.75*100)];
                gain_chance = Math.round(api_output.prob_up*100);
                varx = api_output.prob_up_n/api_output.prob_down_n;
                if (fat_kelly > 10)
                {
                    fat_kelly = [10];
                    //gain_chance = Math.round( 100*(0.03*varx*10+1)/(1+varx) ) ;

                }
                else if (fat_kelly < -10)
                {
                    fat_kelly = [-10];
                    //gain_chance = Math.round( 100*(0.03*varx*-10+1)/(1+varx) )
                }

            }
        });
    fetch("https://www.insuremystock.com/stocks/getratings/"+ticker)
        .then(d => d.text())
        .then(d =>
        {
            friend_output = JSON.parse(d);
            console.log(friend_output);
            if ('error' in friend_output)
                err_val="error";
            else
            {
                friend_kelly = [friend_output.Rating];

            }

        });
    getMyRating($userInfo["email"]);
}

function changeTicker(){

    my_kelly = 0;
    fat_kelly=[0];
    friend_kelly=[0];
    gain_chance = "NA";
    varx = 0;
    ticker = new_ticker;
    calculateKelly();
    show_entry_card = false;
    if ($isAuthenticated)
	    getMyRating($userInfo["email"]);
}

function GoBack(){
show_entry_card = true;
}

function getMyRating(user_email){
    var my_url = 'https://www.insuremystock.com/stocks/getuserratings/'+ticker.replace(/\s/g, '') +'/?secret_key=Fat Neo&user_email='+user_email;
    my_kelly = [0];

    fetch(my_url)
        .then(d => d.text())
        .then(d =>
        {
            api_output = JSON.parse(d);
            if ('error' in api_output)
                err_val="error";
            else
            {
                my_kelly = [api_output.Rating];
            }
        });
}
function updateClipboard(newClip) {
    submitRatings(ticker,my_kelly[0])
  navigator.clipboard.writeText(newClip).then(function() {
    window.open("https://www.robinhood.com/stocks/"+ticker);
  }, function() {
    /* clipboard write failed */
  });
}

function shareWith() {
    submitRatings(ticker,my_kelly[0]);
    window.open("https://twitter.com/share?url="+post_url+ticker+"&text="+post_title+ticker+"&hashtags="+ticker);
}

function calculateGains(kelly,varx)
{
    var ret_val='NA';
    if (varx != 0)
        ret_val =  Math.round( 100*(0.03*varx*kelly+1)/(1+varx) );
    return ret_val;
}

function submitRatings(my_ticker,my_ratings) {

    let put_url = "https://www.insuremystock.com/stocks/setratings/"+my_ticker+"/?secret_key=Fat Neo&user="+$userInfo["email"]+"&ratings="+my_ratings;
    console.log(put_url);

    fetch(put_url,
    {
        method:"PUT",
        headers: {
            'Content-Type': 'application/json',
          },

    }).then(d => console.log(d.text()));

}

let post_url = encodeURIComponent("https://upshot.oracled.com/#/stock/")
let post_title =  encodeURIComponent("Here's the upshot for ");
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

<Auth />

<Auth0Context domain="dev-gh9on756.us.auth0.com" client_id="lDh9u5tdu1Kk5CkXtZjmjjmUKuGARk0v">
    <div class="row">
	    {#if !$isAuthenticated}
		<div class="col-9"><h1>💎Oracle Upshot</h1></div>
		<div class="col-3">
		    <Auth0LoginButton class="button text-center error is-full-width is-big" >Login</Auth0LoginButton>
		</div>
	    {:else}
		    <div class="col-9"><h1>💎Oracle Upshot</h1></div>
		    <div class="col-3 hide-xs">
			 <span class="tag is-large">Welcome {$userInfo["nickname"]}</span>
		     </div>
			{getMyRating($userInfo["email"]) || ""}
	    {/if}
    </div>
  </Auth0Context>

{#if show_entry_card}
    <div class="card" >
    <div class="row">

        <div class="col-8 " >
            <h3>Top picks</h3>
            {#each ticker_array as tx}
                <button class="button"  style="font:1rem;padding:0.8rem; margin:0.2rem; background:#351eb5;color:white;" on:click={e => new_ticker=tx}>{tx}</button>

            {/each}
        </div>
        <div class="col-4" >
            <h3>Or Enter Symbol</h3>
            <input  class="text-uppercase" bind:value={new_ticker}/>
        </div>

      </div>
      <!--
      <button class="button is-center" style="width:50%; margin:2rem auto;color:white;background:#c10aa9;padding:1.5rem;font-size:2rem;font-weight:700;"  on:click={changeTicker}> Click to find out </button>
      -->
      <a href="/#/stock/{new_ticker}" class="button is-center" style="width:50%; margin:2rem auto;color:white;background:#c10aa9;padding:1.5rem;font-size:2rem;font-weight:700;"> Get Upshot </a>

      <div class="row">
	   <iframe width="90%" style="margin-left:5%" height=420 src="https://public.com/stocks/{new_ticker}/embed" frameborder="0" allow="encrypted-media" allowfullscreen allowtransparency></iframe>
      </div>
      <div class="row">


      </div>

    </div>

{:else}

	<div class="row card">
	<h3> Upshot for {ticker} using Options & Social data</h3>
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
		     <td width="20%" ><img src='pals.png' width="50"/><br> Friends </td>
		     <td width="50%"><RangeSlider float pips all='label' disabled={true}  bind:values={friend_kelly}  pipstep={10} min={-10} max={10} formatter={ v => moods[v+10] }/></td>
		     <td width="30%" class="text-center" style="font-size:4rem;color:purple;">{Math.round(50+friend_kelly[0]*1.75)}%</td>
		   </tr>
		   {#if $isAuthenticated}
			     <tr>
				<td width="20%" ><img src='https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Prescription02&hairColor=BrownDark&facialHairType=Blank&clotheType=GraphicShirt&clotheColor=Red&graphicType=Diamond&eyeType=Surprised&eyebrowType=RaisedExcited&mouthType=Twinkle&skinColor=Light'
							width="50" /><br> {$userInfo["nickname"]} </td>
			<!--
				<td width="20%"> <img src={$userInfo["picture"]} width="50" /> <br> {$userInfo["nickname"]}</td>
			-->
				<td width="50%"><RangeSlider float pips all='label'  bind:values={my_kelly}  pipstep={10} min={-10} max={10} formatter={ v => moods[v+10] }/></td>
				<td width="30%" class="text-center" style="font-size:4rem;color:purple;">{Math.round(50+my_kelly[0]*1.75)}%</td>
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
		<h3 > Use the {ticker} Upshot</h3>
		<table>
			<tr>
			    <td width="20%"><button class="fa fa-twitter pull-left text-white" style="background:#c10aa9;" on:click={shareWith}> &nbsp;&nbsp; Share</td>
			    <td width="60%" class="text-center" style="font-size:3rem;color:blue;font-weight:bolder;">Use {Math.round(my_kelly[0])}% now</td>
			    <td width="20%"><button class="text-white" style="background:#c10aa9;" on:click={updateClipboard(my_kelly[0])}>Copy-Trade</button></td>
			</tr>
		</table>
        <button class="button is-center" style="width:50%; margin:2rem auto;color:white;background:#4a27b1;padding:1rem;font-size:2rem;font-weight:700;"  on:click={GoBack}> Go Back </button>
        <!--
			<Auth0Context domain="dev-gh9on756.us.auth0.com" client_id="lDh9u5tdu1Kk5CkXtZjmjjmUKuGARk0v">
				<Auth0LogoutButton class="button text-center is-full-width is-big" >Logout once your work here is done</Auth0LogoutButton>
			</Auth0Context>
        -->
	</div>

{/if}

</body>
