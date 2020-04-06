const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;




app.use(cors())
app.use(bodyParser.json())

// database user's credentials
const dbUser = 'dbUser';
const pass = 'SUFqeYJWxWLb7mdY';
const uri = "mongodb+srv://dbUser:SUFqeYJWxWLb7mdY@cluster0-gubtv.mongodb.net/test?retryWrites=true&w=majority";


const client = new MongoClient(uri, { useNewUrlParser: true });
const users = ['Shabnoor', 'Popy', 'Mahi', 'Porimoni', 'Shabana'];





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
app.post('/addProduct', (req, res) => {
    // console.log('data recieved', req.body);
    const product = req.body;
    console.log(product);   

    // save data to database
    client.connect(err => {
        const collection = client.db("onlineShop").collection("products");
        collection.insertOne(product, (err, result) =>{
            // console.log("Data Successfully Inserted to Cloud DB", result);
            if(err){
                console.log(err);
                res.status(500).send({message: err});
            }
            else{
                res.send(result.ops[0]);
            }
            
        })
        client.close();
    });
})

app.listen(4000, () => console.log('Listening to port 4000'))