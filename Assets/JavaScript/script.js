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
  searchForcastApi(searchVal);
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
      // Clearing data before searching again
      $('#card-weather').empty();
      // $('#weather-forecast').empty();

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
  const request = `http://api.openweathermap.org/data/2.5/forecast?q=${txtSearchEl}&units=imperial&appid=904d57a990eb1f14578feeb79ec45ef2`;
  $('#five-day-forecast').css('visibility', 'visible');

  fetch(request)
    .then(res => res.json()) 

    .then(data => { 
      // Clearing data before searching again
      $('#five-day-forecast').empty();

      let cardForecastDiv = $('<div>').addClass('d-flex justify-content-end align-self-start');


      for ( let x = 0; x <= 40 ; x+=8) {
      let date = data.list[x].dt_txt.split(' ')[0];
      console.log(date);

      let cardForecast = $('<div>').addClass('cards card');
      let dateForecast = $('<h5>').addClass('card-today-forecast').text(`${date}`);
      let tempForecast = $('<p>').addClass('card-temp').text(`Temp: ${data.list[x].main.temp}°F`);
      let windForecast = $('<p>').addClass('card-wind').text(`Wind: ${data.list[x].wind.speed}M/H`);
      let humidForecast = $('<p>').addClass('card-humid').text(`Humid: ${data.list[x].main.humidity}%`);
      let iconForecast = $('<img>').addClass('card-icon').attr({ src: `./Assets/Images/${data.list[x].weather[0].icon}.png` });

      cardForecast.append(dateForecast,iconForecast, tempForecast, windForecast, humidForecast);
      cardForecastDiv.append(cardForecast);

      $('#five-day-forecast').append(cardForecastDiv);
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