var locationController = require('./locationController.js');

module.exports = function (app) {
  app.post('/locations', locationController.getLocations);
};
