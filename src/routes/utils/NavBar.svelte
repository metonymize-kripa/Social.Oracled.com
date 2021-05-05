<script>
import {
  nav_ticker,
  overview_class,
  rating_class,
  user_class,
  is_home
} from './navbar.js';

import {
    Auth0LoginButton,
    Auth0LogoutButton,
    isAuthenticated,
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
    <nav class="nav">
      <div class="nav-left">
        <div class="tabs">
        {#if !$is_home}
          <a class="brand" href="/#">💎</a>
        {/if}
          <a class='{$overview_class}' href="/#/stock/{$nav_ticker}">Overview</a>
          {#if $isAuthenticated}
            <a  class='{$user_class}' href="/#/user/{$userInfo["email"]}">MyList</a>
            <a class='{$rating_class}' href="/#/user/{$nav_ticker}/{$userInfo["nickname"]}">Ratings</a>
         {:else}
            <a  class='{$user_class}' href="/#/user/harmeet@oracled.com">MyList</a>
            <a class='{$rating_class}' href="/#/user/TSLA/harmeet@oracled.com">Ratings</a>

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
