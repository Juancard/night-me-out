'use strict';

(function () {

  let btnSearchForBars = document.getElementById('searchBars');
  let searchResults = document.getElementById('searchResults');
  let inputToSearch = document.getElementById('toSearch');

  let urlUserGoing = appUrl + "/api/bar";
  let urlSearch = appUrl + "/search?q=";

  let onUserGoing = (event) => {
    console.log(event.target.id);
  }

  var searchForBars = (event) => {
    event.preventDefault();
    let query = inputToSearch.value;
    urlSearch += query;
    ajaxFunctions.ajaxRequest('GET', urlSearch, null, (data) => {
      searchResults.innerHTML = data;
    })
  }
  btnSearchForBars.addEventListener('click', searchForBars);

  searchResults.addEventListener('click', onResultsClick, false);

  function onResultsClick(e){
    if (e.target && e.target.nodeName === "BUTTON") {
      userGoing(e.target.id);
    }
    e.stopPropagation();
  }

  function userGoing(barYelpId){
    urlUserGoing += '/' + barYelpId;
    ajaxFunctions.ajaxRequest('GET', urlUserGoing, null, function(data){
      data = JSON.parse(data);
      if (data.redirect) window.location.href = data.redirect;
      console.log(data);
    })
  }
})();

//jade.compile($("#jadehi").html())(djson);
