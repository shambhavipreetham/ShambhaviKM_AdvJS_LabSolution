const api = {
    key: "7e3f21edee540e6110af347b55eb1ab2",
    base: "https://api.openweathermap.org/data/2.5/",
    units: "metric"
  }



const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress',setQuery);
  
function setQuery(event){
  console.log(event.keyCode)
  if (event.keyCode==13){
    getResults(searchbox.value);
  }
}

function getResults(cityName){
  console.log("city is :" + cityName);
  const url = `${api.base}weather?q=${cityName}&units=${api.units}&appid=${api.key}`
  console.log("url is",url );
  fetch(url).then((response)=>{
    console.log(response);
    return response.json();
  }).then((responseJson)=>{
    console.log(responseJson)
    if (responseJson.cod===200){
      displayResults(responseJson);
    }
  })
  .catch((err)=>{
    console.log("Error in calling API ",err);
  })
}

function displayResults(responseJson){
  //query selector...city
  //innerText=>responseJson.name,responseJson.sys.county
  let city =document.querySelector(".city");
  city.innerText= `${responseJson.name},${responseJson.sys.country}`;

  let temp = document.querySelector(".temp");
  temp.innerHTML = `${responseJson.main.temp}`;

  let weather = document.querySelector('.weather');
  weather.innerHTML=responseJson.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerHTML=`${responseJson.main.temp_min}°c/${responseJson.main.temp_max}°c`;


  let now = new Date();
  let date = document.querySelector('.date');
  date.innerHTML=dateBuilder(now);

  function dateBuilder (date){
    let months = ["Jan", "Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
    let days= ["Sun","Mon","Tue","Wed","Thur","Fri","Sat","Sun"];

    let day = days[date.getDay()];
    let month = months[date.getMonth()];
    let year = date.getFullYear();

    return `${day} ${date.getDate()} ${month} ${year}`;
    
    // console.log(date);
    // return date;
  }

}