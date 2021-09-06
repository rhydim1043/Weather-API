const weatherAPI = {
  key: 'f74f380fe2aba7bc517b36c10cd70eca',
  baseURL: 'http://api.openweathermap.org/data/2.5/weather',
}
const searchInputBox=document.getElementById('input-box');

//EVENT LISTENER ON keypress

searchInputBox.addEventListener('keypress',(event) => {
 if(event.keyCode === 13){
 console.log(searchInputBox.value);
 getWeatherReport(searchInputBox.value);
 }
});

//GET WEATHER DATA

function getWeatherReport(city) {
 fetch(`${weatherAPI.baseURL}?q=${city}&appid=${weatherAPI.key}&units=metric`)
 .then(weather => {
  return weather.json();
 }).then(showWeatherReport);
}

//SHOW WEATHER REPORT
function showWeatherReport(weather){
 console.log(weather);
 let city=document.getElementById('city');
 city.innerText=`${weather.name}, ${weather.sys.country}`;
 let temp=document.getElementById('temp');
 temp.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;
 let minMaxTemp=document.getElementById('min-max');
 minMaxTemp.innerHTML = `${Math.floor(
   weather.main.temp_min
 )}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max)`
 let report=document.getElementById('weather');
 report.innerHTML = `${weather.weather[0].main}`;
 let date=document.getElementById('date');
 let todayDate=new Date();
 date.innerText=dateManage(todayDate);

 if (report.textContent == 'Clear') {
   document.body.style.backgroundImage = "url('clearSky.gif')"
 } else if (report.textContent == 'Rain')
   document.body.style.backgroundImage = "url('rain.gif')"
 else if (report.textContent == 'Haze' || report.textContent == 'Mist')
   document.body.style.backgroundImage = "url('haze.gif')"
 else if (report.textContent == 'Clouds')
   document.body.style.backgroundImage = "url('clouds.gif')"
 else if (report.textContent == 'Snow')
   document.body.style.backgroundImage = "url('snow.gif')"
 }

//DATE MANAGE
function dateManage(dateArg) { 
 let days=["Sunday","Monday","Tuesday","Wednesday","Thursday",'Friday','Saturday'];
 let months = [
   'January',
   'February',
   'March',
   'April',
   'May',
   'June',
   'July',
   'August',
   'September',
   'October',
   'November',
   'December',
 ];
 let year=dateArg.getFullYear();
 let month=months[dateArg.getMonth()];
 let date=dateArg.getDate();
 let day=days[dateArg.getDay()];
 return `${date} ${month} ${year}, ${day}`;
 }