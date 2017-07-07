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
  var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  res.render('about', { fortune: randomFortune });
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

// fortunes array
var fortunes = [
    "Победи свои страхи, или они победят тебя.",
    "Рекам нужны истоки.",
    "Не бойся неведомого.",
    "Тебя ждет приятный сюрприз.",
    "Будь проще везде, где только можно.",
];
