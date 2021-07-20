var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose") 
const ejs = require('ejs');

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb+srv://Dharshu1810:Dharshu1810@cluster0.i4han.mongodb.net/accuserdb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database")) 

/*app.get('view.html', function(req, res){
    user.find({}, function(err, data){
    if(err) res.json(err);
    else    res.render('index.html', {users: data});
    });
});*/

app.post("/create_acc",(req,res)=>{

    var fullname = req.body.fullname;
    var emailid =  req.body.emailid;
    var phno =  req.body.phno;
    var aadharno = req.body.aadharno;
    var address =  req.body.address;
    var postcode =  req.body.postcode;
    var balance = req.body.balance;

    var data = {
        "fullname": fullname,
        "emailid": emailid,
        "phno": phno,
        "aadharno":aadharno,
        "address": address, 
        "postcode": postcode,
        "balance": balance
    }    
    /*user.save((err, data) => {
        if (!err)
            res.redirect('list.html');
        else
            console.log('Error during record insertion : ' + err);
    });*/

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully"); 
        /*return res.redirect('view.html')*/
    });
    return res.redirect('signup1.html')
})   
/*function insertRecord(req, res) {
    var employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;
    employee.save((err, doc) => {
        if (!err)
            res.redirect('employee/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: "Insert Employee",
                    employee: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}*/


app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(3000);  

app.set('view engine', 'ejs');

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
        res.render('index2', {
            userList: user
        })
    })
})

console.log("Listening on PORT 3000");