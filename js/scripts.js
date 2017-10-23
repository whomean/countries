var url = 'https://restcountries.eu/rest/v2/name/';
var countriesList = $('#countries');

$('#search').click(searchCountries);

function searchCountries() {
  console.log('test');
  	var countryName = $('#country-name').val();
    if(!countryName.length) countryName = 'Poland';
  console.log(countryName);
  
  $.getJSON(url+countryName, getCountry).fail(function() {throwError();});
}

function getCountry(input) {
    console.log(input);
  	countriesList.empty();
  	input.forEach(function(item) {
	    var li = $('<li>', { 'class': 'country' }).appendTo(countriesList);
	    var ul = $('<ul>').appendTo(li);
	    var flag = $('<li>', { 'class': 'flag' }).appendTo(ul);
	    $('<li>', {'class': 'country_name'}).text(item.name).appendTo(ul);
	    $('<li>').text("Capital: " + item.capital).appendTo(ul);
	    $('<img>', {'src': item.flag}).appendTo(flag);
	});
}

function throwError() {
	countriesList.empty();
	$('<li>', {'class': 'error'}).text("Nie znaleziono").appendTo($('#countries'));
}
