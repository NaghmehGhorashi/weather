
const theme = document.querySelector(".theme");

const defaultTheme = "themeday";


let selectTheme = localStorage.getItem("theme") || defaultTheme;
document.body.classList.add(selectTheme);


Array.from(theme.children).forEach(element => {
    element.addEventListener("click", (e) => {

        let color = e.target.closest('[data-theme]').dataset.theme;


        localStorage.setItem("theme", color);


        document.body.className = color;
    });
});
   

let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
let apiKey = "6a19c445f4bbb4083b63dbf0ae5f538d"; 

let  searchBtn= document.querySelector(".searchinput");
let searchBox = document.querySelector(".inputbtn");

const weatherImg = document.querySelector(".weather-img");

async function checkWeather(city) {
   

    let response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  
    if (response.status == 404) {
        document.querySelector(".location-not-found").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();
        

       
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
 

        if (data.weather[0].main == "Mist") {
            weatherImg.src = "img/mist.png";
        } else if (data.weather[0].main == "Rain") {
            weatherImg.src = "img/rain.png";
        } else if (data.weather[0].main == "Clouds") {
            weatherImg.src = "img/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherImg.src = "img/clear.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherImg.src = "img/drizzle.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".location-not-found").style.display = "none";
    }
}


searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value); 
});










