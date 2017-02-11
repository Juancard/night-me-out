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
    let url = urlSearch + query;
    ajaxFunctions.ajaxRequest('GET', url, null, (data) => {
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
    let url = urlUserGoing + '/' + barYelpId;
    ajaxFunctions.ajaxRequest('POST', url, null, function(data){
      data = JSON.parse(data);
      if (data.redirect) {
        window.location.href = data.redirect;
      } else if (data.error) {
        alert(data.message || "Error");
      } else {
        console.log(data);
        uploadUserGoing(data.bar);
      }
    })
  }

  function uploadUserGoing(bar){
    let button = document.getElementById(bar.yelpId);
    button.firstElementChild.innerHTML = bar.usersGoing.length;
  }
})();

//jade.compile($("#jadehi").html())(djson);
