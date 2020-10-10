// Imports
const express = require('express');
const webRoutes = require('./routes/web');

// Express app creation
const app = express();

// Configurations
const appConfig = require('./configs/app');
const cors = require('cors');

app.use(cors())
// View engine configs
const exphbs = require('express-handlebars');
const hbshelpers = require("handlebars-helpers");
const multihelpers = hbshelpers();
const extNameHbs = 'hbs';
const hbs = exphbs.create({
    extname: extNameHbs,
    helpers: multihelpers
});
app.engine(extNameHbs, hbs.engine);
app.set('view engine', extNameHbs);
app.use(express.static('public'))

// Receive parameters from the Form requests
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Routes
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/', webRoutes);

// App init
app.listen(appConfig.expressPort, () => {
    console.log(`Server is listenning on ${appConfig.expressPort}! (http://localhost:${appConfig.expressPort})`);
});