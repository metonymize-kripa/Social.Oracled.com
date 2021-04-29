<script>
export let my_name="Bearfox";
export let my_freshness="56%";
export let my_accuracy="42%";
import {createRandomAvataar} from './rand_avataar.js';
</script>

<style>
	.contact-card {
		width: 300px;
		border: 1px solid #aaa;
		border-radius: 10px;
		box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
		padding: 1em;
	}

	.name, h2 {
		border-bottom: 2px solid ##461be4;
	}

	.freshness, .accuracy {
		padding: 0 0 0 2em;
		background:  0 50% no-repeat;
		background-size: 2em 2em;
		margin: 0 0 0.5em 0;
		line-height: 1.2;
	}

	.name { background-image: url('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/279/face-with-raised-eyebrow_1f928.png') }
	.freshness { background-image: url('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/279/sparkles_2728.png') }
	.accuracy   { background-image: url('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/279/direct-hit_1f3af.png') }
</style>

<article class="contact-card">
	
	<div>
		<h2> <img src={createRandomAvataar()} width = 50/> {my_name}</h2>
	</div>

	<div class="freshness">
		{my_freshness}
	</div>

	<div class="accuracy">
		{my_accuracy}
	</div>
</article>
