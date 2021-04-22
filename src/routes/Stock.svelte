<svelte:head>
  <title>Social traders, Level up -- Stock </title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="https://unpkg.com/chota@latest">
</svelte:head>

<script>
  import { onMount } from "svelte";
  export let params = {}
  let api_output ={};
  let fat_kelly = 0;
  let gain_chance=0;
  let ticker = 'TSLA';
  let varx = 0;

onMount(async () => {
    ticker = params.symbol;
    calculateKelly();
  });
	
function calculateKelly() { 
    ticker = ticker.toUpperCase();
    fetch("https://www.insuremystock.com/options/kelly/"+ticker)
        .then(d => d.text())
        .then(d =>
        {
            	api_output = JSON.parse(d);
            	console.log(api_output);
                show_kelly = [(api_output.kelly_k*100)];
                my_kelly = (api_output.kelly_k);
                friend_kelly = [(api_output.kelly_k*100-2)];
                fat_kelly = [(api_output.kelly_k*100)];
                gain_chance = Math.round(api_output.prob_up*100);
                varx = api_output.prob_down_n/api_output.prob_up_n;
        });
}

/*
function calculateKelly() {
	ticker = "FORCED TICKER";
	fat_kelly = 42;
}
*/
	
</script>

<body>	
	

<h2>Hi there!</h2>

<p>
    Your route is:
    <b>{params.symbol}</b>
    <b>{#if params.cmd}{params.cmd}{/if}</b>
	<br>
	
	<b>stored ticker is :{ticker}, calculated fatkelly is:{fat_kelly}, apioutput:{api_output}</b>
</p>
	
<button on:click={() => calculateKelly()}>Force calculate kelly</button>
	
</body>
