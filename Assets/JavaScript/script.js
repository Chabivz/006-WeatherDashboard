// Variables

const today = moment().format('dddd, MMM Do YYYY');

$(".history-btn").on('click', function() {
  
  const text = $(this).text();
  console.log(text);
  searchApi(text);
})


$('#btn-search').on('click', function() {
  const searchVal = $('#txt-search').val()
  console.log(searchVal)
  searchApi(searchVal);
})

// 
function cityFunction(event) {
  event.preventDefault();
  // cityButtonsEl.textContent;
  // console.log(cityButtonsEl.textContent.value);
  let txtSearchEl = cityButtonsEl.val(); 
  console.log(txtSearchEl);
}


// Generate Cards
function searchApi(txtSearchEl) {
  // Variables
  // const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
  // const apiKey = "&appid=904d57a990eb1f14578feeb79ec45ef2";
  // const apiUnits = "&units=imperial";
  // const getWeatherApi =  apiUrl + txtSearchEl + apiUnits + apiKey;
  const request = `http://api.openweathermap.org/data/2.5/weather?q=${txtSearchEl}&units=imperial&appid=904d57a990eb1f14578feeb79ec45ef2`;

  fetch(request)
    .then(res => res.json()) 

    .then(data => { 
      // console.log(data)
      $('#card-weather').empty();

      const card = $('<div>').addClass('card-body');
      const cardCity = $('<h1>').addClass('card-title').text(`${data.name}`);
      const title = $('<h5>').addClass('card-title').text(today);
      const temp = $('<p>').addClass('card-temp').text(`Temp: ${data.main.temp}°F`);
      const wind = $('<p>').addClass('card-wind').text(`Wind: ${data.wind.speed}M/H`);
      const humid = $('<p>').addClass('card-humid').text(`humid: ${data.main.humidity}%`);
      card.append(cardCity, title, temp, wind, humid);
      $('#card-weather').append(card);


    })
    .catch(function (error) {
      console.error(error);
    });
}


// api.openweathermap.org/data/2.5/weather?q=seattle&appid=904d57a990eb1f14578feeb79ec45ef2

// Check if search has a valid input
function validInput() {

  let txtSearchEl = document.querySelector('#txt-search');
  txtSearchEl = txtSearchEl.value;
  if (!txtSearchEl) {
    console.error('Please enter a value.')
    return;
  }

  searchApi(txtSearchEl);
}


// btnSearchEl.onclick = validInput;




      // const tempApi = data.main.temp;
      // const humidApi = data.main.humidity;
      // const windApi = data.wind.speed;
      // const cityApi = data.name;
      
      // Kelvin to Farenheit
      // const tempFar = (tempApi - 273.15) * 9/5 + 32;
      
      // Display to the DOM
      // tempResultEl.textContent = tempFar.toFixed(2);
      // humidityResultEl.textContent = humidApi;
      // windResultEl.textContent = windApi.toFixed(1);
      // cityResultEl.textContent = cityApi;
      // write query to page so user knows what they are viewing
      
      

      // resultTextEl.textContent = locRes.search.query;

      // console.log(locRes);

      // if (!locRes.results.length) {
      //   console.log('No results found!');
      //   resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
      // } else {
      //   resultContentEl.textContent = '';
      //   for (var i = 0; i < locRes.results.length; i++) {
      //     printResults(locRes.results[i]);
      //   }
      // }