<svelte:head>
  <title>Social traders, Level up</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="https://unpkg.com/chota@latest">
</svelte:head>

<script>
  import Router from "svelte-spa-router";
  import routes from './routes';
  import NavBar from './routes/utils/NavBar.svelte';
  //import Auth from './routes/utils/Auth.svelte';
  import {
  Auth0Context
} from '@dopry/svelte-auth0';
</script>
<style>
	body {
	    max-width:90rem;
	    margin:0 auto;
	    padding:2rem;
	}
  </style>
<Auth0Context domain="dev-gh9on756.us.auth0.com" client_id="lDh9u5tdu1Kk5CkXtZjmjjmUKuGARk0v">
<h1> DEV BRANCH </h1>
<NavBar/>
<body>
	<Router {routes}/>
</body>
</Auth0Context>
