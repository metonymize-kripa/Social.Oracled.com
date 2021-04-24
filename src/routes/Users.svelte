<svelte:head>
  <title>Friends of the Oracle</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="https://unpkg.com/chota@latest">
</svelte:head>

<script>
  import { onMount } from "svelte";
  import _ from "underscore";
  import Avatar from "svelte-avatar";
  import {push, pop, replace} from 'svelte-spa-router'

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

  let user_array = ['FatTony','Pappe','Kripa','Pani', 'Harsha','Brad','Sunil','Deba'];
  let symbol_list = ['IBM','C',"MELI","CLOV","TSLA","GME","XOM",'AMC','SPY','PLTR', 'TWTR','IAC','PG', 'V','X','FB']
  user_array = shuffle(user_array);
  symbol_list = shuffle(symbol_list);
  let new_user= 'FatTony';

  export let params = {}

  let user = params.user;
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

$: params.user && user_array ;

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
    <h2> Welcome {user}!</h2>
    <div class ="card row">
    <div class="col-12"><h3>My friends</h3></div>
      {#each user_array as peep}
        <div class="col-3 card" style="background:#f9dbdb">
          <header>{peep}</header>
          <div class="row">
            <div class="col-12">
              <table>
              <tr>
                <td rowspan="3"><a href="/#/user/{peep}" style="border:none;"><img src={createRandomAvataar()} width = 50/></a></td>
                <td style="padding: 0 0.5rem 0 0; font-size: 1.3rem;"><a style="color:purple;border:none;" href="/#/stock/{symbol_list[0]}">{symbol_list[0]}</a></td>
                <td style="padding:0; font-size: 1.3rem;">{Math.round(Math.random() * (96 - 33) + 33)}%</td>
              </tr>
              {#each shuffle(symbol_list).slice(2,4) as tx}
                <tr>
                  <td style="padding: 0 0.5rem 0 0; font-size: 1.3rem;"><a style="color:purple;border:none;" href="/#/stock/{tx}">{tx}</a></td>
                  <td style="padding:0; font-size: 1.3rem;">{Math.round(Math.random() * (96 - 33) + 33)}%</td>
                  </tr>
              <!--
                <button style="text-align:left;color:purple;width:7rem; margin:0.1rem;padding:0.2rem;font-size:1.25rem;">{tx}:{Math.round(Math.random() * (96 - 33) + 33)}%</button><br>
                -->
              {/each}
              </table>

            </div>
          </div>

        </div>
      {/each}
    </div>

 </body>
