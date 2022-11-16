var express = require('express');
var router = express.Router();
let servidor = 'http://10.1.15.156:8080';
const axios = require('axios');

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
      'Access-Control-Allow-Headers',
      'token,Token,Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
    )
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE')
    next()
  })
  


router.post('*',async function(req, res) {
    let url= servidor+req.url;
    console.log('post ',url)
  console.log(req);

  if(req.url === '/sarc-microservices-svn-client/api/svn/get-pdf'){
    try {
      await axios.post(url,req.body,{headers:{
        Authorization: `${req.headers.authorization}`, 'Content-Type': 'application/json'
      },
      responseType: 'arraybuffer',
      observe: 'response'
    })
    .then(response=>{ 
      res.send(response.data)
    })  
    } catch (err) {
      return res.status(500).json(err);
    }
  }else{
    try {
      console.log(req.body);
      const response = await axios.post(url,req.body,{headers:{
        Authorization: `${req.headers.authorization}`,'Content-Type': 'application/json'
      }
    });
      return res.status(response.status).json( response.data);
    } catch (err) {
      //console.error(err);
      return res.status(500).json(err);
    }
  } 
});


router.get('*',async function(req, res) {
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


router.put('*',async function(req, res) {
  let url= servidor+req.url;
  console.log('PUT',url);
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

module.exports = router;


