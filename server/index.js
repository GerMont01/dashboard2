const os = require('os');
const os2 = require('os-utils');

const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

const checkDiskSpace = require('check-disk-space').default;
let diskspace = [];
if (os.platform() === 'win32'){
   checkDiskSpace('C:/').then((diskSpace) => {
      diskspace = diskSpace
   })
} else {
      checkDiskSpace('/').then((diskSpace) => {
         diskspace = diskSpace
      })
}


// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.get('/', (req,res) =>{
   res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});
app.get('/computer', (req,res) =>{
   res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});
app.get('/invalid', (req,res) =>{
   res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

let cpuUsage = [];
setInterval(() =>{
   os2.cpuUsage(v=> cpuUsage = v)

},1000);
app.get('/api/system', (req, res) => {
   let host = os.hostname();
   let arch = os.arch();
   let sys = os.platform();
   let version = '' 
   if (sys === 'win32'){
      version = os.version();
   } else{
      version = sys;
   }
   let cpu = os.cpus();
   let uptime = os.uptime();
   let totalmem = os.totalmem();
   let freemem = os.freemem();
   let cores = cpu.length;
   let network = os.networkInterfaces();
   res.json({
      host,
      arch,
      sys,
      version,
      model:cpu[0].model,
      speed:cpu[0].speed,
      uptime,
      totalmem,
      freemem,
      cpuUsage,
      cores,
      network,
      diskspace
   })
})

app.get('/api/loged' , (req, res) => {
   if(logedin){
       res.json(true)
      } else {
         res.json(false)
      }
})

let boxesStatus = {}
app.get('/admin', function(req, res){
   res.json(boxesStatus)
})
app.post('/admin', function(req, res){
   let box = Object.entries(req.body)[0];
   switch(box[0]){
      case 'box1':
         boxesStatus.box1 = box[1]
         break;
      case 'box2':
         boxesStatus.box2 = box[1]
         break;
      case 'box3':
         boxesStatus.box3 = box[1]
      break;
      case 'box4':
         boxesStatus.box4 = box[1]
         break;
      case 'box5':
         boxesStatus.box5 = box[1]
         break;
      case 'box6':
         boxesStatus.box6 = box[1]
         break;
      default:
         break;
   }
   res.json(boxesStatus)
})

//////////////////////////////////////////////////////////////////
let logedin = false;

var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var session = require('express-session');
var cookieParser = require('cookie-parser');

app.set('client','./client');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require('dotenv').config();
app.use(upload.array());
app.use(cookieParser());
app.use(session({secret: process.env.SESSION_SECRET}));

var Users = [];


app.post('/signup', function(req, res){
   if(!req.body.id || !req.body.password){
      res.redirect("/");
   } else {
      if (Users.some(user=>user.id === req.body.id)){
         res.redirect("/invalid");
      } else {
         var newUser = {id: req.body.id, password: req.body.password};
         Users.push(newUser);
         res.redirect('/');
      }
      
   }
});

app.get('/protected_page', function(req, res){
    if(req.session.user){
        res.json(req.session.user.id)
    }else {
        var err = new Error("Not logged in!");
        res.json(err);
    };
});

app.get('/login', function(req, res){
   if(req.session.user){
      res.json(req.session.user.id)
   }else{
      res.json('another')
   }
});
app.post('/login', function(req, res){
   if(Users.length===0&&req.body.id==='admin'){
      var newUser = {id: req.body.id, password: req.body.password};
      Users.push(newUser);
      req.session.user = newUser;
      logedin=true;
      res.redirect('/computer');
   }else{
      if(!req.body.id || !req.body.password){
         res.redirect('/');
      } else if (!Users.some(user=>user.id === req.body.id)){
         res.redirect('/invalid');
      } else {
         Users.filter(user => {
            if(user.id === req.body.id && user.password === req.body.password){
               logedin=true;
               req.session.user = user;
               res.redirect('/computer');
            }
         });
         Users.filter(user => {
            if(user.id === req.body.id && user.password !== req.body.password){
               res.redirect('/invalid');
            }
         });
      }
   }


});

app.post('/logout', function(req, res){
   req.session.destroy(function(){
      logedin=false;
   });
   res.redirect('/');
});

app.get('*', (req,res) =>{
   res.redirect('/')
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
