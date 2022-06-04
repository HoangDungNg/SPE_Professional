// server/index.js
const express = require("express");
const path = require('path');
const cors = require("cors");
const db = require("../server/database")


const PORT = process.env.PORT || 3001;

const app = express();
const bodyParser = require('body-parser') 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); //Install cors so that client can access 
app.use(express.static(path.join(__dirname, 'build')));

//Fetch page from server to client
app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get("/getTable", async (req, res) => {
  const result = await db.promise().query('SELECT * FROM users;')
  console.log(result[0]);
});

app.get("/getTable",  (req, res) => {
  db.promise().query('INSERT INTO users (username, password) VALUES ("user1", "password1");');
});

app.post("/login", async (req, res) => {
  // console.log('login requested')
  var data = req.body;
  console.log("Received: + \n" + " " + 
                "Username: " + data.username + "\n " +
                "Password: " + data.password
                );
  console.log()
  try{
    const result = await db.promise().query(`SELECT * FROM usertest WHERE email = "${data.username}" AND password = "${data.password}";`);
    console.log("Matching database result: \n" + " " + 
                  "Email: " + result[0][0].email + "\n " + 
                  "Role: " + result[0][0].role + "\n " +  
                  "Name: " + result[0][0].name 
                );
    res.json({
      username: result[0][0].email, 
      name: result[0][0].name,
      role: result[0][0].role, 
      user: 'true', 
      msg: "Login successful"});
  }
  catch (err){

    console.log(err);
    console.log("user don't exist");
    res.json({username: '', name: '', role: '', user: false, msg: "User don't exist"});
  }
  


  //If there is account in database return success
  // data.username === 'jingwei950@hotmail.sg' ?
  // res.json({username: 'Jing Wei', role: 'Student'}) 
  // : res.json({username: 'Peter Cole', role: 'Lecturer'});
});

app.post('/register', (req, res) => {
  const {username, password} = req.body;
  if(username && password){
    try{
      db.promise().query(`INSERT INTO USERS (username, password) VALUES ('${username}', '${password}')`);
      res.status(201).send({msg: 'Created User'});
    }
    catch (err){
      console.log(err);
    }
  }
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});