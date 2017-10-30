const express = require('express');
//dasdasdasd
const bodyParser = require('body-parser');
const path = require('path');
const api = require('./server/routes/route');
// const monk = require('monk');
// const db = monk('localhost:27017/practiceag2');
const port = 9090;
const app = express();
app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
// app.use(function(req,res,next){
//    console.log(db);
//   req.db = db;
//   next();
// })
app.use('/api', api);
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});
app.listen(port, function(){
  console.log('server is listening at PORT : '+port);
});
