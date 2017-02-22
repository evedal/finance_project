var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var apiComment = require('./routes/api/comment');
var apiPost = require('./routes/api/post');
var apiUser = require('./routes/api/user');
var apiCompany = require('./routes/api/company');
var apiSegment = require('./routes/api/segment');

import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes';


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api/', apiComment);
app.use('/api/', apiPost);
app.use('/api/', apiUser);
app.use('/api/', apiCompany);
app.use('/api/', apiSegment);

if(process.env.NODE_ENV !== 'test') {
    app.get('*', (req, res) => {
        console.log(req);
        match(
            {routes, location: req.url},
            (err, redirectLocation, renderProps) => {

                // in case of error display the error message
                if (err) {
                    return res.status(500).send(err.message);
                }

                // in case of redirect propagate the redirect to the browser
                if (redirectLocation) {
                    return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
                }

                // generate the React markup for the current route
                var markup;
                if (renderProps) {
                    // if the current route matched we have renderProps
                    markup = renderToString(<RouterContext {...renderProps}/>);
                } else {
                    // otherwise we can render a 404 page
                    //       markup = renderToString(<NotFoundPage/>);
                    res.status(404);
                }

                // render the index template with the embedded React markup
                return res.render('index', {markup});
            }
        );
    });
}


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
