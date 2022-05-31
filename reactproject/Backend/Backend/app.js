'use strict';

var express = require('express');
var path = require('path');



var bodyParser = require('body-parser');
const cors = require('cors');

var api = require('./routes/api');

var app = express();
app.use(cors())


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));




app.use('/api', api);



app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});
