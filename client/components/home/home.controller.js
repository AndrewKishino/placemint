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
    vm.getLocations = getLocations;
    vm.positions = [];

    init();

    /**
     * HomeController.getLocations
     * 
     * @description Signs a user up. Returns nothing.
     * @param {Object} e The event object from form submission.
     */
    function getLocations() {
      homeFactory.getLocations()
        .then(function(data) {
          vm.positions = data;
        });
    }

    function init() {
      
    }
  }

})();