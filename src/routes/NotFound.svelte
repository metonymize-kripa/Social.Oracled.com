<script>

import {push, pop, replace} from 'svelte-spa-router'
import ContactCard from './utils/ContactCard.svelte';
  
</script>

<h2>NotFound</h2>

<button on:click={() => push('/stock/spy')}>Click to start with SPY</button>

<br>

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
