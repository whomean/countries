var url = 'https://restcountries.eu/rest/v2/name/';
var countriesList = $('#countries');

$('#search').click(searchCountries);

function searchCountries() {
  	var countryName = $('#country-name').val();
    if(!countryName.length) countryName = 'Poland';

  $.getJSON(url+countryName, getCountry).fail(function() {throwError();});
}

function getCountry(input) {
  	countriesList.empty();
  	input.forEach(function(item) {
	    var li = $('<li>', { 'class': 'country' }).appendTo(countriesList);
	    var ul = $('<ul>').appendTo(li);
	    var flag = $('<li>', { 'class': 'flag' }).appendTo(ul);
	    $('<li>', {'class': 'country_name'}).text(item.name).appendTo(ul);
	    $('<img>', {'src': item.flag}).appendTo(flag);
	});
  $('#countries > li').draggable({
    helper: 'clone'
  });
}

function getDetails(name, target) {
  var targetList = target.getElementsByTagName("ul")[0].firstChild.getElementsByTagName("ul")[0];
  $.getJSON(url+name, getDetailsOfCountry).fail(function() {throwError();});
  function getDetailsOfCountry(input) {
    input.forEach(function(item) {
      var flag = $('<li>', { 'class': 'flag' }).appendTo(targetList);
      $('<img>', {'src': item.flag}).appendTo(flag);
      $('<li>', {'class': 'country_name'}).text(item.name).appendTo(targetList);
      $('<li>').text(`Capital:  ${item.capital}`).appendTo(targetList)[0];
      $('<li>', {'class': 'population'}).text(`Pupulation:  ${item.population}`).appendTo(targetList)[0];
      $('<li>', {'class': 'area'}).text(`Area:  ${item.area}`).appendTo(targetList)[0];
      compare();
    });
  }

  $(targetList).empty();  //prevent duplication
}

function throwError() {
	countriesList.empty();
	$('<li>', {'class': 'error'}).text("Nie znaleziono").appendTo($('#countries'));
}


$(document).ready(function() {
  $('.country_one').droppable({
    drop: function(event, ui) {
      $('.list').empty();
      $('.list').append(ui.draggable);
      var droppedCountry = ui.draggable[0].firstChild.getElementsByClassName("country_name")[0].innerHTML;
      getDetails(droppedCountry, event.target);
    },
    hoverClass: 'highlight'
  });
  $('.country_two').droppable({
    drop: function(event, ui) {
      $('.second_list').empty();
      $('.second_list').append(ui.draggable);
      var droppedCountry = ui.draggable[0].firstChild.getElementsByClassName("country_name")[0].innerHTML;
      getDetails(droppedCountry, event.target);
    },
    hoverClass: 'highlight'
  });
});

function drawPopulationChart(radius1, radius2, population1, population2) {
  $("#draw-field-one").empty();
  $("#draw-field-two").empty();
  if(radius1 > radius2) {
    var circle1 = $('<div>', {'class': 'circle1'}).appendTo($("#draw-field-one"));
    $(".circle1").after("<p class='growing-number' id='growing-number-1'>"+population1+"</p>");
    circle1.css({
      "width": radius1+"%",
      "background-color": "#880e4f",
      "border-radius": "50%"
    });
    $('.circle1').toggleClass('helper');
    var circle2 = $('<div>', {'class': 'circle2'}).appendTo($("#draw-field-two"));
    $(".circle2").after("<p class='growing-number' id='growing-number-2'>"+population2+"</p>");
    circle2.css({
      "width": radius2+"%",
      "background-color": "#880e4f",
      "border-radius": "50%"
    });
    $('.circle2').toggleClass('helper');

    growNumber('growing-number-1','growing-number-2');
    /*CHART ALIGNMENT*/
    var populationDrawHeight = $("#draw-field-one").height();
    $("#draw-field-two").css("height", populationDrawHeight);
  }
  if(radius2 > radius1) {
    console.log("Drugi wiekszy");
    var circle2 = $('<div>', {'class': 'circle2'}).appendTo($("#draw-field-two"));
    $(".circle2").after("<p class='growing-number' id='growing-number-2'>"+population2+"</p>");
    circle2.css({
      "width": radius2+"%",
      "background-color": "#880e4f",
      "border-radius": "50%"
    });
    $('.circle2').toggleClass('helper');
    var circle1 = $('<div>', {'class': 'circle1'}).appendTo($("#draw-field-one"));
    $(".circle1").after("<p class='growing-number' id='growing-number-1'>"+population1+"</p>");
    circle1.css({
      "width": radius1+"%",
      "background-color": "#880e4f",
      "border-radius": "50%"
    });
    $('.circle1').toggleClass('helper');

    growNumber('growing-number-2', 'growing-number-1');
    /*CHART ALIGNMENT*/
    var populationDrawHeight = $("#draw-field-two").height();
    $("#draw-field-one").css("height", populationDrawHeight);
  }
}

