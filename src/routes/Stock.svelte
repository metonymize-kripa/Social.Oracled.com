<svelte:head>
  <title>Stock</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="https://unpkg.com/chota@latest">
</svelte:head>

<script>
  import { onMount } from "svelte";
  import Avatar from "svelte-avatar";

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
  $overview_class = 'active';
  $rating_class = '';
  $user_class = '';



  let api_output ={};
  let friend_output={};
  export let params = {}

  //const moods = ["Bear","😫","😫","😫","😫","😫","😫","😫","😫","😫","😫","😫","😫","😫","😫","😫","😫","😫","😫","😫","😫","😫","😥","😫","😫","😥","😥","😥","😥","😥","😥","😥","😥","😥","😥","😥","😥","😥","😥","😥","😥","😥","😥","😥","😥","😥","😥","😐","😐","😐""😐","😐","😐""😐","😐","😐""😐","😐","😐""😐","😐","😐""😐","😐","😐","Hold","😀","😀","😀","😀","😀","😀","😀","😀","😀","😀","😀","😀","😀","😀","😀","😀","😀","😀","Meh","😀","😁","😁","😁","😀","😁","😁","😁","😀","😁","😁","😀","😁","😁","😁","😀","😁","😁","😁","Bull"];

  onMount(async () => {
    //const res = await fetch("/api/date");
    //const newDate = await res.text();
    //date = newDate;
    calculateKelly();
  });

let err_val = 'no';
let my_kelly = [0];
let fat_kelly = [0];
let twitter_says = [0];
let wsb_says = [0];
let friend_kelly = [0];

let gain_chance=[0];

let ticker = params.symbol;
$nav_ticker = ticker;


$: params.symbol && calculateKelly();
let varx = 0;

function currencyFormat(num,decimals) {
  return num.toFixed(decimals).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function calculateKelly() {
    my_kelly = [0];
    fat_kelly=[0];
    friend_kelly=[0];
    gain_chance = [0];
    varx = 0;
    if (params.symbol === null)
      params.symbol = 'SPY';
    ticker = params.symbol;

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
                    fat_kelly = [(api_output.kelly_k*100)];
                    gain_chance = [Math.round(api_output.prob_up*100)];
                    varx = api_output.prob_up_n/api_output.prob_down_n;
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
                    friend_kelly = [friend_output.rating];
                }
            });
        getMyRating($userInfo["email"]);
        getTwitterRating("$"+ticker);
        getWSBRating(ticker);
        //console.log(trating);
        //twitter_says = [Math.round((getTwitterRating("$"+ticker)+1)/0.02)];
}

function getMyRating(user_email){
    var my_url = 'https://www.insuremystock.com/stocks/getuserratings/'+ticker+'/?secret_key=Fat Neo&user_email='+user_email;
    my_kelly = [0];

    fetch(my_url)
        .then(d => d.text())
        .then(d =>
        {
            var output = JSON.parse(d);
            if ('error' in output)
                err_val="error";
            else
            {
                my_kelly = [output.rating];
                console.log(output);
            }
        });
}

function getTwitterRating(symbol){
    let my_url = 'https://insuremystock.com/sentiment/twitter/'+symbol;
    let twitter_rating = 0;

    fetch(my_url)
        .then(d => d.text())
        .then(d =>
        {
            var output = JSON.parse(d);
            if ('error' in output)
                err_val="error";
            else
            {
                twitter_rating = output.twitter_index;
                console.log(output);
                twitter_says = [Math.round((twitter_rating+100)/2)];
            }
        });
}

