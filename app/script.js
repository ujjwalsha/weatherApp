let popupMenu = document.querySelector('.popup-menu');
let backButton = document.querySelector('.back');
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

let loader = document.querySelector('.loader');
// for show the current time 
let span = document.getElementById('span');
let span1 = document.getElementById('span1');
function time(){
    var d = new Date();
    let value = d.toLocaleTimeString();
    span.textContent = value;
    span1.textContent = value;
}

setInterval(time, 1000);


let weatherContainer = document.querySelector('.weather-container');
let inputBox = document.getElementById('searchText');
let search = document.querySelector('.search');
let grantlocationContainer = document.querySelector('.your-location');

let currenttab = inputBox;
const API_KEY = "7ddbaa782b57e4b7c27e67abb76a480b";


// fetch data for current location that user have
function getfromSessionStorage(){
    const localCordinates = sessionStorage.getItem('user-cordinates');

    if(!localCordinates)
    {   
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

// for render the current weather data 
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
    loader.style.display = "none";
}  


const grantAccessButton = document.querySelector('[grant-location]');
const grantLocation = document.querySelector(".location");


// function by which can get location from browser
function getLocation(){
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(showPosition);
        // grantLocation.style.display = "none";

    }
    else{
        grantAccessButton.style.display = "none";
        grantLocation.style.display = "flex";
    }
    

    
}

// to show the exact location with longitude and latitude
function showPosition(position)
{
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
    };

    sessionStorage.setItem("userCoordinates",JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
    
    grantLocation.style.display = "none";
    loader.style.display = "inline-block";
    console.log('you are in showposition');
}

// button grant location from user
grantAccessButton.addEventListener("click", getLocation);


//render the user searched location 

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
const sasaram = document.getElementById('sasaram');
const mumbai = document.getElementById('mumbai');
const lucknow = document.getElementById('lucknow');
const england = document.getElementById('england');
const dubai = document.getElementById('dubai');
const newyork = document.getElementById('newyork');

// console.log(mumbai.textContent);
function searchFor(mumbai){
    let city = mumbai.innerHTML;
    backButton.style.display = "flex";
    
    let n = city.length-1;
    let name = city.substring(1, n);

    fetchSearchWeatherInfo(name);
    highlights.style.display = "none";
    inputBox.value = city.substring(1, n);
}


// back button
backButton.addEventListener("click", () =>{
    console.log("this is ");
    highlights.style.display = "flex";
    weatherContainer.style.display = "none";
    inputBox.value = "";
backButton.style.display = "none";
showError.style.display = "none"; 


});


searchForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    let cityName = inputBox.value;
    
    // console.log(cityName);

    if(cityName.length === 0)
    {
        searchText.classList.add('error');
        setTimeout(() =>{
            searchText.classList.remove('error');
        },1000);
    }
    else{
        fetchSearchWeatherInfo(cityName);
        // fetchSearchWeatherInfo(mumbai.innerText);
        icon.style.display = "flex";
    backButton.style.display = "flex";

        highlights.style.display = "none";
    }
});

const showError = document.querySelector('.show-error');
const para4 = document.querySelector('[para4]');
const dataShow = document.querySelector('[city-data]');

async function fetchSearchWeatherInfo(city){
    // adding loader
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
    
        console.log(data);
        renderWeatherInfo(data);

    }      
}






