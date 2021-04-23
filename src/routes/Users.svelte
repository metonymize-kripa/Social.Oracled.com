<svelte:head>
  <title>Friends of the Oracle</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="https://unpkg.com/chota@latest">
</svelte:head>

<script>
  import { onMount } from "svelte";
  import Avatar from "svelte-avatar";
  import {push, pop, replace} from 'svelte-spa-router'
	
  let user_array = ['FatTony','Pappe','Kripa','Pani', 'Harsha','Brad','Sunil','Deba']
  let new_user= 'FatTony';
	
  export let params = {}
  
  let user = params.user;

  $: params.user;
	
function changeUser(new_user){
    push('/user/'+new_user);
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


<body>

    <h2> Welcome {user}! </h2>
    <div class="card" >
    <div class="row">
        <div class="col-8 " >
            <h3>Check Favorites</h3>
            {#each user_array as tx}
                <button class="button"  style="font:1rem;padding:0.8rem; margin:0.2rem; background:#351eb5;color:white;" on:click={() => changeUser(tx)}>{tx}</button>
            {/each}
        </div>
      </div>
    </div>
  
 </body>
