/*ALTERNATIV LÖSNING FÖR ATT FÅ DET I TABLE/TABLEBODY/TR/TD
var cell;
var cellText;
var div;
var list;
var listItem;
var listItemOne;
var listItemTwo;
var posterItem;
var url;
var tbl;
var API = "?apikey=xxxxxxx";
var i=0;



function updateURL(film){
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
    console.log(url);
    generate_table(url);
}


function generate_table(url){
    
    var xml = new XMLHttpRequest();
    xml.onreadystatechange = function(){
        if (xml.readyState == 4 & xml.status == 200){
            var data = JSON.parse(xml.responseText);
        }
    
       

    var body =document.getElementsByTagName("body")[0];
    tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");

    var valueForSwitch = "forsta";

    for (var i=0; i<2; i++){
        var row = document.createElement("tr");

        switch(valueForSwitch){
            case "forsta":

        for(var j=0; j < 4; j++){
            cell = document.createElement("td");
            div = document.createElement("div");
            list = document.createElement("ul");
            listItem = document.createElement("li");
            listItemOne = document.createElement("li");
            listItemTwo = document.createElement("li");
            posterItem = document.createElement("IMG");
            
            listItem.innerHTML = "Title: " + data.Search[j].Title;
            listItemOne.innerHTML = "Year: " + data.Search[j].Year;
            listItemTwo.innerHTML = "Type: " + data.Search[j].Type;
            posterItem.setAttribute("src", data.Search[j].Poster);
            posterItem.style.marginBottom ="15px";
            posterItem.style.marginTop ="10px";

            if (data.Search[j].Poster == "N/A"){
                posterItem.setAttribute("src", "http://designravenous.com/no-image-found.jpg");
            }
            
            list.appendChild(listItem);
            list.appendChild(listItemOne);
            list.appendChild(listItemTwo);
            list.appendChild(posterItem);
            div.appendChild(list);
            cell.appendChild(div);
            row.appendChild(cell);
            div.style.width="320px";
            posterItem.style.width = "200px";
            
        }

        tblBody.appendChild(row);
        valueForSwitch = "andra"
        break;
        case "andra":
        for(var q=4; q < 8; q++){
            cell = document.createElement("td");
            div = document.createElement("div");
            list = document.createElement("ul");
            listItem = document.createElement("li");
            listItemOne = document.createElement("li");
            listItemTwo = document.createElement("li");
            posterItem = document.createElement("IMG");
            listItem.innerHTML = "Title: " + data.Search[q].Title;
            listItemOne.innerHTML = "Year: " + data.Search[q].Year;
            listItemTwo.innerHTML = "Type: " + data.Search[q].Type;
            posterItem.setAttribute("src", data.Search[q].Poster);
            posterItem.style.marginBottom ="15px";
            posterItem.style.marginTop ="10px";
            
            list.appendChild(listItem);
            list.appendChild(listItemOne);
            list.appendChild(listItemTwo);
            list.appendChild(posterItem);
            div.appendChild(list);
            cell.appendChild(div);
            row.appendChild(cell);
            div.style.width="320px";
            posterItem.style.width = "200px";
        }
        tblBody.appendChild(row);
        valueForSwitch = "tredje";
        break;
    }
    }

    tbl.appendChild(tblBody);
    body.appendChild(tbl);

}
xml.open("GET", url, true);
        xml.send();
}

function onTheClick(){
    var input = document.getElementById("input");
    film = input.value;
    updateURL(film);
   
    
}

window.onload = function(){
    errormsg = document.getElementById("errormsg");
    var film = "star wars";
    console.log(film);
    updateURL(film);
}
            */
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

          var a = amount_of_results;    

          document.getElementsByTagName('body')[0].appendChild(listContainer);

            var listElement = document.createElement('ul');

            listContainer.appendChild(listElement);
            var titleans = datas.Response;
            var q = 4;
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
                    break;
                    case "Game":
                    errormsg.innerHTML = "Game Not Found";
                    break;
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
