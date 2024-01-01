let popupMenu = document.querySelector('.popup-menu');

function closeDiv(){
    console.log("you are entered");
    popupMenu.style.display = "none";
}

function openPopup(){
    popupMenu.style.display = "flex";
}

function closeButton(){
    document.querySelector('.owner-popup').style.display = "none";
}

function openInfo(){
    document.querySelector('.owner-popup').style.display = "flex";

}

let searchArea = document.querySelector('.search-box');
setInterval(() => {    
    searchArea.classList.add('shakeness');
    
}, 2000);

let span = document.getElementById('span');
function time(){
    var d = new Date();
    let value = d.toLocaleTimeString();
    span.textContent = value;
}

setInterval(time, 1000);


searchArea.classList.remove('shakeness');

let weatherContainer = document.querySelector('.weather-container');
let inputBox = document.getElementById('searchText');
let search = document.querySelector('.search');
let grantlocationContainer = document.querySelector('.your-location');


let currenttab = inputBox;

const API_KEY = "7ddbaa782b57e4b7c27e67abb76a480b";


function getfromSessionStorage(){
    const localCordinates = sessionStorage.getItem('user-cordinates');

    if(!localCordinates)
    {
        // grantlocationContainer.classList.add("active");   
        grantlocationContainer.style.display = "none";     
    }
    else{
        const coordinates = JSON.parse(localCordinates);
        fetchUserWeatherInfo(coordinates);
    }

    console.log("you are in getfromsession");
}

const currentWeather = document.querySelector('.currentWeather');

async function fetchUserWeatherInfo(coordinates){
    const {lat, lon} = coordinates;
    // grantlocationContainer.classList.remove("active");
    console.log("you are in fetchuserweather");
    // make loader visible
    
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=matric`);
        const data = await response.json();

        // loader should be remove
        if(data.cod =="404")
        {
            console.log("error");
        }
        else{
            console.log("you are in else");
        
        renderCurrent(data)   
        }

}


function renderCurrent(data)
{
    const name = document.querySelector("[data-Name]");
    const icon = document.querySelector("[data-Icon]");
    const desc = document.querySelector("[data-Desc]");
    const dataIcon = document.querySelector("[data-Icon2]");
    const temperature = document.querySelector("[data-temperature]");

    name.innerText = `${data.name}`;
    icon.src = `https://flagcdn.com/96x72/${data?.sys?.country.toLowerCase()}.png`;
    desc.innerText = data?.weather?.[0]?.description;
    dataIcon.src = `https://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`;
    let value = `${data?.main?.temp.toFixed(2) - 273}`;
    temperature.innerText = parseInt(value) + '°C';

    const info0 = document.querySelector('[info0]');
    const info1 = document.querySelector('[info1]');
    const info2 = document.querySelector('[info2]');
    const wind = document.querySelector('[wind]');
    const humidity = document.querySelector('[humidity]');
    const cloud = document.querySelector('[cloud]');
    const imgi0 = document.querySelector('[datai0]');
    const imgi1 = document.querySelector('[datai1]');
    const imgi2 = document.querySelector('[datai2]');


    info0.innerText = "Wind-Speed";
    info1.innerText = "humidity";
    info2.innerText = "cloud";

    wind.innerText = `${data?.wind?.speed} m/s`;
    humidity.innerText =`${data?.main?.humidity} %`;
    cloud.innerText = `${data?.clouds?.all} %`;

    imgi0.src = "assets/Wind.svg";
    imgi1.src = "assets/Drop.svg";
    imgi2.src = "assets/CloudRain.svg";
}  






const grantAccessButton = document.querySelector('[grant-location]');
const grantLocation = document.querySelector(".location");

function getLocation(){
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(showPosition);

    }
    else{

        grantAccessButton.style.display = "none";
    }
}

function showPosition(position)
{
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
    };

    sessionStorage.setItem("userCoordinates",JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
    
    grantLocation.style.display = "none";


    console.log('you are in showposition');
}


grantAccessButton.addEventListener("click", getLocation);




function renderWeatherInfo(weatherInfo){

    // firstly, we have to fethc the elements
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]")
    const weatherTemp = document.querySelector("[data-temp");
    const windSpeed = document.querySelector('[data-windspeed');
    const humidity  = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector('[data-cloudiness]');
    const weatherpara = document.querySelector('.parameter-container');
    const image1 = document.querySelector('[data1]');
    const image2 = document.querySelector('[data2]');
    const image3 = document.querySelector('[data3]');
    const para1 = document.querySelector('[para1]');
    const para2 = document.querySelector('[para2]');
    const para3 = document.querySelector('[para3]');
    

    cityName.innerText = `${weatherInfo.name}`;
    countryIcon.src = `https://flagcdn.com/96x72/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    countryIcon.style.height = "2em";
    desc.innerText = weatherInfo?.weather?.[0]?.description;
   weatherIcon.src = `https://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
   weatherIcon.style.height = "4em";
//    weatherTemp.innerText = `${weatherInfo?.main?.temp.toFixed(2) - 273} °C`;
   windSpeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
   let value = `${weatherInfo?.main?.temp.toFixed(2) - 273}`;
    weatherTemp.innerText = parseInt(value) + '°C';

   humidity.innerText = `${weatherInfo?.main?.humidity} %`;
   cloudiness.innerText = `${weatherInfo?.clouds?.all} %`;

   cloudiness.style.height ="4em";

   image1.src = "assets/Wind.svg";
   image2.src = "assets/Drop.svg";
   image3.src = "assets/CloudRain.svg";

   para1.innerHTML = "windspeed";
   para2.innerHTML = "humidity";
   para3.innerHTML = "cloudiness";
}

const searchForm = document.querySelector('.search-box');
const icon = document.querySelector('.parameter-container');
const highlights = document.querySelector('.highlights');
searchForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    let cityName = inputBox.value;
    
    if(cityName.length === 0)
    {
        searchText.classList.add('error');
        setTimeout(() =>{
            searchText.classList.remove('error');
        },1000);
    }
    else{
        fetchSearchWeatherInfo(cityName);
        icon.style.display = "flex";
        highlights.style.display = "none";
    }
});

const showError = document.querySelector('.show-error');
const para4 = document.querySelector('[para4]');
const dataShow = document.querySelector('[city-data]');

async function fetchSearchWeatherInfo(city){
    // adding loader
    // grantaccesscontainer removed
    console.log("are you in fetchsearch");

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=matric`);
        const data = await response.json();

    

    if(data.cod === "404")
    {
        
        showError.style.display = "flex";  
        dataShow.innerText = " " + city;
        dataShow.style.color = "#47E975";
        para4.innerText = "The country you typed really exist? \n kindly Google.";
        
        weatherContainer.style.display = "none";
    }

    else
    {
        

        showError.style.display = "none"; 
        weatherContainer.style.display = "grid";
        // active loader screen
        // fetchUserWeatherInfo.classList.add("active");
        // renderWeatherInfo(data);
        console.log(data);
        renderWeatherInfo(data);

    }
        
      
}






