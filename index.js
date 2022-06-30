const express = require ('express');
const session = require ('express-session');
const bodyparser = require ('body-parser');
const db = require ('./mysql.js');
const req = require('express/lib/request');
const res = require('express/lib/response');
const app = express();
const port = 4000;
let path = require('path');

app.use("/js", express.static(__dirname + "/public/js"));
app.use("/css", express.static(__dirname + "/public/css"));


//view engine
app.set('view engine', 'ejs');
app.use(express.static('/public/views'));
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

//middleware
app.use(bodyparser.urlencoded({ extended: true}));
app.use(bodyparser.json());

//call web view login
app.get('/', function(req, res) {
    res.render('login.ejs');
});

//login post

app.post('/auth', (req,res) => {
    var username = req.body.username;
    var password = req.body.password;
    const sql = 'SELECT * FROM admin WHERE username = ? AND password = ? ';
    if (username && password) {
        db.query(sql, [username,password], function(err, rows) {
             if (err) throw err;           
             else if (rows.length > 0) {
                 req.session.loggedin = true;
                 req.session.username = username;
                 res.redirect('/home');
                
            } else {
                res.end('Akun tidak terdaftar');
            }
        })
    }
})

app.get('/home', function(req,res) {
    res.render('pages/home.ejs')
})

app.get('/kk', function(req,res) {
    res.render('pages/kk.ejs')
})

app.get('/ktp', function(req,res) {
    res.render('pages/ktp.ejs')
})

app.get('/masukan', function(req,res) {
    res.render('pages/masukan.ejs')
})

app.get('/apbDesa', function(req,res) {
    res.render('pages/apbDesa.ejs')
})
app.listen(port, function() {
    console.log(`Server aman di ${port}`)
})