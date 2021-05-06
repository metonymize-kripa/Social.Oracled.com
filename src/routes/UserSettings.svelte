<svelte:head>
  <title>Find Yourself</title>
  <link rel="stylesheet" href="https://unpkg.com/chota@latest">
</svelte:head>

<script>
  import { onMount } from "svelte";
  import {avataar_inputs, createMyAvataar} from './utils/rand_avataar.js';

  import {
    Auth0LoginButton,
    Auth0LogoutButton,
    authError,
    isAuthenticated,
    userInfo,
  } from '@dopry/svelte-auth0';
  import {
    nav_ticker,
    overview_class,
    rating_class,
    user_class,
    settings_class,
    is_home
  } from './utils/navbar.js';
  import {
    setCookie,
    getCookie
  } from './utils/common_functions.js';

  $is_home = false;
  $overview_class = '';
  $rating_class = '';
  $user_class = '';
  $settings_class = 'active';
  let selected_skin = "Tanned";
  let selected_top = "ShortHairShortFlat";
  let selected_hair="Brown";
  let selected_facial_hair="";
  let top = avataar_inputs.topType;
  let skin = avataar_inputs.skinColor;
  let hair = avataar_inputs.hairColor;
  let facialhair = avataar_inputs.facialHairType;

  function saveMyAvatar(skinColor, topType, hairColor, facialHairType){
    //let dict_to_save = "{'skinColor';'"+skinColor+"','hairColor':'"+hairColor+"','facialHairType':'"+facialHairType+"','topType':'"+topType+"'}";
    let dict_to_save = {'skinColor':skinColor,'hairColor':hairColor,'facialHairType':facialHairType,'topType':topType}
    alert(JSON.stringify(dict_to_save));
    let data ={"user_email":$userInfo["email"],"avatar":JSON.stringify(dict_to_save),"key":"Fat Neo"};
    let post_url = 'https://www.insuremystock.com/user/update_avatar/';
    fetch(post_url,
    {
        method:"POST",
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(data),
    }).then(d => console.log(d.text()));
    setCookie('avatar',dict_to_save, 365);

  }
  function getAvataar(){
    let get_url = "https://www.insuremystock.com/user/avatar/?secret_key=Fat Neo&user_email="+$userInfo["email"];
    console.log(get_url);
    fetch(get_url)
        .then(d => d.text())
        .then(d =>
        {
            var api_output = JSON.parse(d);

            if ('error' in api_output)
                err_val =  "error";
            else
            {
              console.log(api_output.skinColor);
              selected_skin = api_output.skinColor;
              selected_top = api_output.topType;
              selected_hair = api_output.hairColor;
              selected_facial_hair = api_output.facialHairType;
            }
        });
  }

  onMount(async () => {
    getAvataar();
    let get_url = "https://www.insuremystock.com/user/avatar/?secret_key=Fat Neo&user_email="+$userInfo["email"];
    console.log(get_url);
  });

</script>
  <div class ="row">

     {#if $isAuthenticated}
     <div class='col-12'><img class="text-center is-center" width=50% style="margin:0 auto;" src={createMyAvataar(selected_skin, selected_top, selected_hair, selected_facial_hair)} /></div>
      <div class='col-6'>
        <label for="select_hair">HairColor</label>
      	<select id = "select_hair"  bind:value={selected_hair}>
      		{#each hair as question}
      			<option value={question}>
      				{question}
      			</option>
      		{/each}
      	</select>
      </div>
      <div class='col-6'>
        <label for="select_top">HairStyle</label>
      	<select id = "select_top"  bind:value={selected_top}>
      		{#each top as question}
      			<option value={question}>
      				{question}
      			</option>
      		{/each}
      	</select>
      </div>
      <div class='col-6'>
        <label for="select_facial_hair">FacialHair</label>
      	<select id = "select_facial_hair"  bind:value={selected_facial_hair}>
      		{#each facialhair as question}
      			<option value={question}>
      				{question}
      			</option>
      		{/each}
      	</select>
      </div>
       <div class='col-6'>
         <label for="select_skin">SkinColor</label>
         <select id = "select_skin"  bind:value={selected_skin}>
           {#each skin as question}
             <option value={question}>
               {question}
             </option>
           {/each}
         </select>
       </div>
       <div class='col-12'><button class="button is-center" on:click={saveMyAvatar(selected_skin, selected_top, selected_hair, selected_facial_hair)} style="width:50%;margin:2rem auto;color:white;background:#c10aa9;font-size:3rem;font-weight:500; padding:1rem; border-radius: 20rem;">Save</button></div>
     {:else}
        <Auth0LoginButton class="button text-center error">Login to 💎Oracle</Auth0LoginButton>
     {/if}

  </div>
