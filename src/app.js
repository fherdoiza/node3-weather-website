const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js')
const weather = require('./utils/weather.js')


const app = express();

const port = process.env.PORT || 3000;

//console.log(__dirname);
//console.log(__filename);
//console.log(path.join(__dirname, '../public'));

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../views/views');
const partialsPath = path.join(__dirname, '../views/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath); // forlder views is the default route. If we want to change the 'views' forlder with 'templates' or in this case with views/views we have to add this code and the path
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// we use hbs for dynamic page

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Fernando Herdoiza'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page',
    firstName: 'Fernando'
  });
});

app.get('/about/me', (req, res) => {
  res.send('me page');
});

// help page use .html route


//http://localhost:3000/weather?address=Quito
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    addressError(res, 'You must provide an address.');
  }
  const currentLocation = req.query.address;
  if (currentLocation) {
    geocode(currentLocation, (error, {
      lat,
      lng,
      location
    } = {}) => { // Object destructoring view 7-default-params
      if (error) {
        addressError(res, error);
      } else {
        weather(lat, lng, (error, {
          summary,
          temp,
          precip
        } = {}) => { // Object destructoring view 7-default-params
          if (error) {
            addressError(res, error);
          } else {
            let forecast = req.query.address + '  ' + summary + ' It is currently ' + temp + ' degrees and ' + precip + '% chance of rain.';
            res.send({
              forecast: forecast,
              location: location,
            });
          }
        });
      }
    });
  }
});

const addressError = function (res, stringError) {
  return res.send({
    error: stringError
  });
}

//http://localhost:3000/products?search=1
app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term.'
    });
  }
  res.send({
    products: []
  });
});


app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'page not found'
  });
});


app.listen(port, () => {
  console.log('Server is up on port ' + port);
});