function getWSBRating(symbol){
    let my_url = 'https://api.fatneo.com/parse/'+symbol+' WSB';
    let wsb_rating = 0;

    fetch(my_url)
        .then(d => d.text())
        .then(d =>
        {
            var output = JSON.parse(d);
            if ('error' in output)
                err_val="error";
            else
            {
                wsb_rating = output.skill_output;
                console.log(output);
                wsb_says = [Math.round(wsb_rating*100+50)];
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
    console.log(ticker);
    submitRatings(ticker,my_kelly[0]);
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
function calculateGains(kelly,varx)
{
    var ret_val='NA';
    if (varx != 0)
        ret_val =  Math.round( 100*(0.03*varx*kelly+1)/(1+varx) );
    return ret_val;
}
let post_url = encodeURIComponent("https://upshot.oracled.com/#/stock/")
let post_title =  encodeURIComponent("Here's the upshot for ");
$: twitter_says;
</script>

<style>
  .myrating{
  font-size:4rem;
  color:#00f;
  font-weight:500
  }
</style>

	<div class="row ">
	<table>
		<thead>
		  <tr>
			  <th width="100%" colspan="3" class="text-center"><h1>Chance {ticker} goes up</h1></th>
		  </tr>
		</thead>
		  <tr>
		    <td width="20%" class="text-center"><img href="/" src='https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairTheCaesarSidePart&accessoriesType=Kurt&hairColor=BrownDark&facialHairType=BeardMajestic&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Angry&mouthType=Serious&skinColor=Pale'
					    width="50"/><br><span style="font-size:1.2rem;color:navy;">OptionsData</span></td>
		    <td width="60%"><RangeSlider float pips all='label' disabled={true} bind:values={gain_chance}  pipstep={50} min={0} max={100} /></td>
		    <td width="20%" class="text-center myrating" >{gain_chance}%</td>
		  </tr>

           <tr>
		     <td width="20%" class="text-center" ><img href="/" src='https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairTheCaesarSidePart&accessoriesType=Kurt&hairColor=Blonde&facialHairType=BeardMajestic&facialHairColor=Blonde&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Angry&mouthType=Serious&skinColor=Pale'
 					    width="50"/><br><span style="font-size:1.2rem;color:navy;">TwitterData</span></td>
		     <td width="60%"><RangeSlider float pips all='label' disabled={true}  bind:values={twitter_says}  pipstep={50} min={0} max={100} /></td>
		     <td width="20%" class="text-center myrating" >{twitter_says}%</td>
		   </tr>
           <tr>
		     <td class="text-center" width="20%" ><img href="/" src='https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairTheCaesarSidePart&accessoriesType=Kurt&hairColor=PastelPink&facialHairType=BeardMajestic&facialHairColor=Red&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Angry&mouthType=Serious&skinColor=Pale'
 					    width="50"/><br><span style="font-size:1.2rem;color:navy;">RedditData</span></td>
		     <td width="60%"><RangeSlider float pips all='label' disabled={true}  bind:values={wsb_says}  pipstep={50} min={0} max={100} /></td>
		     <td width="20%" class="text-center myrating" >{wsb_says}%</td>
		   </tr>
		   {#if $isAuthenticated}
			     <tr>
				<a class="text-center" href="/#/user/{$userInfo["email"]}"><td width="20%" ><img src='https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Prescription02&hairColor=BrownDark&facialHairType=Blank&clotheType=GraphicShirt&clotheColor=Red&graphicType=Diamond&eyeType=Surprised&eyebrowType=RaisedExcited&mouthType=Twinkle&skinColor=Light'
							width="50" /><br> <span style="font-size:1.2rem;color:navy;"> MyView</span> </td></a>

				<td width="60%"><RangeSlider float pips all='label'  bind:values={my_kelly}  pipstep={50} min={0} max={100} /></td>
				<td width="20%" class="text-center myrating" >{my_kelly}%</td>
			     </tr>
                 <tr>
      		     <a class="text-center" href="/#/user/{ticker}/me"><td width="20%" ><img src='pals.png' width="50"/><br><span style="font-size:1.2rem;color:navy;"> MyPals </span></td></a>
      		     <td width="60%"><RangeSlider float pips all='label' disabled={true}  bind:values={friend_kelly}  pipstep={50} min={0} max={100} /></td>
      		     <td width="20%" class="text-center myrating" >{friend_kelly}%</td>
      		   </tr>
         {:else}
         <tr>
         <td colspan="3" width="100%"><h3 class="text-center">Login for saved ratings, yours and friends</h3></td>
          </tr>
          <tr>
          <td colspan="3" width="80%">

                <Auth0LoginButton style="margin:0 3rem;" class="button text-center is-full-width text-center error">Login</Auth0LoginButton>

             </td>
             </tr>
		  {/if}
	</table>
	</div>

	<div class="row ">
		<table>
			<tr>
			    <td width="50%"><button class="text-white text-center"  style="background:#c10aa9; margin-left:10%; border-radius: 20rem;" on:click={submitRatings(ticker,my_kelly[0])}>Save</td>
			    <td width="50%"><button class="text-white pull-right" style="background:#c10aa9; margin-right:10%;border-radius: 20rem;" on:click={updateClipboard(my_kelly)[0]}>Copy-Trade</button></td>
			</tr>
		</table>

	</div>
