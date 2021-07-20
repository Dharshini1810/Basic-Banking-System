const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs');
/*const { kStringMaxLength } = require('buffer');*/

app.set('view engine', 'ejs');

mongoose.connect('mongodb+srv://Dharshu1810:Dharshu1810@cluster0.i4han.mongodb.net/accuserdb?retryWrites=true&w=majority');

const userSchema = {
    fullname: String,
    emailid: String,
    phno: String,
    aadharno: String,
    address: String,
    postcode: String,
    balance: String
}

const user = mongoose.model('user', userSchema);

app.get('/', (req, res) => {
    user.find({}, function(err, user) {
        res.render('index', {
            userList: user
        })
    })
})

app.listen(4000, function() {
    console.log('server is running');
})