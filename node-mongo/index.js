const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')


const users = ['Shabnoor', 'Popy', 'Mahi', 'Porimoni', 'Shabana'];

app.use(cors())

// parse application/json
app.use(bodyParser.json())

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
    // save data to database
    const user = req.body;
    user.id = 10;
    res.send(user);
})

app.listen(4000, () => console.log('Listening to port 4000'))