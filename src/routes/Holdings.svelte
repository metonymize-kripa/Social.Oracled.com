<svelte:head>
  <title>Friends of the Oracle</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="https://unpkg.com/chota@latest">
</svelte:head>

<script>
  import { onMount } from "svelte";
  import {createRandomAvataar} from './utils/rand_avataar.js';
  import {push, pop, replace} from 'svelte-spa-router'
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

let gain_chance=[0];
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
 
  let user_array = ['FatTony','Pappe','Kripa','Pani', 'Harsha','Brad','Sunil','Deba'];

  export let params = {}

  let user = params.name;
  let ticker = params.symbol.toUpperCase();
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


$: params.name && params.symbol && getGainChance() ; 

let arrow = ['⬆','⬇'];
let rand_list=[];
for (var i=0;i<40;i++)
    rand_list.push([Math.round(Math.random() * (96 - 33) + 33)]);

let rand1 =  [Math.round(Math.random() * (96 - 33) + 33)];
let rand2 =  [Math.round(Math.random() * (96 - 33) + 33)];



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

<body>
    <h2> Welcome {user}!</h2>

     <div class="row card">
	    <table>
		    <thead>
		      <tr>
		        <th width="100%" colspan="3" class="text-center">This is your friends view on {ticker}</th>
		      </tr>
		    </thead>
		      <tr>
		        <a class="text-center" href="/#/user/FatTony"><td width="20%" ><img href="/" src='https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairTheCaesarSidePart&accessoriesType=Kurt&hairColor=Brown&facialHairType=BeardMajestic&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Angry&mouthType=Serious&skinColor=Pale'
					        width="50"/><br><span style="font-size:1.2rem;color:navy;"> Mr.Options Says </span></td></a>
		        <td width="60%"><RangeSlider float pips all='label' disabled={true} bind:values={gain_chance}  pipstep={50} min={0} max={100} }/></td>
		        <td width="20%" class="text-left" style="font-size:3rem;color:purple;">{gain_chance}%({arrow[Math.round(Math.random() * +1)]})</td>
		      </tr>
		      {#each shuffle(user_array).slice(1,5) as peep,i}
		       <tr>
		         <a class="text-center" href="/#/user/{peep}"><td width="20%" ><img src={createRandomAvataar()} width = 50/><br><span style="font-size:1.2rem;color:navy;"> {peep}</span></td></a>
		         <td width="60%"><RangeSlider float pips all='label' disabled={true}  bind:values={rand_list[i]}  pipstep={50} min={0} max={100}  }/></td>
		         <td width="20%" class="text-left" style="font-size:3rem;color:purple;">{rand_list[i]}%({arrow[Math.round(Math.random() * +1)]})</td>
		       </tr>
		       {/each}
		       {#if $isAuthenticated}
			         <tr>
				    <a class="text-center" href="/#/user/Me"><td width="20%" ><img src='https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Prescription02&hairColor=BrownDark&facialHairType=Blank&clotheType=GraphicShirt&clotheColor=Red&graphicType=Diamond&eyeType=Surprised&eyebrowType=RaisedExcited&mouthType=Twinkle&skinColor=Light'
							    width="50" /><br> <span style="font-size:1.2rem;color:navy;"> I believe</span> </td></a>

				    <td width="60%"><RangeSlider float pips all='label'  bind:values={rand1}  pipstep={50} min={0} max={100} /></td>
				    <td width="20%" class="text-left" style="font-size:3rem;color:purple;">{rand1}%({arrow[Math.round(Math.random() * +1)]})</td>
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
      

 </body>
