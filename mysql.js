const mysql = require ('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'watesprojo',
    multipleStatements: true
})

db.connect(function(err){
    if (err) throw err
    else {
        console.log('berhasil');
    }
})

module.exports = db;