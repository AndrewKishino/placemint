/* home.controller.js */
(function() {

  'use strict';

  /**
   * Require the base level module and controller
   */
  angular
    .module('app')
    .controller('HomeController', HomeController);

  /**
   * HomeController
   *
   * @description Contains all the functionality for the HomeController. Returns
   *   nothing.
   */
  function HomeController(homeFactory) {
    var vm = this;
    vm.fetchResults = fetchResults;
    vm.getLocation = getLocation;
    vm.results = [];

    /**
     * HomeController.fetchResults()
     * 
     * @description Fetches the nearest locations.
     * @param {String} location The geolocation of user.
     */
    function fetchResults() {
      homeFactory.placesQuery()
        .then(function(data) {
          vm.results = data.results;
        });
    }

    /**
     * HomeController.getLocation()
     * 
     * @description Fetches the user's locations.
     */
    function getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(updatePosition);
      } else { 
          alert('Browser does not support geolocation.');
      }

      function updatePosition(position) {
        document.getElementsByClassName('search-box')[0].value = position.coords.latitude+','+position.coords.longitude;
      }
    }
  }

})();