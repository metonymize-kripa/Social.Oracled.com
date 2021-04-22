<script>

import {push, pop, replace} from 'svelte-spa-router'
  
</script>

<h2>NotFound</h2>

<button on:click={() => push('/stock/spy')}>Click to start with SPY</button>
