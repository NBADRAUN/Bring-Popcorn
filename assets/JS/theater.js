///global variables ////

var date = new Date();  
var isodate = date.toISOString(); 
var latlonapi = 'https://api.openweathermap.org/geo/1.0/direct?q='; 
var latlonapikey = '&appid=c04b3b1cca89bdcac938506e9ec8708a'; 
var city = ''; 
var lat = ''; 
var lon = ''; 
var citysubmit = document.getElementById('citysubmit'); 
var inputcity = document.getElementById('cityinput'); 
var theatercontainer = $("#theatercontatiner");
var mapquestlatlonapi = 'https://www.mapquestapi.com/geocoding/v1/address?key=OGaNLZpeszyPsDAZEJPmwdAAkxymdQQg&location'; 



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
gettheaters(); 
}

// /movieglu api to get the 3 closest theaters of the users input///
var gettheaters = function(){
var settings = {
  "url": "https://api-gate2.movieglu.com/cinemasNearby/?n=3",
  "method": "GET",
  "timeout": 0,
  "headers": {
  "api-version": "v200",
  "geolocation":lat+";"+lon,
  "Authorization": "Basic U1RVRF8yNDk6b3hTMmFFQXF6ckw1",
  "client": "STUD_249",
  "x-api-key": "mnUk7hyiLC8q75pSZvq97aLh5rMLLFZW1m7PdJGX",
  "device-datetime": isodate,
  "territory": "US",
  },
  };
  
  //movieglu response to build html elements////
  $.ajax(settings).done(function (response) {

    for (let i = 0; i < response.cinemas.length; i++) {  
    // get theater info///
    theaternametext = response.cinemas[i].cinema_name; 
    theateraddresstext = response.cinemas[i].address; 
    theatercitytext = response.cinemas[i].city; 
    theaterstatetext = response.cinemas[i].state; 
    theaterziptext = response.cinemas[i].postcode; 
    theaterdistancetext = response.cinemas[i].distance; 

    ///create theater card ////
    var theatercard = $("<div>");
    theatercard.addClass("border border-dark"); 
    $(theatercard).css("background","#F6AA1C"); 

      
    ///create name of theater card///
    var theatername = $("<h5>"); 
    theatername.text(theaternametext); 
    theatername.addClass("theatername text-white");
    $(theatername).css("background","#941B0C"); 
  
    ///create address of theater ///
    var theateraddress = $("<div>")
    theateraddress.text(theateraddresstext); 
    
      ///create city, state and zip of theater ///
      var theatercity = $("<div>")
      theatercity.text(theatercitytext+" "+theaterstatetext+" "+theaterziptext); 
      theatercity.addClass("theatercity"); 
      
     ///create distance to theater ///
     var theaterdistance = $("<div>")
     var theaterdistancerounded = theaterdistancetext.toPrecision(3);  
     theaterdistance.text(theaterdistancerounded+" Miles away"); 
     theaterdistance.addClass("theaterdistance"); 

      
    /////append items into the HTML //////
    theatercard.append(theatername);
    theatercard.append(theateraddress);
    theatercard.append(theatercity); 
    theatercard.append(theaterdistance); 
    theatercontainer.append(theatercard);  
  
  
  }})
  };