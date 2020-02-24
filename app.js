require('./config/config');
require('./dbConfig/db');

//const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routeIndex = require('./routes/index.router');

let app = express();

// Bodyparser middlewhere
app.use(bodyParser.json());
// cors resolve
app.use(cors());
//register route index
app.use('/api', routeIndex);

app.use((err, req, res, next) => {
  //if(err)
  console.log('err, req, res, next', err, req, res, next)
  console.log('------------err------------', err);
});

// const server = http.createServer();
// server.listen(process.env.PORT, () => {
//   console.log(`Server started at port ==> ${ process.env.PORT }`);
// })

app.listen(process.env.PORT, () => {
    console.log(`Server started at port ${ process.env.PORT }`);
})



