var date = new Date();  
var isodate = date.toISOString(); 
var latlonapi = 'http://api.openweathermap.org/geo/1.0/direct?q='; 
var latlonapikey = '&appid=c04b3b1cca89bdcac938506e9ec8708a'; 
var city = ''; 
var lat = ''; 
var lon = ''; 
var citysubmit = document.getElementById('citysubmit'); 
var inputcity = document.getElementById('cityinput'); 
var theatercontainer = $("#theatercontatiner");
var mapquestlatlonapi = 'http://www.mapquestapi.com/geocoding/v1/address?key=OGaNLZpeszyPsDAZEJPmwdAAkxymdQQg&location'; 


////event listener to search the users input/////
citysubmit.addEventListener('click',formsubmit); 
 
///function to search ///// 
function formsubmit(e){
  e.preventDefault();
  city = inputcity.value; 
  theatercontainer.empty()
  getlatlon();  
}

///Mapquest api geolocation to get lat and lon from the users input////
async function getlatlon() {
  var response = await fetch(mapquestlatlonapi+"="+city); 
  var latlondata = await response.json(); 
  lat = latlondata.results[0].locations[0].displayLatLng.lat; 
  lon = latlondata.results[0].locations[0].displayLatLng.lng; 
  console.log(lat); 
  console.log(lon); 
gettestdata(); 
}

/////GOOD CODE////////
///movieglu api to get theaters within 5 miles of the users input///
// var gettheaters = function(){
// var settings = {
//   "url": "https://api-gate2.movieglu.com/cinemasNearby/?n=10",
//   "method": "GET",
//   "timeout": 0,
//   "headers": {
//   "api-version": "v200",
//   "geolocation":lat+";"+lon,
//   "Authorization": "Basic VU5JVl82Mzo2aWluWVhtY0tLaUw=",
//   "client": "UNIV_63",
//   "x-api-key": "aoj8JUwxgza93mOqPhI125rbZZ0HcsBI7fnGyGGq",
//   "device-datetime": isodate,
//   "territory": "US",
//   },
//   };
  
//   //movieglu response to build html elements////
//   $.ajax(settings).done(function (response) {
//     console.log(response); 
//     for (let i = 0; i < response.cinemas.length; i++) {  
//     // get theater info///
//     theaternametext = response.cinemas[i].cinema_name; 
//     theateraddresstext = response.cinemas[i].address; 
//     theatercitytext = response.cinemas[i].city; 
//     theaterstatetext = response.cinemas[i].state; 
//     theaterziptext = response.cinemas[i].postcode; 
//     theaterdistancetext = response.cinemas[i].distance; 


    /////////START OF TEST DATA/////////////////
var gettestdata = function(){

    for (let i = 0; i <3; i++) {  
    var cinema_name = ['AMC Dine-in Theatres Southlands 16 Featuring Red Kitchen','AMC Arapahoe Crossing 16','Movie Tavern Aurora Cinema']; 
    var address = ['23955 East Plaza Avenue','6696 South Parker Road','18605 East Hampden Avenue']; 
    var city = ['Aurora','Aurora','Aurora']; 
    var state = ['CO','CO','CO']; 
    var zip = ['80016','80016','80013']; 
    var distance = ['0.97','5.3','5.5']; 
    var theaterdistancerounded = ['0.97','5.3','5.5']; 
       
    theaternametext = cinema_name[i]; 
    theateraddresstext = address[i]; 
    theatercitytext = city[i]; 
    theaterstatetext = state[i]; 
    theaterziptext = zip[i]; 
    theaterdistancetext = distance[i]; 
    ////////////END OF TEST DATA///////////////




    ///create theater card ////
    var theatercard = $("<div>");
    theatercard.addClass("border border-dark"); 
      
    ///create name of theater card///
    var theatername = $("<h5>"); 
    theatername.text(theaternametext); 
    theatername.addClass("theatername bg-danger text-white");
  
    ///create address of theater ///
    var theateraddress = $("<div>")
    theateraddress.text(theateraddresstext); 
    
      ///create city, state and zip of theater ///
      var theatercity = $("<div>")
      theatercity.text(theatercitytext+" "+theaterstatetext+" "+theaterziptext); 
      theatercity.addClass("theatercity"); 
      
     ///create distance to theater ///
     var theaterdistance = $("<div>")
     ///UNCOMMENT THIS OUT WHEN NOT IN TEST////
    //  var theaterdistancerounded = theaterdistancetext.toPrecision(2);  
     theaterdistance.text(theaterdistancerounded+" Miles away"); 
     theaterdistance.addClass("theaterdistance"); 

      
    /////append items into the HTML //////
    theatercard.append(theatername);
    theatercard.append(theateraddress);
    theatercard.append(theatercity); 
    theatercard.append(theaterdistance); 
    theatercontainer.append(theatercard);  
  }
  };























// // adding theater.js
// var moviesintheaters_url = "http://data.tmsapi.com/v1.1/movies/showings?"; 
// var zip = '';
// var radius = "&radius=5"; 
// var apikey = "&api_key=xce3pbnjwpvfcj29yzyv9egb"; 
// var api = ''; 
// var zipcodeinput = document.getElementById('zipcodeinput'); 
// var date = new Date();  
// var isodatesplit = date.toISOString().split('T');
// var isodateonly = isodatesplit[0]; 


///this is for grace api ////// 
// function formsubmit(e){
//   e.preventDefault();
//   // var cardcontainer = document.getElementById('cardcontainer');
//   // if (cardcontainer.hasChildNodes()) {
//   //   while (cardcontainer.firstChild) {
//   //     cardcontainer.removeChild(cardcontainer.firstChild);
//   //     }
//   //   };
//   //  zip = zipcodeinput.value; 
//   //  api = moviesintheaters_url+'startDate='+isodateonly+'&zip='+zip+radius+apikey; 
//  gettheaters();  
// }; 
  
// async function nowplaying() {
//   var response = await fetch(api); 
//   var data = await response.json(); 
// for (var i = 0; i < data.length; i++){

 
  ///creates the card////
  // var card = document.createElement('card'); 
  // document.getElementById('cardcontainer').appendChild(card); 
  // card.classList.add('card', 'text-center', 'mx-2', 'my-2', 'rounded');
  // card.style.width = '15rem';
  // card.style.border = '0.1rem solid black';
  
  // ///creates the movie title header in the card///
  // var movietitle = document.createElement('movietitle'); 
  // document.getElementById('card').appendChild(movietitle); 
  // movietitle.innerHTML = data[i].title; 
   

  ////create the movie card////
  

  
//adding movie names to the card////  
    // var moviename = document.createElement('div'); 
    // document.getElementById('cardcontainer').appendChild(moviename); 
//     // moviename.innerHTML = data[i].title; 
// }
// console.log(data); 
// }

 


