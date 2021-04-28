<svelte:head>
  <title>Social traders, Level up</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="https://unpkg.com/chota@latest">
</svelte:head>

<script>
  import Router from "svelte-spa-router";
  import routes from './routes';
  import Auth from './routes/utils/Auth.svelte';
	
  import { onMount } from 'svelte';
  let time = new Date();
  $: beacon = Math.round(time.getSeconds()/10);
  onMount(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 1000);
</script>

<body>
	<h1>Beep:{beacon}</h1>
	<Router {routes}/>
</body>
