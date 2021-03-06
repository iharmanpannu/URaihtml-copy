const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const logger = require('morgan');

const rpio = require('rpio')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
// const ledgreen = require('./routes/ledgreen')
// const ledoff = require('./routes/ledoff')

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.post('/led/green', function (req, res) {
    rpio.open(11, rpio.OUTPUT, rpio.LOW);
    console.log('Pin 11 is currently ' + (rpio.read(11) ? 'high' : 'low'));
    for (var i = 0; i < 5; i++) {
        /* On for 1 second */
        rpio.write(11, rpio.HIGH);
        rpio.sleep(1);

        /* Off for half a second (500ms) */
        rpio.write(11, rpio.LOW);
        rpio.msleep(500);
    }

});

app.post('/led/off', function (req, res) {
    rpio.open(10, rpio.OUTPUT, rpio.LOW);
    console.log('Pin 10 is currently ' + (rpio.read(10) ? 'high' : 'low'));
    for (var i = 0; i < 5; i++) {
        /* On for 1 second */
        rpio.write(10, rpio.HIGH);
        rpio.sleep(1);

        /* Off for half a second (500ms) */
        rpio.write(10, rpio.LOW);
        rpio.msleep(500);
    }

});



module.exports = app;