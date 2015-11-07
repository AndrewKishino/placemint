// load up .env as soon as possible
require('dotenv').load();

// connect and fire up
var app = require('./config/server.js');

// listen
app.listen(app.get('port'));