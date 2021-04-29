<script>
export let overview="";
export let rating="";
export let user="";
export let ticker="SPY";
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
<style>
.tabs>a.active {
    color: #00f;
    font-weight:700;
}
.tabs>a{
border:none;
}

a:hover{
 color:#c10aa9;
}

.nav{
background:#f0efff;
}
</style>

<Auth0Context domain="dev-gh9on756.us.auth0.com" client_id="lDh9u5tdu1Kk5CkXtZjmjjmUKuGARk0v">
    <nav class="nav">
      <div class="nav-left">
        <div class="tabs">
          <a class="brand" href="/">💎</a>
          <a class='{overview}' href="/#/stock/{ticker}">Overview</a>
          {#if $isAuthenticated}
            <a  class='{user}' href="/#/user/{$userInfo["email"]}">MyList</a>
            <a class='{rating}' href="/#/user/{ticker}/{$userInfo["nickname"]}">Ratings</a>
         {:else}
            <a  class='{user}' href="/#/user/harmeet@oracled.com">MyList</a>
            <a class='{rating}' href="/#/user/TSLA/harmeet@oracled.com">Ratings</a>

         {/if}
        </div>
      </div>
      <div class="nav-right">
        {#if $isAuthenticated}
            <a class="hide-xs" style="color:#cd00ff">Welcome {$userInfo["nickname"]}</a>
        {:else}
        <Auth0LoginButton class="button text-center error">Login</Auth0LoginButton>
        {/if}

      </div>
    </nav>
</Auth0Context>
