
//  http://www.omdbapi.com/?apikey=xxxxxxxx&s=s%C3%B6karna&r=json

var API = "?apikey=xxxxxxxx";
var title;
var year;
var iD;
var type;
var poster;
var url;

function updateOfURL(film){
    url = "http://www.omdbapi.com/" + API + "&s=" + film + "&r=json";
    console.log(url);
    sendRequester(url);
}

function sendRequester(url){
    var xmlReq = new XMLHttpRequest();
    console.log("hello");
  xmlReq.onreadystatechange = function(){
      if (xmlReq.readyState == 4 && xmlReq.status == 200){
          var datas = JSON.parse(xmlReq.responseText);
          var movie = {};
          movie.title = datas.Search[0].Title;
          movie.year = datas.Search[0].Year;
          movie.iD = datas.Search[0].imdbID;
          movie.type = datas.Search[0].Type;
          movie.poster = datas.Search[0].Poster;
          console.log(movie.poster);
      }
      updater(movie);
  }
        xmlReq.open("GET", url, true);
        xmlReq.send();
        
        
    }


function updater(movie){
    title.innerHTML = movie.title; 
    year.innerHTML = movie.year;
    iD.innerHTML = movie.iD;
    type.innerHTML = movie.type;
    poster.src = movie.poster;
}


window.onload = function(){
    title = document.getElementById("title");
    year = document.getElementById("year");
    iD = document.getElementById("identitet");
    type = document.getElementById("typeOf");
    poster = document.getElementById("image");

    var film = "Sökarna";
    console.log(film);
    updateOfURL(film);
}
