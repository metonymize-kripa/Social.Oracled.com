<svelte:head>
  <title>💎Oracle</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="https://unpkg.com/chota@latest">
</svelte:head>

<script>
  import { onMount } from "svelte";
  import _ from "underscore";
  import NavBar from './utils/NavBar.svelte';
  import {
    nav_ticker,
    overview_class,
    rating_class,
    user_class,
    is_home
  } from './utils/navbar.js';
  $is_home = true;
  let api_output ={};
  let friend_output={};

  let show_entry_card = true;
  let ticker_array = ['GME','SPY','MELI','TWTR','TSLA']
  const moods = ["Sell","😫","😫","😫","😥","Weak","😥","😐","😐","😐","Hold","😐","😀","😀","😀","Meh","😀","😁","😁","😁","Buy"];

  // Added for dynamic text input
  let time = new Date();
  let beacon = 0;
  let inputTicker = '';
  let placeholderTicker = 'TSLA';
  let new_ticker= 'TSLA';
  $nav_ticker = new_ticker;
  const refreshPeriod = 2;
  $: beacon = Math.round(time.getSeconds()/refreshPeriod)%2;
  onMount(async () => {
    const interval = setInterval(() => {
			time = new Date();
		}, 1000);
    return () => {
    	clearInterval(interval);
    	};
  });
  	const sourceData = ["Twitter", "WallStreetBets", "Options Market", "Yahoo Finance", "Your Friends"];
    const sourceAction = ["goes up", "goes down", "stays flat", "reaches the moon", "crashes and burns"];
	//let tickerData = ["LBRDK","IAC","TWTR","SE","MELI","PYPL","PTON","CHNG","CVNA","MU","PINS","DIS","WFC","C","GDDY","CZR","UBER","ALXN","EXPE","BAC","JPM","NOW","MVIS","MNMD","GME","AMD","TSLA","SPY","MSFT","AMC","PLTR","AAPL","OCGN","VIAC","BB","VXRT","NIO","RKT","PINS","GOOG","NNDM","CLOV","GSAT","COIN","FB","UPS"];
	let tickerData = ["BTC","ETH","UNI","BAT","DOGE","TWTR","MELI","PTON","DIS","UBER","JPM","GME","AMD","TSLA","SPY","MSFT","AMC","PLTR","AAPL","GOOG","COIN","FB","UPS"];

	function beaconSample(beacon,sampler) {
		updatePlaceholderTicker();
		return _.sample(sampler)
	}

	function updatePlaceholderTicker(){
		placeholderTicker = _.sample(tickerData);
	}

	function clickHandler(){
		new_ticker = inputTicker;
	}

</script>

  <div class="row">
      <div class="col-7">
  		<h1 style="margin-bottom:0.5rem;">💎Oracle looks at </h1>
          <span style="color:#c10aa9; border-bottom:4px solid #0330ff; font-size:3rem; font-weight:500">{beaconSample(beacon,sourceData)} data</span>
          <h1 style="margin-bottom:0.5rem;">To calculate the chance</h1>
          <span style="color:#0330ff;  font-size:3rem; font-weight:500">
          <a class="button" style="font-size:2rem;padding:0.6rem; margin:0.2rem 0.2rem 1rem 0.2rem; width:8rem;background:#351eb5;color:white;border-radius:5rem;box-shadow:2px 2px 2px 3px rgb(0 0 0 / 26%)" href="/#/stock/{placeholderTicker}">{placeholderTicker}</a>
          {beaconSample(beacon,sourceAction)}</span>
      </div>
      <div class="col-5 " style="margin-top:3rem;" >
          <br>
              <input class="text-uppercase" style="margin:2rem auto;font-size:3rem; font-weight:500" bind:value={new_ticker}/>
              <a href="/#/stock/{new_ticker}" class="button is-center" style="width:100%;color:white;background:#c10aa9;font-size:3rem;font-weight:700; padding:1rem; border-radius: 20rem;">💎Oracle it </a>
      </div>
  </div>
