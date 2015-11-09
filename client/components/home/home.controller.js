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
    vm.distance = distance;
    vm.results = [];
    vm.vicinity = '';
    vm.showSpinner = false;
    vm.searched = false;
    vm.location = {
      lat: '',
      lon: ''
    };

    /**
     * HomeController.fetchResults()
     * 
     * @description Fetches the nearest locations.
     * @param {String} location The geolocation of user.
     */
    function fetchResults() {
      homeFactory.placesQuery()
        .then(function(data) {
          vm.showSpinner = false;
          vm.vicinity = document.getElementsByClassName('search-box-latlon')[0].value;
          vm.results = data.results;
          vm.searched = true;
        });
    }

    /**
     * HomeController.getLocation()
     * 
     * @description Fetches the user's locations.
     */
    function getLocation() {
      vm.showSpinner = true;
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(updatePosition);
      } else { 
          alert('Browser does not support geolocation.');
      }

      function updatePosition(position) {
        document.getElementsByClassName('search-box-latlon')[0].value = position.coords.latitude+','+position.coords.longitude;
        vm.location.lat = position.coords.latitude;
        vm.location.lon = position.coords.longitude;
        vm.location.location = position.coords.latitude + ',' + position.coords.longitude;

        fetchResults();
      }
    }

    function distance(lat1, lon1, lat2, lon2, unit) {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var radlon1 = Math.PI * lon1/180;
      var radlon2 = Math.PI * lon2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit=='K') { dist = dist * 1.609344; }
      if (unit=='N') { dist = dist * 0.8684; }
      return dist.toFixed(2);
    }


  }

})();