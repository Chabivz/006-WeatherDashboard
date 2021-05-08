// Variables

const today = moment().format('dddd, MMM Do YYYY');


$(".history-btn").on('click', function() {
  
  const text = $(this).text();

  searchApi(text);
})


$('#btn-search').on('click', function() {
  const searchVal = $('#txt-search').val()
  const validInput = $('<span>').addClass('valid-input').text(`Please enter a valid input`);
  $('.valid-input').remove();
  if(searchVal == "") {
    
    $('.list-group').children().eq(2).append(validInput);
    return;
  }

  searchApi(searchVal);
})

// 
function cityFunction(event) {
  event.preventDefault();
  
  let txtSearchEl = cityButtonsEl.val(); 
  console.log(txtSearchEl);
}


// Generate Cards
function searchApi(txtSearchEl) {
  

  const request = `http://api.openweathermap.org/data/2.5/forecast?q=${txtSearchEl}&units=imperial&appid=904d57a990eb1f14578feeb79ec45ef2`;
  $('#card-weather').css('visibility', 'visible');

  fetch(request)
    .then(res => res.json()) 

    .then(data => { 
      // console.log(data)
      $('#card-weather').empty();
      let card = $('<div>').addClass('card-body');
      let cardCity = $('<h1>').addClass('card-title').text(`${data.city.name}`);
      let title = $('<h5>').addClass('card-today').text(today);
      let temp = $('<p>').addClass('card-temp').text(`Temp: ${data.list[0].main.temp}°F`);
      let wind = $('<p>').addClass('card-wind').text(`Wind: ${data.list[0].wind.speed}M/H`);
      let humid = $('<p>').addClass('card-humid').text(`Humid: ${data.list[0].main.humidity}%`);
      let icon = $('<img>').addClass('card-icon').attr({ src: `./Assets/Images/${data.list[0].weather[0].icon}.png` });
      card.append(cardCity, title, temp, wind, humid);
      // Variable Below
      let cardForecastDiv = $('<div>').addClass('d-flex justify-content-around weather-card-container');
      $('#card-weather').append(card);
      $('.card-title').append(icon)


      for ( let x = 1; x <= 5 ; x++)
      console.log(x)

      
      let cardForecast = $('<div>').addClass('dcard text-center weather-card');
      let dateForecast = $('<h5>').addClass('card-today-forecast').text(`${data.list[x].dt_txt}`);
      let tempForecast = $('<p>').addClass('card-temp').text(`Temp: ${data.list[x].main.temp}°F`);
      let windForecast = $('<p>').addClass('card-wind').text(`Wind: ${data.list[x].wind.speed}M/H`);
      let humidForecast = $('<p>').addClass('card-humid').text(`Humid: ${data.list[x].main.humidity}%`);
      // let iconForecast = $('<img>').addClass('card-icon').attr({ src: `./Assets/Images/${data.list[x].weather[0].icon}.png` });
      cardForecastDiv.append(cardForecast);
      cardForecast.append(cardCity, dateForecast, tempForecast, windForecast, humidForecast);
      // $('.card-today-forecast').append(iconForecast)

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