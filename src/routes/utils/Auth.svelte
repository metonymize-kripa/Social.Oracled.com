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
</script>


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
