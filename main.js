
//  http://www.omdbapi.com/?apikey=xxxxxxxx&s=s%C3%B6karna&r=json

var API = "?apikey=xxxxxxxx";
var title;
var year;
var iD;
var type;
var poster;
var url;
var errormsg;
var titleOne;
var yearOne;
var iDOne;
var typeOne;
var posterOne;

function updateOfURL(film){
    url = "http://www.omdbapi.com/" + API + "&s=" + film + "&r=json";
    sendRequester(url);
}

function sendRequester(url){
    var xmlReq = new XMLHttpRequest();
  xmlReq.onreadystatechange = function(){
      if (xmlReq.readyState == 4 && xmlReq.status == 200){
          var datas = JSON.parse(xmlReq.responseText);
          var movie = {};
          movie.title = datas.Search[0].Title;
          movie.year = datas.Search[0].Year;
          movie.iD = datas.Search[0].imdbID;
          movie.type = datas.Search[0].Type;
          movie.poster = datas.Search[0].Poster;
          movie.titleOne = datas.Search[1].Title;
          movie.yearOne = datas.Search[1].Year;
          movie.iDOne = datas.Search[1].imdbID;
          movie.typeOne = datas.Search[1].Type;
          movie.posterOne =datas.Search[1].Poster;
          errormsg.innerHTML = " "; 
          var resp = datas.Response;

          if (datas.Search[0].Poster == "N/A"){
            movie.poster= "http://designravenous.com/no-image-found.jpg";
        }
          else if (datas.Search[1].Poster == "N/A"){
            movie.posterOne= "http://designravenous.com/no-image-found.jpg";
          }
         
          console.log(resp);
          updater(movie);
          console.log(url);  
          
      }
      
  }
        xmlReq.open("GET", url, true);
        xmlReq.send();
    }

    function onTheClick(){
        var input = document.getElementById("input");
        film = input.value;
        updateOfURL(film);
    }

function updater(movie){
    title.innerHTML = movie.title; 
    year.innerHTML = movie.year;
    iD.innerHTML = movie.iD;
    type.innerHTML = movie.type;
    poster.src = movie.poster;
    titleOne.innerHTML = movie.titleOne;
    yearOne.innerHTML = movie.yearOne;
    typeOne.innerHTML = movie.typeOne;
    posterOne.src = movie.posterOne;
    iDOne.innerHTML =movie.iDOne;
}


window.onload = function(){
    title = document.getElementById("title");
    year = document.getElementById("year");
    iD = document.getElementById("identitet");
    type = document.getElementById("typeOf");
    poster = document.getElementById("image");
    errormsg = document.getElementById("errormsg");
    titleOne = document.getElementById("titleOne");
    yearOne = document.getElementById("yearOne");
    iDOne = document.getElementById("identitetOne");
    typeOne = document.getElementById("typeOfOne");
    posterOne = document.getElementById("imageOne");

    var film = "star wars";
    console.log(film);
    updateOfURL(film);
}
