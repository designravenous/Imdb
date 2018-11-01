
//  http://www.omdbapi.com/?apikey=xxxxxxxx&s=s%C3%B6karna&r=json

var API = "?apikey=xxxxxxxx";
var url;
var errormsg;
var listContainer = document.createElement('div');
var answer = document.createElement("h2");
var typeValue;

function updateOfURL(film){
    var e = document.getElementById("selec").value;
    var year = document.getElementById("Year").value;
    console.log(year);
    console.log(e);
    if (year != "Year"){
    switch(e){
        case "Movies":
        url = "http://www.omdbapi.com/" + API + "&s=" + film + "&r=json" + "&type=movie" + "&y=" + year;
        typeValue = "Movie";
        break;
        case  "all":
        url = "http://www.omdbapi.com/" + API + "&s=" + film + "&r=json" + "&y=" + year;
        typeValue = "all";
        break;
        case "Series":
        url = "http://www.omdbapi.com/" + API + "&s=" + film + "&r=json" + "&type=series"  + "&y=" + year;
        typeValue = "Series";
        break;
        case "Game":
        url = "http://www.omdbapi.com/" + API + "&s=" + film + "&r=json" + "&type=game" + "&y=" + year;
        typeValue = "Game";
        break;
    }
} else if (year == "Year"){
    switch(e){
        case "Movies":
        url = "http://www.omdbapi.com/" + API + "&s=" + film + "&r=json" + "&type=movie";
        typeValue = "Movie";
        break;
        case  "all":
        url = "http://www.omdbapi.com/" + API + "&s=" + film + "&r=json";
        typeValue = "all";
        break;
        case "Series":
        url = "http://www.omdbapi.com/" + API + "&s=" + film + "&r=json" + "&type=series";
        typeValue = "Series";
        break;
        case "Game":
        url = "http://www.omdbapi.com/" + API + "&s=" + film + "&r=json" + "&type=game";
        typeValue = "Game";
        break;
    }

}
    sendRequester(url);
    console.log(url);
}

function sendRequester(url){

    var xmlReq = new XMLHttpRequest();
  xmlReq.onreadystatechange = function(){

      if (xmlReq.readyState == 4 && xmlReq.status == 200){

          var datas = JSON.parse(xmlReq.responseText);

          listContainer.innerHTML=" ";
          answer.innerHTML=" ";
          errormsg.innerHTML = " "; 

          var resp = datas.Response;

          var amount_of_results = datas.totalResults;
          console.log("total results: "+amount_of_results);

          var a = amount_of_results;    

          document.getElementsByTagName('body')[0].appendChild(listContainer);

            var listElement = document.createElement('ul');

            listContainer.appendChild(listElement);
            var titleans = datas.Response;
            var q = 5;
            if (amount_of_results < 10){
                q = amount_of_results;
            }else{
                q=10;
            }

            if (titleans == "False"){
                switch(typeValue){
                    case "Movie":
                    errormsg.innerHTML = "Movie Not Found";
                    q = 0;
                    break;
                    case "all":
                    errormsg.innerHTML = "No Movie, Series Or Game Found";
                    q = 0;
                    break;
                    case "Series":
                    errormsg.innerHTML = "Series Not Found";
                    q = 0;
                    break;
                    case "Game":
                    errormsg.innerHTML = "Game Not Found";
                    break;
                }
            }
            console.log("titleans: " + titleans);


         for(var i = 0; i <q;i++){
            var listItem = document.createElement('li');
            var listItem1 = document.createElement('li');
            var listItem2 = document.createElement('li');
            var posterItem = document.createElement('IMG');
            var br = document.createElement("BR");
            var brTwo = document.createElement("BR");
            posterItem.style.width = "200px";
            var boldTitle = datas.Search[i].Title;
            var boldYear = datas.Search[i].Year;
            listItem.innerHTML = "Title: " + boldTitle.bold();
            listItem1.innerHTML = "Year: " + boldYear.bold();
            listItem2.innerHTML = "Type: " + datas.Search[i].Type;
            posterItem.setAttribute("src", datas.Search[i].Poster);
            posterItem.style.marginBottom ="20px";

            if (datas.Search[i].Poster == "N/A"){
                posterItem.setAttribute("src", "http://designravenous.com/no-image-found.jpg");
            }

            listElement.appendChild(listItem);
            listElement.appendChild(listItem1);
            listElement.appendChild(listItem2);
            listElement.appendChild(brTwo);
            listElement.appendChild(posterItem);
            listElement.appendChild(br);
            console.log(posterItem.style.src);
         }

         
         answer.innerHTML = datas.totalResults + " Results Found";
         document.getElementsByTagName('body')[0].appendChild(answer);

         if(datas.totalResults == undefined){
             answer.innerHTML = "No Results Found";
         }


         //ERROR handling for 
      }  else if(xmlReq.readyState == 4 && xmlReq.status != 200){

          var xmlStatus = xmlReq.status;
          switch(xmlStatus){
              case 400:
              errormsg.innerHTML = "400 Bad Request";
              break;
              case 401:
              errormsg.innerHTML = "401 Unauthorized";
              break;
              case 403:
              errormsg.innerHTML = "403 Forbidden";
              break;
              case 404:
              errormsg.innerHTML = "404 Not Found";
              break;
              case 500:
              errormsg.innerHTML = "500 Internal Server Error";
              break;

          }

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

window.onload = function(){
    errormsg = document.getElementById("errormsg");
    var film = "star wars";
    console.log(film);
    updateOfURL(film);
}
