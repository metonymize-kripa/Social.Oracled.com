<svelte:head>
	<title>Page Not Found</title>
	<link rel="preconnect" href="https://fonts.gstatic.com">
	<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap" rel="stylesheet">
</svelte:head>

<script>
import {push, pop, replace} from 'svelte-spa-router'
//import ContactCard from './utils/UserCard.svelte';
import ContactCard from './utils/ContactCard.svelte';
import TickerCard from './utils/TickerCard.svelte';
import SimplerTickerCard from './utils/SimplerTickerCard.svelte';
</script>

<style>
	body {
	font-family: 'Roboto', sans-serif;
	}
</style>

<body>

<h1>Not Found</h1>

<button on:click={() => push('/stock/spy')}>Click to start with SPY</button>

<!--<br>

<ContactCard my_name="Harmeet" my_rating=55 my_freshness="56%" my_accuracy="63%"/>
<TickerCard ticker="IBM" rating=56 accuracy=80 freshness=1256/>
-->


</body>

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
<SimplerTickerCard>
	<span slot="name">
		Bearfox
	</span>

	<span slot="address">
		My sincere apologies
	</span>

	<span slot="email">
		upshot@oracled.com
	</span>
</SimplerTickerCard>
