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
		border-radius: 2px;
		box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
		padding: 1em;
	}

	.name, h2 {
		padding: 0 0 0.2em 0;
		margin: 0 0 1em 0;
		background:  0 50% no-repeat;
		background-size: 1em 1em;
		border-bottom: 1px solid #ff3e00
	}

	.address, .email {
		padding: 0 0 0 1.5em;
		background:  0 50% no-repeat;
		background-size: 1em 1em;
		margin: 0 0 0.5em 0;
		line-height: 1.2;
	}

	.name { background-image: url('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/279/face-with-raised-eyebrow_1f928.png') }
	.address { background-image: url('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/279/fire_1f525.png') }
	.email   { background-image: url('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/279/incoming-envelope_1f4e8.png') }
	.missing { color: #999 }
</style>

<article class="contact-card">
	
	<div class="name">
		<slot name={my_name}>
			<span class="missing">Unknown name</span>
		</slot>
	</div>

	<div class="address">
		<slot name={my_status}>
			<span class="missing">Unknown address</span>
		</slot>
	</div>

	<div class="email">
		<slot name={accuracy}>
			<span class="missing">Unknown email</span>
		</slot>
	</div>
</article>
