// uses Foursquare API and OpenWeather API

// Foursquare API Info
const clientId = '1ZETSAGCADP5NEW4WBXRBN2AQOSAFKTB501QM3XX4HWQWG5A';
const clientSecret = 'TPZDJPZUBCWSAUWZRAFYPKXDAWIEHADEWZ0AVQUUWS5KCSR5';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';
//Parameters https://developer.foursquare.com/docs/api-reference/venues/explore/

// OpenWeather Info
const openWeatherKey = '0cc3e8d8558c97e9f04889d3fdfaac82';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
// Call back function API call https://openweathermap.org/current

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// AJAX functions here:
const getVenues = async () => {
  const city = $input.val();
  const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20180101`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      //console.log(response)
      const jsonResponse = await response.json();
      
      const venues = jsonResponse.response.groups[0].items.map(items => items.venue);
      console.log(venues);
      return venues;
    }
  } catch (error) {
    console.log(error);
  }
};

const getForecast = async () => {
  const urlToFetch = `${weatherUrl}?&q=${$input.val()}&APPID=${openWeatherKey}`;
  try {
  const response = await fetch(urlToFetch);
  if (response.ok) {
    const jsonResponse = await response.json();
    return jsonResponse;
  }
  } catch (error) {
    console.log(error);
  }
};


// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    const venue = venues[index];
    const venueIcon = venue.categories[0].icon;
    const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;
    let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
};

const renderForecast = (day) => {
  const weatherContent = createWeatherHTML(day);
  $weatherDiv.append(weatherContent);
};

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(venues => renderVenues(venues));
  getForecast();
  return false;
};

$submit.click(executeSearch);