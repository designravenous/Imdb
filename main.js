//  http://www.omdbapi.com/?apikey=xxxxxxxx&s=s%C3%B6karna&r=json

var API = "?apikey=xxxxxxxx";
var url;
var errormsg;
var listContainer = document.createElement('div');
var typeValue;

function updateOfURL(film){
    var e = document.getElementById("selec").value;
    console.log(e);
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

    }
    sendRequester(url);
}

function sendRequester(url){

    var xmlReq = new XMLHttpRequest();
  xmlReq.onreadystatechange = function(){

      if (xmlReq.readyState == 4 && xmlReq.status == 200){

          var datas = JSON.parse(xmlReq.responseText);

          listContainer.innerHTML=" ";
          errormsg.innerHTML = " "; 

          var resp = datas.Response;

          var amount_of_results = datas.totalResults;

          var a = amount_of_results;    

            document.getElementsByTagName('body')[0].appendChild(listContainer);

            var listElement = document.createElement('ul');

            listContainer.appendChild(listElement);
            var titleans = datas.Response;
            var q = 3;
            if (titleans == "False"){
                switch(typeValue){
                    case "Movie":
                    errormsg.innerHTML = "Movie Not Found";
                    q = 0;
                    break;
                    case "all":
                    errormsg.innerHTML = "No Movie Or Series Found";
                    q = 0;
                    break;
                    case "Series":
                    errormsg.innerHTML = "Series Not Found";
                    q = 0;
                }
            }
            console.log("titleans: " + titleans);


         for(var i = 0; i < q;i++){
            var listItem = document.createElement('li');
            var listItem1 = document.createElement('li');
            var listItem2 = document.createElement('li');
            var posterItem = document.createElement('IMG');
            var br = document.createElement("BR");
            var brTwo = document.createElement("BR");
            posterItem.style.width = "200px";
            listItem.innerHTML = "Title: " + datas.Search[i].Title;
            listItem1.innerHTML = "Year: " + datas.Search[i].Year;
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
