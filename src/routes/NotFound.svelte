<script>

import {push, pop, replace} from 'svelte-spa-router'
import ContactCard from './utils/UserCard.svelte';
import TickerCard from './utils/TickerCard.svelte';
  
</script>

<h2>NotFound</h2>

<button on:click={() => push('/stock/spy')}>Click to start with SPY</button>

<br>

<ContactCard my_name="Harmeet" my_status="SuperMan" accuracy=80 followers=1256/>
<TickerCard ticker="IBM" rating=56 accuracy=80 freshness=1256/>


<!--
<ContactCard>
	<span slot="name">
		Bearfox
	</span>

	<span slot="address">
		My sincere apologies
	</span>
	
	<span slot="email">
		upshot@oracled.com
	</span>
</ContactCard>
-->
