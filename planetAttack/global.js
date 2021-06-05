/////////////////////////////////////////
//   all simulator resources will be here 
/////////////////////////////////////////


//game global mechanics
let alert = 0;
let years = 2012;
let dayTick = 0;



//planets res
let planetsList = [
    {
        name : "mercury",
        size : 20,
        postMultiple : 5.5,
        planetSpeed : 2.9,
        color : "gray"
    },
    {
        name : "venus",
        size : 25,
        postMultiple : 11.5,
        planetSpeed : 3,
        color : "#ffffe0"
    },
    {
        name : "earth",
        size : 30,
        postMultiple : 20,
        planetSpeed : 3.1,
        color : "#7da27e"
    },
    {
        name : "mars",
        size : 20,
        postMultiple : 28.5,
        planetSpeed : 3.7,
        color : "#A52A2A"
    },
    {
        name : "jupiter",
        size : 60,
        postMultiple : 37,
        planetSpeed : 2.8,
        color : "#fefbea"
    },
    {
        name : "saturn",
        size : 50,
        postMultiple : 46,
        planetSpeed : 3.1,
        color : "#e6be8a"
    },
    {
        name : "uranus",
        size : 40,
        postMultiple : 54.5,
        planetSpeed : 3.5,
        color : "#afeeee"
    },
    {
        name : "neptune",
        size : 20,
        postMultiple : 63,
        planetSpeed : 4.5,
        color : "#00008b"
    }

];

let planets_ = [];


//meteors
let spawnSpeed_m = 1000; 
let meteoros = [];
let meteorLifeTime = 5000;//this will be ticked down 

//particles
let particles =[];