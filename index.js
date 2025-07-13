const express=require('express');
const app=express();
const port=8000;
const path = require('path');

app.set('view engine', 'ejs');
const {v4: uuidv4}=require('uuid');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname));



app.use(express.json());
let pets=[
    {
  id: uuidv4(),
  name: "Charlie",
  species: "Dog",
  age: 3,
  isAdopted: false
},
    {
  id: uuidv4(),
  name: "Bob",
  species: "Dog",
  age: 2,
  isAdopted: true
},
    {
  id: uuidv4(),
  name: "Peter",
  species: "Cat",
  age: 1,
  isAdopted: false
}
];
app.listen(port,(req,res)=>{
    console.log(`Server is running on port ${port}`);
});
app.get('/',(req,res)=>{
    res.render('pets', { pets });
});