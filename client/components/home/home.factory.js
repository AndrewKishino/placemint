/* home.factory.js */
(function() {

  angular
    .module('app')
    .factory('homeFactory', homeFactory);

    /**
     * ferdFactory
     * 
     * @description Factory for interfacing with FerdX server for all available
     *   modules with MegaFerd server.
     * @return {Object} The factory
     */
    function homeFactory($q, $http) {

      var factory = {
        placesQuery: placesQuery
      };

      return factory;

      ////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////

      /**
       * ferdFactory.getAvailableModules
       *
       * @description Sends a GET request to server for all available modules.
       * @return {Object} response data
       */
      function placesQuery(location) {
        var queryString = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+location+
                          '&radius=500&types=food|grocery_or_supermarket&keyword=vegetarian&key=AIzaSyCW3Nkhaq7lPYEujqsVI7WIMUUTi1CsA2I';
        return $http.get(queryString)
          .then(function(response) {
            return response.data;
          });
      }
    }

})();
