const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');
const staticAsset = require('static-asset');
const routes = require('./routes');
const config = require('./config');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')

//database
mongoose.Promise = global.Promise;
mongoose.set('debug', config.IS_PRODUCTION);
mongoose.connection
    .on('error', error => console.log(error))
    .on('close', () => console.log('Database connection closed.'))
    .once('open', () => {
        const info = mongoose.connections[0]
        console.log(`Connected to ${info.host}:${info.port}/${info.name}`)});


mongoose.connect(config.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})


// express
const app = express();

// sets and uses
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser('secret key'))
app.use(staticAsset(path.join(__dirname, 'public')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/javascripts', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')));

//routes
const {
    home_route,
    analytic_route
} = routes;

app.use('/', home_route)
app.use('/', analytic_route)
app.use('/api', home_route)

app.get('/get-cookie', (req, res) => {
    console.log('Cookie: ', req.cookies)
    res.send('Get Cookie')
})

app.get('/set-cookie', (req, res) => {
    res.cookie('token', '12345ABCDE')
    res.send('Set Cookie')
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.render('error', {
        message: error.message,
        error: !config.IS_PRODUCTION ? error : {}
    });
});

app.listen(config.PORT, () =>
    console.log(`Listening on port ${config.PORT}!`));

