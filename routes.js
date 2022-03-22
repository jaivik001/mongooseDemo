let express = require('express');
let router = express.Router();
let app = require('./server');

require('./Modules/User/routes')(router);
app.use(router);

module.exports = router;