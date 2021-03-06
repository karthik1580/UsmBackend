require('./dbConfig/db');
//require('./config/passportConfig');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routeIndex = require('./routes/index.router');
const config = require('./config/config');
//const passport = require('passport');

let app = express();
const jwt = require('jsonwebtoken');
//app.use(require('./config/tokenChecker'));
//const jwt = require('jsonwebtoken');

// Bodyparser middlewhere
app.use(bodyParser.json());
// cors resolve
app.use(cors());
//app.use(passport.initialize());
//register route index
app.use('/api', routeIndex);

app.use((err, req, res, next) => {
  if (err) {
    console.log('Middlewhere error', err);
    return err;
  }
  next();
});

//test
// const server = http.createServer();
// server.listen(process.env.PORT, () => {
//   console.log(`Server started at port ==> ${ process.env.PORT }`);
// })

app.listen(config.PORT, () => {
  console.log(`Server started at port ${config.PORT}`);
})



