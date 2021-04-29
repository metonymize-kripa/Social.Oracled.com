<script>
export let my_name="Bearfox";
export let my_rating=90;
export let my_freshness="56%";
export let my_accuracy="42%";
import {createRandomAvataar} from './rand_avataar.js';
	
let cardColor="MintCream";
	
if (my_rating > 51) {
	cardColor="LightGreen";
}
else {
	if (my_rating <49) {
		cardColor="LightSalmon";
	}
	else {
		cardColor="MintCream";
	}
}
	
</script>

<style>
	.contact-card {
		width: 250px;
		border: 1px solid #aaa;
		border-radius: 50px;
		box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
		padding: 1em;
	}

	.name, h1 {
		border-bottom: 1px solid #aaa;
		margin: 0 0 1em 0;
		font-size: 50px;
		color: #7d03fc;
	}
	
	h2 {
		text-align: center;
		padding: 0 0 0 1em;
	}

	.freshness, .accuracy {
		padding: 0 0 0 2.5em;
		background:  0 50% no-repeat;
		background-size: 1.5em 1.5em;
		margin: 0 0 1em 0;
		line-height: 1.5;
	}

	.freshness { background-image: url('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/279/sparkles_2728.png') }
	.accuracy   { background-image: url('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/279/direct-hit_1f3af.png') }
</style>

<article class="contact-card">
	<div>
		<h1> <img src={createRandomAvataar()} width = 50/> <strong>{my_rating}%</strong></h1>
	</div>
	<div class="row">
		<div class="col">	
			<div class="freshness">
				{my_freshness}
			</div>
		</div>
		<div class="col">
			<div class="accuracy">
				{my_accuracy}
			</div>
		</div>
	</div>
</article>
