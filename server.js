const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;


hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', text => {
  return text.toUpperCase();
})

app.use(express.static(`${__dirname}/public`));
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  const now = new Date().toString();
  const log = (`${now}: ${req.method} ${req.url}`);

  fs.appendFile('server.log', log + '\n', err => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

/*
app.use((req, res, next) => {
  res.render('maintenance.hbs');
});
*/

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home page',
    welcomeMessage: 'Welcome to my website',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page',
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
