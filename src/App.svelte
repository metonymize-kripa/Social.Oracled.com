<svelte:head>
  <title>Social traders, Level up</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="https://unpkg.com/chota@latest">
</svelte:head>

<script>
  import { onMount } from "svelte";
  import Router from "svelte-spa-router";
  import routes from './routes'
</script>

<body>

<Router {routes}/>
	
</body>
