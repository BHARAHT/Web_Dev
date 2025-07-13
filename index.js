const express=require('express');
const app=express();
const port=8000;
app.use(express.urlencoded({ extended: true }));

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
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
//list all pets
app.get('/pets',(req,res)=>{
    res.render('pets', { pets });
});
//show route
app.get("/pets/new", (req, res) => {
  res.render("new"); // renders views/new.ejs
});

app.get('/pets/:id',(req,res)=>{
    const {id}=req.params;
    const pet = pets.find(p=>p.id===id);
    if(!pet)
      return  res.status(404).json({error:"Pet not found"});
    res.render( "detailed",{pet} );
});
//post or add new pet
app.post('/pets',(req,res)=>{
    const {name,species,age}=req.body;
     if (typeof name !== 'string' || typeof species !== 'string') {
    return res.status(400).send("Invalid input data");
  }
  const newPet = {
    id:uuidv4(),
    name,
    species,
    age:Number(age)

  };
  pets.push(newPet);
  res.redirect("/pets");
});
