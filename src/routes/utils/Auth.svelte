<svelte:head>
  <title>Social traders, Level up -- Home</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="https://unpkg.com/chota@latest">
</svelte:head>

<script>
  import {
	  Auth0Context,
	  Auth0LoginButton,
	  Auth0LogoutButton,
	  authError,
	  authToken,
	  idToken,
	  isAuthenticated,
	  isLoading,
	  login,
	  logout,
	  userInfo,
	} from '@dopry/svelte-auth0';

function getMyRating(user_email){
    var my_url = 'https://www.insuremystock.com/stocks/getuserratings/'+ticker.replace(/\s/g, '') +'/?secret_key=Fat Neo&user_email='+user_email;
    my_kelly = [0];
    fetch(my_url)
        .then(d => d.text())
        .then(d =>
        {
            api_output = JSON.parse(d);
            if ('error' in api_output)
                err_val="error";
            else
            {
                my_kelly = [api_output.Rating];
            }
        });
}
	
</script>

<style>
	body {
	    max-width:90rem;
	    margin:0 auto;
	    padding:2rem;
	}
	.card{
	    margin:1rem auto;
	}
</style>
	
 <Auth0Context domain="dev-gh9on756.us.auth0.com" client_id="lDh9u5tdu1Kk5CkXtZjmjjmUKuGARk0v">
    <div class="row">
	    {#if !$isAuthenticated}
		<div class="col-9"><h1>💎Oracle Upshot</h1></div>
		<div class="col-3">
		    <Auth0LoginButton class="button text-center error is-full-width is-big" >Login</Auth0LoginButton>
		</div>
	    {:else}
		    <div class="col-9"><h1>💎Oracle Upshot</h1></div>
		    <div class="col-3 hide-xs">
			 <span class="tag is-large">Welcome {$userInfo["nickname"]}</span>
		     </div>
			{getMyRating($userInfo["email"]) || ""}
	    {/if}
    </div>
  </Auth0Context>
