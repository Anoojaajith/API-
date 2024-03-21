const loadcountryAPI = () =>{
    //fetch url of country 
    fetch('https://restcountries.com/v3.1/all')
    .then(res => res.json())
    .then(data => displayCountries(data));
}
//displaying all countries
const displayCountries = countries =>{
    // console.log(countries);
    // const countriesHTML = countries.map(country => getCountry(country))
    const countriesHTML = countries.map(country => getCountry(country))
    //displaying div to html
    // const container = document.getElementById('countries');
    const container = document.getElementById('countries');
    container.innerHTML = countriesHTML.join(' ');
}
// get data and set it to html
const getCountry = (country) =>{
    console.log(country)
    return `
        <div class="country-div">
        <img src="${country.flags.png}">
        <h2>${country.name.common}</h2>
         </div>
    `
        
}
let searchBtn = document.getElementById("search-btn");
let countryIn = document.getElementById("country-in");
let result = document.getElementById("result");
searchBtn.addEventListener("click", () => {
    let countryName = countryIn.value;
    let finalURL = `https://restcountries.com/v3.1/name/${countryName} `;
    console.log(finalURL);
    fetch(finalURL)
    .then((response) => response.json())
    .then((data) => {
        displayCountryInfo(data,countryName);

    })
    .catch(() => {
        handleSearchError(countryName);
    });
    
});

function displayCountryInfo(data,searchterm) {
    const exactMatch = data.find((country) => country.name.common.toLowerCase() === searchterm.toLowerCase());

    if(exactMatch) {
        result.innerHTML =`
        <img src= "${data[0].flags.svg}"
        class="flag-img">
        <h2>${data[0].name.common}</h2>
         <div class="wrapper">
            <div class="data-wrapper">
                <h4>common languages::</h4>
                <span>${ Object.values(data[0].languages).toString().split(",").join(".")}</span>
            </div>
        </div>`;    
    }else{
        handleSearchError(searchTerm);
    }
}

function handleSearchError(countryName) {
    if (countryName.length === 0) {
        result.innerHTML = `<h3>The input field cannot be empty</h3>`;
    }else{
        result.ineerHTML = `<h3>No results found for "${countryName}"</h3>`;

    }
}


// call the functiom to get output inconsole
loadcountryAPI()