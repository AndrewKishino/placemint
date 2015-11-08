var request = require('request');

module.exports = {

  /**
   * getLocations
   * 
   * @description Gets the available modules.
   * @param {Object} req The request object sent from the client
   * @param {Object} res The response object
   * @param {Function} next The next function
   * @return {Object} 
   */
  getLocations: function(req, res, next) {
    var queryString = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+req.body.location+
                      '&radius=500&types=food|grocery_or_supermarket&key='+process.env.API_KEY;

    request.get(queryString, function(err, data) {
      console.log(data.body);
      res.send(data.body);
    });
  }
};
