
$(function(){
   
    getWeather("New York");
    recent("New York");
    
    
})



var key ="44e4efba5507bb1902fc018e3d350ed5"

var cities = [];



function getWeather(city){
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city }&appid=${key}&units=imperial`)
    .then(response => response.json() )
    .then(function(data){
        $("#curCity").text(data.name)
        $("#cityTemp").text(data.main.temp+"\u00B0")
        $("#cityHum").text(data.main.humidity+"% Humidity")
        $("#cityClouds").text(data.weather[0].main)
        let lat = data.coord.lat;
        let lon = data.coord.lon;
        let iconID = data.weather[0].icon;

        var d = new Date();
        var weekday = ["Sunday","Monday","Tuesday","Wenesday","Thursday","Friday","Saturday"];
        

        var day = weekday[d.getDay()];
        console.log(day);


        $("#cityIcon").attr("src",`http://openweathermap.org/img/wn/${iconID}@2x.png`)
        let codeFull = String(data.weather[0].id);
        let codeShort = codeFull.charAt(0);
        
        let codes= {"2": "yellow", "3": "gray","5":"blue", "6":"white", "7":"beige","8":"green"};
        $("#currentCity").css("background-color",codes[codeShort]);
        
        

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}`)
        .then(response => response.json())
        .then(function(data){
            $("#cityAir").text(data.current.uvi+ " UV Index");
            
    }) 
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`)
    .then(response => response.json())
    .then(function(data){
            
            let j = 0
            let k = weekday.indexOf(day);
            console.log(data);
            for(let i = 0; i<=5; i++){
               
                $("#hDay"+i ).text(weekday[k]);
                $("#tDay"+ i).text(data.list[j].main.temp+ "\u00B0")
                let iconID= data.list[j].weather[0].icon;
                $("#tileIcon"+i).attr("src",`http://openweathermap.org/img/wn/${iconID}@2x.png`)
                let codeFull = String(data.list[j].weather[0].id);
                let codeShort = codeFull.charAt(0);
        
                let codes= {"2": "yellow", "3": "gray","5":"blue", "6":"white", "7":"beige","8":"green"};
                $("#day"+i).css("background-color",codes[codeShort]);

                    


                if(j===0){j+=7;}
                else{j+=8;}
                k+=1;
                
                
            }
        
        
        }) 





    let currentCity = $("#city").val();
    if (cities.includes(currentCity)){
        console.log("already in list");
        console.log(cities)
    }
    else{
    cities.push(currentCity);
    recent(currentCity);
    }
    
    $("#city").val("")
    

})}

function recent(city){
    let count = $("#recent").children().length;
    console.log(count)

    let button =  `<button class="btn btn-light" onclick="getWeather(this.value)" value="${city}">${city}</button>`
    if(count<5){$("#recent").append(button)}
    else{
        $('#recent').children().first().remove();
        $("#recent").append(button)

    }

}


