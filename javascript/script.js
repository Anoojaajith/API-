let countryIn = document.getElementById('country-in');
let result = document.getElementById('result');

function svgClick(event) {
  const targetPath = event.target.closest('path'); // Get the clicked path element
  if (targetPath) {
      const countryId = targetPath.getAttribute('id');
      countryIn.value = countryId;
      SearchCountry();
  }
}


function svgClick(event) {
  const targetPath = event.target.closest('path'); // Get the clicked path element
  if (targetPath) {
      const countryId = targetPath.getAttribute('id');
      countryIn.value = countryId;
      SearchCountry();
  }
}

function SearchCountry() {

  if (result) {
    result.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

  let countryName = countryIn.value;
  result.style.display = 'block';

  let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

  

  console.log(finalURL)

  fetch(finalURL)

      .then((response) => response.json())
      .then((data) => {

          console.log(data);
          result.innerHTML = `           
              <img src="${data[0].flags.svg}" class="flag-img">
              <h2>${data[0].name.common}</h2>
              <div class="wrapper"> 
                  <div class="data-wrapper">
                      <h4>Capital:</h4>
                      <span>${data[0].capital[0]}</span>
                  </div>
              </div>
              <div class="wrapper"> 
                  <div class="data-wrapper">
                  </div>
              </div>
              <div class="wrapper"> 
                  <div class="data-wrapper">
                      <h4>Population:</h4>
                      <span>${data[0].population}</span>
                  </div>
              </div>

              <div class="wrapper"> 
                  <div class="data-wrapper">
                      <h4>Area:</h4>
                      <span>${data[0].area}</span>
                  </div>
              </div>
              
              <div class="wrapper"> 
                  <div class="data-wrapper">
                      <h4>Currency:</h4>
                      <span>${data[0].currencies[Object.keys(data[0].currencies)].name}
                      - ${Object.keys(data[0].currencies)[0]}</span>
                  </div>
              </div>

              <div class="wrapper"> 
                  <div class="data-wrapper">
                      <h4>Common Languages:</h4>
                      <span>${Object.values(data[0].languages).toString().split(",").join(", ")}
                      </span>
                  </div>
              </div>`;
      })
      .catch(() => {
          if (countryName.trim().length === 0) {
              result.innerHTML = '<h3>! The input field cannot be empty.</h3>';        
          } else {
              result.innerHTML = '<h3>! Please enter a valid country name.</h3>';
          }
          setTimeout(() => {
              result.style.display = 'none';
          }, 3000);
      });  
}



document.querySelectorAll(".allPaths").forEach(e => {
  e.setAttribute('class', `allPaths ${e.id}`);
  e.addEventListener("mouseover", function () {
      window.onmousemove = function (j) {
          x = j.clientX;
          y = j.clientY;
          document.getElementById('name').style.top = y - 25 + 'px';
          document.getElementById('name').style.left = x + 5 + 'px';
      };

      const classes = e.className.baseVal.replace(/ /g, '.');
      document.querySelectorAll(`.${classes}`).forEach(country => {
          country.style.fill = "#dbdbd5";
      });
      document.getElementById("name").style.opacity = 1;
       document.getElementById("namep").style.fontFamily = "FontAwesome, 'roboto'" ;

      document.getElementById("namep").innerText = e.id;

  });

  e.addEventListener("mouseleave", function () {
      const classes = e.className.baseVal.replace(/ /g, '.');
      document.querySelectorAll(`.${classes}`).forEach(country => {
          country.style.fill = "#ececec";
      });
      document.getElementById("name").style.opacity = 0;
  });
});

// Add additional logic for handling click events on map paths
document.querySelectorAll(".allPaths").forEach(e => {
  e.addEventListener("click", function () {
      // Fetch and display information for the selected country
      let countryName = e.id;  // Use the path id as the country name
      // ... Add fetch logic and display information here ...

      // Reset styles for all paths
      document.querySelectorAll(".allPaths").forEach(country => {
          country.style.fill = "#ececec";
      });

      // Highlight the selected country
      const classes = e.className.baseVal.replace(/ /g, '.');
      document.querySelectorAll(`.${classes}`).forEach(country => {
          country.style.fill = "cyan";
      });
  });
});