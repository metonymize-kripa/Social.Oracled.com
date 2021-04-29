<script>
export let my_email="Bearfox@";
export let my_rating=49;
export let my_freshness=44;
export let my_accuracy=42;
import {createRandomAvataar} from './rand_avataar.js';

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
	window.location.href = "/#/user/"+my_email;
}
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

	h1 {

		font-size: 4rem;
		color: #00fc;
	}

	h2 {
		text-align: center;
		font-size: 3rem;
		color: #aaa;
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

	.freshness { background-image: url('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/279/sparkles_2728.png') }
	.accuracy { background-image: url('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/279/direct-hit_1f3af.png'); }
</style>

<article on:click={handleClick} class="contact-card" style="background:{cardColor};">
<h2 style="margin-bottom:0;color:#e218c8;">{my_email.split('@')[0]}</h2>
	<div style="display:flex;border-bottom: 1px solid #aaa; margin-bottom:0;">
		<div style="width:40%;"> <img src={createRandomAvataar()} /></div><div style="width:50%;" ><h1 style="text-align:right;margin:1rem 0 0 0 ;">{my_rating}%</h1></div>
	</div>
	<!-- <div class="row"><h2>{my_name}</h2></div> -->
	<div style="display:flex;align-items: center;justify-content:center;">
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
