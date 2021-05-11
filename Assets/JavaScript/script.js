// Variables
const today = moment().format('dddd, MMM Do YYYY');

$(".history-btn").on('click', function() {
  const text = $(this).text();
  localStorage.clear();
  searchApi(text);
})


$('#btn-search').on('click', function() {
  localStorage.clear();
  const searchVal = $('#txt-search').val()
  const validInput = $('<span>').addClass('valid-input').text(`Please enter a valid input`);
  $('.valid-input').remove();
  if(searchVal == "") {
    
    $('.list-group').children().eq(2).append(validInput);
    return;
  }

  searchApi(searchVal);
  // secondFetch(searchVal);
})

// Generate Cards
function searchApi(txtSearchEl) {

  const request = `https://api.openweathermap.org/data/2.5/forecast?q=${txtSearchEl}&units=imperial&appid=904d57a990eb1f14578feeb79ec45ef2`;
  $('#card-weather').css('visibility', 'visible');

  fetch(request)
    .then(res => res.json()) 

    .then(data => { 
      // Clearing data before searching again
      $('#card-weather').empty();

      let card = $('<div>').addClass('card-body');
      let cardCity = $('<h2>').addClass('card-city').text(`${data.city.name}`);
      let title = $('<h5>').addClass('card-today').text(today);
      let temp = $('<p>').addClass('card-temp').text(`Temp: ${data.list[0].main.temp}°F`);
      let wind = $('<p>').addClass('card-wind').text(`Wind: ${data.list[0].wind.speed}M/H`);
      let humid = $('<p>').addClass('card-humid').text(`Humid: ${data.list[0].main.humidity}%`);
      let icon = $('<img>').addClass('card-icon').attr({ src: `./Assets/Images/${data.list[0].weather[0].icon}.png`});
      card.append(cardCity, title, temp, wind, humid);
      $('#card-weather').append(card);
      $('.card-city').append(icon);
      

  })

    .catch(function (error) {
      console.error(error);
    });

    secondFetch(txtSearchEl);
}

function secondFetch(txtSearchEl) {
  const request = `https://api.openweathermap.org/data/2.5/forecast?q=${txtSearchEl}&units=imperial&appid=904d57a990eb1f14578feeb79ec45ef2`;
  $('#card-weather').css('visibility', 'visible');
  $('#five-day-forecast').css('visibility', 'visible');
  $('#card-weather').empty();
  fetch(request)
    .then(res => res.json()) 
    


    .then(data => { 
      // Clearing data before searching again
      $('#five-day-forecast').empty();
      let fiveDayP = $('<p>').addClass('fiveDayP').text("5-Day Forecast: ")
      let cardForecastDiv = $('<div>').addClass('d-flex width justify-content-around align-self-start');
      let hrEl = $('<hr>').addClass('').text("")
      $('#card-weather').append(hrEl, fiveDayP);
      let weatherLocalStorage = JSON.parse(localStorage.getItem("weatherLocalStorage")) || [];
      
      


      for ( let x = 4  ; x <= 40 ; x+=8) {
      let dateWeather = new Date(data.list[x].dt_txt).toLocaleString();
      // LocalStorage
      let tempLS = data.list[x].main.temp;
      let windLS = data.list[x].wind.speed;
      let humidLS = data.list[x].main.humidity;
      let iconLS = data.list[x].weather[0].icon;
      let newForecastEl = {
        temperature: tempLS,
        wind: windLS,
        humid: humidLS,
        icon: iconLS,
        time: dateWeather
      };

      weatherLocalStorage.push(newForecastEl);
      localStorage.setItem('weatherLocalStorage',JSON.stringify(weatherLocalStorage));


      // let dateWeather = new Date(data.list[x].dt_txt).toLocaleString();
      // dateWeather = dateWeather.split(',')[0];
      let cardForecast = $('<div>').addClass('cards');
      let dateForecast = $('<h5>').addClass('card-today-forecast').text(`${dateWeather}`);
      let tempForecast = $('<p>').addClass('card-temp').text(`Temp: ${data.list[x].main.temp}°F`);
      let windForecast = $('<p>').addClass('card-wind').text(`Wind: ${data.list[x].wind.speed}M/H`);
      let humidForecast = $('<p>').addClass('card-humid').text(`Humidity: ${data.list[x].main.humidity}%`);
      let iconForecast = $('<img>').addClass('card-icon').attr({ src: `./Assets/Images/${data.list[x].weather[0].icon}.png` });

      cardForecast.append(dateForecast,iconForecast, tempForecast, windForecast, humidForecast);
      cardForecastDiv.append(cardForecast);

      $('#card-weather').append(cardForecastDiv);
  }
})
    .catch(function (error) {
      console.error(error);
    });

  }

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