const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')


const users = ['Shabnoor', 'Popy', 'Mahi', 'Porimoni', 'Shabana'];

app.use(cors())


// parse application/json
app.use(bodyParser.json())

// database user's credentials
const dbUser = 'dbUser';
const pass = 'SUFqeYJWxWLb7mdY';

// database connection

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dbUser:SUFqeYJWxWLb7mdY@cluster0-gubtv.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("onlineShop").collection("products");
  // perform actions on the collection object
    collection.insertOne({
        name: 'Laptop',
        price: 200,
        stock: 10
    }, (err, res) =>{
        console.log("Data Successfully Inserted to Cloud DB");
    })

  console.log("Database Connected");
  
  client.close();
});


app.get('/', function (req, res) {
    const fruits = {
        prod: 'Pineapple',
        price: 220
    }
  res.send(fruits)
})

app.get('/fruits/banana', (req, res) => {
    res.send({fruit: 'Banana', quantity: 1000, price: 10000});
})

app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    console.log(req.query.sort);
    const name = users[id];
    res.send({id, name})    
});

// post 
app.post('/addUser', (req, res) => {
    // console.log('data recieved', req.body);
    const user = req.body;
    user.id = 10;

    // save data to database
    res.send(user);
})

app.listen(4000, () => console.log('Listening to port 4000'))