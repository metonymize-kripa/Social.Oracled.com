<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.3/css/fontawesome.min.css">
</svelte:head>
<script>
export let my_ticker="SPY";
export let my_rating=49;
export let my_freshness=44;
export let my_accuracy=42;
export let is_hidden = false;
export let rating_id = 0;
export let user_email = "anon@anon.com";
import {createRandomAvataar, createRandomBotAvataar} from './rand_avataar.js';


let cardColor="MintCream";

if (my_rating > 51) {
	cardColor="#e0ffe2";
}
else {
	if (my_rating <49) {
		cardColor="#fbe1e1";
	}
	else {
		cardColor="#f0efff";
	}
}
function handleClick(){
	window.location.href = "/#/stock/"+my_ticker;
}

let is_hidden_class = "fa-minus-circle";
if (is_hidden==true)
	is_hidden_class = 'fa-plus-circle';
console.log(is_hidden);


async function toggleRatings() {
	console.log(rating_id);
    let post_url = 'https://www.insuremystock.com/user/rating/toggle';
	let data ={"user_email":user_email,"id":rating_id,"key":"Fat Neo"};
    fetch(post_url,
    {
        method:"POST",
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(data),
    }).then(d => console.log(d.text()));

}
</script>
<style>
	.contact-card {
		max-width: 450px;
		border: 1px solid #aaa;
		box-shadow: 11px 9px 7px 2px rgb(0 0 0 / 10%);;
		padding: 1em;
		position:relative;
	}
	.contact-card:hover{
		transform: scale(1.1);

	}

	h1 {
		text-align:center;
		font-size: 4rem;;
		color: #00fc;
		margin:0;
	}
	h2{
	color:#c10aa9;
	font-weight:500;
	font-size:4rem;
	margin:0;
	}

	.freshness, .accuracy {
		padding: 0 0 0 2.5em;
		background:  0 50% no-repeat;
		background-size: 1.5em 1.5em;
		margin: 0 0 1em 0;
		line-height: 1.5;
	}
	.small_desc{
	font-size:1rem;
	color:grey;
	justify-content:center;
	margin: 0 auto;
	}
	.child {
	position: absolute;
	width: 2rem;
	height: 2rem;
	top: 0;
	right: 0.5rem;
	cursor:pointer;
}

	.freshness { background-image: url('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/279/sparkles_2728.png') }
	.accuracy { background-image: url('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/279/direct-hit_1f3af.png'); }


</style>

<article class="contact-card" style="background:{cardColor};">
<span class="child" on:click={() => toggleRatings()}><i class="fa {is_hidden_class}"></i></span>
<div ><h1><a style="border-bottom:none;color:#00f;" href="/#/stock/{my_ticker}">{my_ticker}</a></h1></div>

	<div on:click={handleClick} style="display:flex;border-bottom: 1px solid #aaa; margin-bottom:0;">
		<div style="width:40%;"> <img src={createRandomBotAvataar()} /></div><div style="width:50%;" ><h2 style="text-align:right;margin:1rem 0 0 0 ;">{my_rating}%</h2></div>
	</div>
	<!--
	<div><h2 style="text-align:center">{my_rating}%</h2></div>
	-->

	<div  style="display:flex;align-items: center;justify-content:center;">
		<div  style="width:50%">
		<span class="small_desc"> Freshness</span><br>
		<span class="freshness" style="padding:1rem 0 0.5rem 2.5rem;">&nbsp;{my_freshness}%</span>
		</div>
		<div style="width:50%:">
			<span class="small_desc"> Accuracy</span><br>
			<span style="padding:1rem 0 0.5rem 2.5rem;" class="accuracy">{my_accuracy}%</span>
		</div>
	</div>
</article>
