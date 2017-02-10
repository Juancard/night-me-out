'use strict';

(function () {
  /*
  let scriptBarInfoTemplate = document.getElementById('barInfoTemplate');

  let barsHardCoded = {
    bars: [{
      name: "lalola",
      img: "http://lorempixel.com/250/140/food"
    },{
      name: "el re bar",
      img: "http://lorempixel.com/250/140/food"
    }]
  }
  ajaxFunctions.ready(function() {
    let jadeBarInfoTemplate = scriptBarInfoTemplate.innerHTML;
    let htmlBarInfoTemplate = jade.compile(jadeBarInfoTemplate)(barsHardCoded);
    console.log(htmlBarInfoTemplate);
  });
  */
  let btnSearchForBars = document.getElementById('searchBars');
  let searchResults = document.getElementById('searchResults');
  let inputToSearch = document.getElementById('toSearch');

  var searchForBars = (event) => {
    event.preventDefault();
    let query = inputToSearch.value;
    let url = "/search?q="+query;
    console.log(url);
    ajaxFunctions.ajaxRequest('GET', url, null, (data) => {
      searchResults.innerHTML = data;
    })
  }
  btnSearchForBars.addEventListener('click', searchForBars);
})();

//jade.compile($("#jadehi").html())(djson);
