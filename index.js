const express = require("express");
const { json } = require("express");
const flights = require("./controllers/flightController");
const models = require("./models/Flight");
const routes = require("./routes/flightRoute");
const fs = require("fs");
const users = require("./users.json");
const app = express();
app.use(express.json());

// app.use("/", routes);


app.get("/users", (req, res)=>{ //get all flights from the users.json file
  res.json(users);
})

app.post("/users", (req,res)=>{ //adding a new flight
  users.push(req.body); // adding the user's request to the cashed users data(not the file)
  var newUser = JSON.stringify(users, null, 2); // needs to be a stringed data to save
  fs.writeFile("./users.json", newUser, (err)=>{ // This will take the edited cashed data and store it in the main file
    if(err){
      res.status(500).send("Internal error, Please try again")
    }else{
      res.status(200).send("User saved successfully")
    }
  })
})

app.get("/users/:name", (req,res)=>{ //finding single user
  var input = req.params.name;
  var name = input.toLowerCase();
  var foundUser = users.find(user =>{
    if( String(user.name).toLowerCase() === name){
      return user.name;
    } else{
      res.status(404).send("Cannot find user... Please check name and try again")
    }
  })

  res.status(200).send(foundUser);
  
  
})


app.get("/deleteUsers/:name", (req,res)=>{
  var input = req.params.name;
  var name = input.toLowerCase();
  var location;
  var deleteUser = users.find(user =>{
    if( String(user.name).toLowerCase() === name){
      location = users.indexOf(user)
      return user.name; 
    } else{
      res.status(404).send("Cannot find user... Please check name and try again")
    }
  })

  console.log(location);

})




const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



