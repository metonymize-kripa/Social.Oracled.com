import _ from 'underscore';

export function makeString() {
  return "Test String returned"
}

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
  
const mapAttribOfSecurityToAvataar = {
	"country": ["skinColor","hairColor"],
	"market": ["avatarStyle","clotheType"],
	"sector": ["topType", "accessoriesType"],
	"size": ["facialHairType"],
	"volatility": ["mouthType"],
	"return": ["eyebrowType","eyeType"]
}

const mapHappyOneToFiveToMouthType = {
	1:"Concerned",
	2:"Disbelief",
        3:"Default",
        4:"Smile",
        5:"Twinkle"}
 
 export function createRandomAvataar(happy_percent=40){
	 var my_happy = "Smile"; 
	 var my_happy_percent = (happy_percent>100) ? 5 : Math.round(happy_percent/20);
	 my_happy = (my_happy_percent < 0) ? _.sample(avataar_inputs["mouthType"]) : mapHappyOneToFiveToMouthType[my_happy_percent];

	 return 'https://avataaars.io/?'+
		 'avatarStyle='+_.sample(avataar_inputs["avatarStyle"])+
		 '&topType='+_.sample(avataar_inputs["topType"])+
		 '&accessoriesType='+_.sample(avataar_inputs["accessoriesType"])+
		 '&hairColor='+_.sample(avataar_inputs["hairColor"])+
		 '&facialHairType='+_.sample(avataar_inputs["facialHairType"])+
		 '&clotheType='+_.sample(avataar_inputs["clotheType"])+
		 '&eyeType='+_.sample(avataar_inputs["eyeType"])+
		 '&eyebrowType='+_.sample(avataar_inputs["eyebrowType"])+
		 '&mouthType='+my_happy+
		 '&skinColor='+_.sample(avataar_inputs["skinColor"])
 }

export function createRandomBotAvataar(){
	return 'https://avatars.dicebear.com/api/bottts/'+_.sample([1,2,3,4,5])+':seed.svg'
}
