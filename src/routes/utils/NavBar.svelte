<script>
import {
  nav_ticker,
  overview_class,
  rating_class,
  user_class,
  settings_class,
  is_home
} from './navbar.js';

import {
    Auth0LoginButton,
    Auth0LogoutButton,
    isAuthenticated,
    userInfo,
  } from '@dopry/svelte-auth0';
  import { onMount } from 'svelte';
  import {createRandomAvataar, createMyAvataar} from './rand_avataar.js';
  let my_avatar="";

  function getAvataar(){
    let get_url = "https://www.insuremystock.com/user/avatar/?secret_key=Fat Neo&user_email="+$userInfo["email"];
    fetch(get_url)
        .then(d => d.text())
        .then(d =>
        {
            var api_output = JSON.parse(d);

            if ('error' in api_output)
                err_val =  "error";
            else
            {
              console.log((api_output.avatar));
              api_output = JSON.parse(api_output.avatar.replace(/'/g,"\""));
              my_avatar = createMyAvataar(api_output.skinColor, api_output.topType,api_output.hairColor, api_output.facialHairType);
            }
        });
  }
  onMount(async () => {
		getAvataar();
	});
$: my_avatar && $userInfo;
</script>
<style>
.tabs>a.active {
    color: #00f;
    font-weight:700;
}
.tabs>a{
border:none;
padding:0.2rem 1rem;
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
          <a class="brand" href="/#">💎</a>
          <a class='{$overview_class}' href="/#/stock/{$nav_ticker}">Overview</a>
          {#if $isAuthenticated}
            <a  class='{$user_class}' href="/#/user/{$userInfo["email"]}">MyList</a>
            <a class='{$rating_class}' href="/#/user/{$nav_ticker}/{$userInfo["nickname"]}">Ratings</a>
         {:else}
            <a  class='{$user_class}' href="/#/user/harmeet@oracled.com">MyList</a>
            <a class='{$rating_class}' href="/#/user/TSLA/harmeet@oracled.com">Ratings</a>
         {/if}
         {#if $isAuthenticated}
            <a class='{$settings_class}' href="/#/settings/{$userInfo["email"]}" style="color:#cd00ff"><img alt src={my_avatar}	/></a>
         {:else}
            <Auth0LoginButton class="button text-center error">Login</Auth0LoginButton>
        {/if}
        </div>
      </div>
    </nav>
