

var express = require('express');
var myApp = express();
var cors = require('cors');
var connection = require('./userdata');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/userdata');
var db = mongoose.connection;
myApp.use(express.json())
db.on('error', (req, res) => { console.log('not connected') });
db.once('open', () => { console.log('connected') });
myApp.use(express.urlencoded({ extended: false }))
myApp.use(cors());
myApp.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    const data = {
        name: name,
        email: email,
        password: password
    }
    try {
        const check = await connection.findOne({ email: email })
        if (check) {
            res.json('exist')
        } else {
            res.json('notExist')
            await connection.insertMany([data]);
        }
    } catch (error) {
        res.json('notExist')
    }
})
myApp.post('/', async (req, res) => {
    const { email, password } = req.body;
    try {
        const check = await connection.findOne({ email: email })
        const pass = await connection.findOne({password:password});
        if (check) {
            res.json('exist');
        }
        else {
            res.json('notExist')
        }
    } catch (error) {
        res.json('notExist')
    }
})
myApp.listen('4000');
console.log('server is running in 4000');