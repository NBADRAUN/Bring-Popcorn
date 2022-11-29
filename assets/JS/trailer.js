var fetchButton = $("#searchButton");
var screenHolder = $("#holderForTrailer");
var movies = [];//empty array where all trailer names are stored
var warningMessage = $("#warningMessage"); 
var date = new Date();  
var apiDate = date.toISOString(); 
//function that is run each time user clicks on search
var formHandler = function (event) {
  event.preventDefault();
  movieSelection = trailerSelection.value.trim();
  searchTrailer();
};

//function to display all trailers for movies currently showing
var getTrailer = function () {
  //remove warning message 
  warningMessage.text("");
  
  //fetch url that holds trailers
  var getMovieUrl = {
    url: "https://api-gate2.movieglu.com/filmsNowShowing/",
    method: "GET",
    timeout: 0,
    headers: {
      "api-version": "v200",
      Authorization: "Basic U1RVRF8yNDg6ZVhDTXp5cGEzcHlS",
      client: "STUD_248",
      //"x-api-key": "0bbivexyGQ2fvFq8bzPiV8cyWJZqykwaGHKZXfm6",
      "device-datetime":  apiDate,
      territory: "US",
    },
  };

  $.ajax(getMovieUrl).done(function (response) {
   for (let i = 0; i < response.films.length; i++) {

    //get movie name from api
      matchMovie = response.films[i].film_name;
      //add all movie names into movie array we will use for autocomplete
      movies.push(matchMovie);
      //get trailer from api
      movieTrailer = response.films[i].film_trailer;
      //get movie description from api
      movieDescr = response.films[i].synopsis_long;

      //Creates video elements
      var trailerVideo = $("<video>");
      trailerVideo.addClass(["col", "mt-3", "w-5"]);
      trailerVideo.attr("src", movieTrailer); 
      trailerVideo.attr("type", "video/mp4");
      trailerVideo.attr("controls", "autoplay");

      //Creates element title for each trailer and style
      var descrTitle = $("<h3>").addClass(" text-center bg-dark rounded");
      descrTitle.text(matchMovie); 
      var liDescr = $("<p>").addClass(
        "rounded shadow-lg p-3 mb-5 bg-dark rounded"
      );
      liDescr.text(movieDescr); 
      var divRow = $("<div>").addClass("row");
      var divCon = $("<div>").addClass("container");
      var trailerContainer = $("<div>").addClass("col pt-3");
      var textContainer = $("<div>").addClass("col pt-5 ");

      //append to HTML to display all trailers for movies currently showing
      trailerContainer.append(trailerVideo);
      textContainer.append(trailerContainer);
      textContainer.append(descrTitle);
      textContainer.append(liDescr);
      divRow.append(textContainer);
      divRow.append(trailerContainer);
      divCon.append(divRow);
      var wrap = $("#wrapper");
      wrap.append(divCon);
    }
 });
};

getTrailer();

//function to display only trailer of users interest 
var searchTrailer = function () {
  var getMovieUrl = {
    url: "https://api-gate2.movieglu.com/filmsNowShowing/",
    method: "GET",
    timeout: 0,
    headers: {
      "api-version": "v200",
      Authorization: "Basic U1RVRF8yNDg6ZVhDTXp5cGEzcHlS",
      client: "STUD_248",
      //"x-api-key":"0bbivexyGQ2fvFq8bzPiV8cyWJZqykwaGHKZXfm6",
      "device-datetime": apiDate,
      territory: "US",
    },
  };

  $.ajax(getMovieUrl).done(function (response) {
    for (let i = 0; i < response.films.length; i++) {

      //**If movie of interest is not in database display warning message**/
     
      if (!movies.includes(movieSelection)) {
      
       message();
        return;
     }

     // if user input is in data base display trailer user picked
      else if (movieSelection === response.films[i].film_name) {
        $("#warningMessage").text(""); //hide warning message

        //fetch data for each trailer 
        matchMovie = response.films[i].film_name;
        movieTrailer = response.films[i].film_trailer;
        movieDescr = response.films[i].synopsis_long;

        //create HTML elements to display trailer of interest
        var trailerWrapper = $("<div>");
        trailerWrapper.addClass("card bg-dark ");
        var movieName = $("<h3>");
        movieName.addClass("card-title text-center bg-dark rounded");
        movieName.text(matchMovie);
        
        var exitButton = $("<button>").addClass(' text-center bg-dark rounded text-warning ');
        exitButton.text("Exit");
        var movieDescription = $("<p>");
        movieDescription.addClass("card-text text-center bg-dark rounded");
        movieDescription.text(movieDescr);
        var outputBody = $("<div>");
        outputBody.addClass("card-body");
        var trailerVideo = $("<video>");
        trailerVideo.addClass(["col", "w-5"]);
        var source = $("<src>");
        trailerVideo.attr("src", movieTrailer);
        trailerVideo.attr("type", "video/mp4");
        trailerVideo.attr("controls", "autoplay");
        var exitButton = $("<button>").addClass(' [video content text-center bg-dark rounded text-warning ');
        exitButton.text("Exit");

       
       //append to html in order t display trailer
        outputBody.append(movieName);
        outputBody.append(movieDescription);
        trailerWrapper.append(trailerVideo);
        trailerWrapper.append(exitButton);
        trailerWrapper.append(outputBody);
        screenHolder.append(trailerWrapper);

        //empty existing trailers from starting trailer page
        $("#wrapper").empty();

        //on click on exit button exit currently playing trailer and return to all trailer page
        exitButton.on('click',function(){
        screenHolder.empty(); 
        getTrailer();
        });
      }
    }
  });
};

//on click of the search for trailers button display searched trailer
fetchButton.on("submit", formHandler);

// autocomplete added to user input, using movie names to as offered data
$(function () {
  $("#trailerSelection").autocomplete({
    source: movies,
  });
});

//warning message that will display each time user searched for trailer that is not in data base
var message = function(){
  warningMessage.text( "Movie you are searching for is not in our database, please try again.");
}