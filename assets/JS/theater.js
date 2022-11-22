// adding theater.js
var moviesintheaters_url = "http://data.tmsapi.com/v1.1/movies/showings?"; 
var startdate = "startDate=2022-11-21"; 
var zip = "&zip=80111";
var radius = "&radius=5"; 
var theater = "&id=8436"; 
var apikey = "&api_key=xce3pbnjwpvfcj29yzyv9egb"; 

var api = moviesintheaters_url+startdate+zip+zip+radius+apikey;  




async function nowplaying() {
  var response = await fetch(api); 
  var data = await response.json(); 
//   var {name,lat,lon} = data[0]; //destructured the JSON elements // 
// document.getElementById('name').textContent = name; 
// document.getElementById('lat').textContent = lat; 
// document.getElementById('lon').textContent = lon; 

for (var i = 0; i < data.length; i++){
    // console.log(data[i].title); 
    // console.log(data[i].title);  
    console.log(data[i].showtimes[0].theatre.name);  
}

console.log(data); 
}
nowplaying(); 