function drawAreaChart(areaRadius1, areaRadius2, area1, area2) {
  $("#draw-field-three").empty();
  $("#draw-field-four").empty();
  if(area1 > area2) {
    var circle3 = $('<div>', {'class': 'circle3'}).appendTo($("#draw-field-three"));
    $(".circle3").after("<p class='growing-area-number' id='growing-number-3'>"+area1+"</p>");
    circle3.css({
      "width": areaRadius1+"%",
      "background-color": "#880e4f",
      "border-radius": "50%"
    });
    $('.circle3').toggleClass('helper');
    var circle4 = $('<div>', {'class': 'circle4'}).appendTo($("#draw-field-four"));
    $(".circle4").after("<p class='growing-area-number' id='growing-number-4'>"+area2+"</p>");
    circle4.css({
      "width": areaRadius2+"%",
      "background-color": "#880e4f",
      "border-radius": "50%"
    });
    $('.circle4').toggleClass('helper');
    growAreaNumber('growing-number-3','growing-number-4');
    /*CHART ALIGNMENT*/
    var areaDrawHeight = $("#draw-field-three").height();
    $("#draw-field-four").css("height", areaDrawHeight);
  }
  if(area2 > area1) {
    var circle4 = $('<div>', {'class': 'circle4'}).appendTo($("#draw-field-four"));
    $(".circle4").after("<p class='growing-area-number' id='growing-number-4'>"+area2+"</p>");
    circle4.css({
      "width": areaRadius2+"%",
      "background-color": "#880e4f",
      "border-radius": "50%"
    });
    $('.circle4').toggleClass('helper');
    var circle3 = $('<div>', {'class': 'circle3'}).appendTo($("#draw-field-three"));
    $(".circle3").after("<p class='growing-area-number' id='growing-number-3'>"+area1+"</p>");
    circle3.css({
      "width": areaRadius1+"%",
      "background-color": "#880e4f",
      "border-radius": "50%"
    });
    $('.circle3').toggleClass('helper');
    growAreaNumber('growing-number-4','growing-number-3');
    /*CHART ALIGNMENT*/
    var areaDrawHeight = $("#draw-field-four").height();
    $("#draw-field-three").css("height", areaDrawHeight);
  }
}

function growNumber(target1, target2) {
  $('.growing-number').each(function () {
    var $this = $(this);
    jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
      duration: 3000,
      easing: 'swing',
      step: function () {
        $this.text(Math.ceil(this.Counter));
      }
    });
  });
  $('#' + target1).animate({
    'font-size' : 40
  }, 2500);
  $('#' + target2).animate({
    'font-size' : 20
  }, 2500);
}

function growAreaNumber(target1, target2) {
  $('.growing-area-number').each(function () {
    var $this = $(this);
    jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
      duration: 3000,
      easing: 'swing',
      step: function () {
        $this.text(Math.ceil(this.Counter));
      }
    });
  });
  $('#' + target1).animate({
    'font-size' : 40
  }, 2500);
  $('#' + target2).animate({
    'font-size' : 20
  }, 2500);
}


function compare() {
  var ratio, areaRatio;
  if($('.country_one .population').text().length > 0 && $('.country_two .population').text().length > 0) {
    var population1 = parseInt($('.country_one .population')[0].innerHTML.replace(/\D/g, ''));
    var population2 = parseInt($('.country_two .population')[0].innerHTML.replace(/\D/g, ''));
    if(population1 > population2) {
      ratio = population1 / population2;
      var radius1 = 100;
      var field1 = Math.PI * (radius1*radius1);
      var radius2 = Math.sqrt((field1 / ratio)/Math.PI);
      drawPopulationChart(radius1, radius2, population1, population2);
    }
    if(population2 > population1) {
      ratio = population2 / population1;
      var radius2 = 100;
      var field2 = Math.PI * (radius2*radius2);
      var radius1 = Math.sqrt((field2 / ratio)/Math.PI);
      drawPopulationChart(radius1, radius2, population1, population2);
    }

    var area1 = parseInt($('.country_one .area')[0].innerHTML.replace(/\D/g, ''));
    var area2 = parseInt($('.country_two .area')[0].innerHTML.replace(/\D/g, ''));
    if(area1 > area2) {
      areaRatio = area1 / area2;
      var areaRadius1 = 100;
      var areaField1 = Math.PI * (areaRadius1*areaRadius1);
      var areaRadius2 = Math.sqrt((areaField1 / areaRatio)/Math.PI);
      drawAreaChart(areaRadius1, areaRadius2, area1, area2);
    }
    if(area2 > area1) {
      areaRatio = area2 / area1;
      var areaRadius2 = 100;
      var areaField2 = Math.PI * (areaRadius2*areaRadius2);
      var areaRadius1 = Math.sqrt((areaField2 / areaRatio)/Math.PI);
      drawAreaChart(areaRadius1, areaRadius2, area1, area2);
    }
  } else {
    console.log("Select second country");
  }

}
