var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const axios = require('axios');
var indexRouter = require('./routes/index');

// Definir la dirección a la que mandará las solicitudes
let servidor = 'http://10.1.15.156:8080';


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public/sarc')));

app.use('/SARC', indexRouter);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'token,Token,Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
  )
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
})


app.post('*',async function(req, res) {
    let url= servidor+req.url;
  if(req.url === '/sarc-microservices-svn-client/api/svn/get-pdf'){
    try {
      const response = await axios.post(url,req.body,{headers:{
        Authorization: `${req.headers.authorization}`,
        'Content-Type': 'application/json',
      },responseType:'arraybuffer'
    })
    
      return res.status(response.status).json(Object.assign({},response.data));
    } catch (err) {
      console.error(err)
      return res.status(500).json([]);
    }
  }else{
    try {
      const response = await axios.post(url,req.body,{headers:{
        Authorization: `${req.headers.authorization}`
      }});
      return res.status(response.status).json( response.data);
    } catch (err) {
      console.error(err)
      return res.status(500).json([]);
    }
  } 
});


app.get('*',async function(req, res) {
  let url= servidor+req.url;
console.log('GET',url);
try {
    const response = await axios.get(url,{headers:{
      Authorization: `${req.headers.authorization}`
    }});
    return res.status(response.status).json( response.data);
  } catch (err) {
    console.log(err);
    return res.status(500).json([]);
  }
});


app.put('*',async function(req, res) {
  let url= servidor+req.url;

try {
    const response = await axios.put(url,req.body,{headers:{
      Authorization: `${req.headers.authorization}`
    }});
    return res.status(response.status).json( response.data);
  } catch (err) {
    console.error(err)
    return res.status(500).json([]);
  }
});




module.exports = app;
