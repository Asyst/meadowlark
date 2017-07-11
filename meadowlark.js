// imports
var fortune = require('./lib/fortune.js');

//
var express = require('express');
var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });


var app = express();

app.set('port', process.env.PORT || 8080);

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use( express.static( __dirname + '/public' ) );

// Home
app.get('/', function ( req, res ) {
  res.render('home');
});

// About
app.get('/about', function ( req, res ) {
  res.render('about', { fortune: fortune.getFortune() });
});

// 404
app.use(function ( req, res ) {
  res.status(404);
  res.render('404');
});

// 500
app.use(function ( err, req, res, next ) {
  console.log('stack', err.stack);
  res.status(500);
  res.render('500');
});

app.listen( app.get('port'), function () {
  console.log( 'Express has run on port ' + app.get('port') );
});
