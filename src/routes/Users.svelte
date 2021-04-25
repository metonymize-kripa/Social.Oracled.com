<svelte:head>
  <title>Friends of the Oracle</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="https://unpkg.com/chota@latest">
</svelte:head>

<script>
  import { onMount } from "svelte";
  import _ from "underscore";
  const avataar_inputs = {
    "avatarStyle": [
        "Circle",
        "Transparent"
    ],
    "topType" : [
        "NoHair",
        "Eyepatch",
        "Hat",
        "Hijab",
        "Turban",
        "WinterHat1",
        "WinterHat2",
        "WinterHat3",
        "WinterHat4",
        "LongHairBigHair",
        "LongHairBob",
        "LongHairBun",
        "LongHairCurly",
        "LongHairCurvy",
        "LongHairDreads",
        "LongHairFrida",
        "LongHairFro",
        "LongHairFroBand",
        "LongHairNotTooLong",
        "LongHairShavedSides",
        "LongHairMiaWallace",
        "LongHairStraight",
        "LongHairStraight2",
        "LongHairStraightStrand",
        "ShortHairDreads01",
        "ShortHairDreads02",
        "ShortHairFrizzle",
        "ShortHairShaggyMullet",
        "ShortHairShortCurly",
        "ShortHairShortFlat",
        "ShortHairShortRound",
        "ShortHairShortWaved",
        "ShortHairSides",
        "ShortHairTheCaesar",
        "ShortHairTheCaesarSidePart"
    ],
    "accessoriesType": [
        "Blank",
        "Kurt",
        "Prescription01",
        "Prescription02",
        "Round",
        "Sunglasses",
        "Wayfarers"
    ],
    "hairColor": [
        "Auburn",
        "Black",
        "Blonde",
        "BlondeGolden",
        "Brown",
        "BrownDark",
        "PastelPink",
        "Platinum",
        "Red",
        "SilverGray"
    ],
    "facialHairType": [
        "Blank",
        "BeardMedium",
        "BeardLight",
        "BeardMagestic",
        "MoustacheFancy",
        "MoustacheMagnum"
    ],
    "clotheType": [
        "BlazerShirt",
        "BlazerSweater",
        "CollarSweater",
        "GraphicShirt",
        "Hoodie",
        "Overall",
        "ShirtCrewNeck",
        "ShirtScoopNeck",
        "ShirtVNeck"
    ],
    "eyeType": [
        "Close",
        "Cry",
        "Default",
        "Dizzy",
        "EyeRoll",
        "Happy",
        "Hearts",
        "Side",
        "Squint",
        "Surprised",
        "Wink",
        "WinkWacky"
    ],
    "eyebrowType": [
        "Angry",
        "AngryNatural",
        "Default",
        "DefaultNatural",
        "FlatNatural",
        "RaisedExcited",
        "RaisedExcitedNatural",
        "SadConcerned",
        "SadConcernedNatural",
        "UnibrowNatural",
        "UpDown",
        "UpDownNatural"
    ],
    "mouthType": [
        "Concerned",
        "Default",
        "Disbelief",
        "Eating",
        "Grimace",
        "Sad",
        "ScreamOpen",
        "Serious",
        "Smile",
        "Tongue",
        "Twinkle",
        "Vomit"
    ],
    "skinColor": [
        "Tanned",
        "Yellow",
        "Pale",
        "Light",
        "Brown",
        "DarkBrown",
        "Black"
    ]
}
function createRandomAvataar(){
	 return 'https://avataaars.io/?'+
		 'avatarStyle='+_.sample(avataar_inputs["avatarStyle"])+
		 '&topType='+_.sample(avataar_inputs["topType"])+
		 '&accessoriesType='+_.sample(avataar_inputs["accessoriesType"])+
		 '&hairColor='+_.sample(avataar_inputs["hairColor"])+
		 '&facialHairType='+_.sample(avataar_inputs["facialHairType"])+
		 '&clotheType='+_.sample(avataar_inputs["clotheType"])+
		 '&eyeType='+_.sample(avataar_inputs["eyeType"])+
		 '&eyebrowType='+_.sample(avataar_inputs["eyebrowType"])+
		 '&mouthType='+_.sample(avataar_inputs["mouthType"])+
		 '&skinColor='+_.sample(avataar_inputs["skinColor"])
 }
  import {push, pop, replace} from 'svelte-spa-router';
  import RangeSlider from "svelte-range-slider-pips";

  let user_array = ['FatTony','Pappe','Kripa','Pani', 'Harsha','Brad','Sunil','Deba'];
  let symbol_list = ['IBM','C',"MELI","CLOV","TSLA","GME","XOM",'AMC','SPY','PLTR', 'TWTR','IAC','PG', 'V','X','FB']
  user_array = shuffle(user_array);
  symbol_list = shuffle(symbol_list);
  let new_user= 'FatTony';

  export let params = {}

  let user = params.name;
  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

$: params.name && user_array ;
let arrow = ['⬆','⬇'];
let rand_list=[];
for (var i=0;i<40;i++)
    rand_list.push([Math.round(Math.random() * (96 - 33) + 33)]);

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
    <div class ="card row">
       <table>
		    <thead>
		      <tr>
		         <th width="20%" class="text-center">   <img src={createRandomAvataar()} width = 50/></th>
		        <th width="80%" colspan="2" class="text-center" style="font-size:2.5rem;">{user}' ratings</th>
		      </tr>
		    </thead>
              {#each shuffle(symbol_list).slice(1,7) as tx,i}
               <tr>
                 <a class="text-left" href="/#/stock/{tx}"><td width="15%" style="font-size:2.25rem;color:#1e1aa6;font-weight:500;"> {tx}</td></a>
                 <td width="65%"><RangeSlider float pips all='label' disabled={true}  bind:values={rand_list[i]}  pipstep={50} min={0} max={100}  }/></td>
                 <td width="20%" class="text-right" style="font-size:2.25rem;color:purple;">{rand_list[i]}%({arrow[Math.round(Math.random() * +1)]})</td>
               </tr>
               {/each}
        </table>
      </div>
<!--
    <div class ="card row">
    <div class="col-12"><h3>{user}' ratings</h3></div>
       {#each shuffle(symbol_list).slice(1,7) as tx}
           <div class="col-4 card" style="background:#f9dbdb">
            <h2 class='text-center' style="color:#8a008a" ><a href="/#/stock/{tx}">{tx}</a></h2>
            <h2 class='text-center' style="color:#6621cc">{Math.round(Math.random() * (96 - 33) + 33)}%</h2>
           </div>
      {/each}
    </div> 
-->
 </body>
