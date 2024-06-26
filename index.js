import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "farmdb",
  password: "",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let farmers = [{}]

//HOME PAGE
app.get("/", async (req, res) => {
    res.render("index.ejs");
});

//REGISTER FARMER - REGISTER.EJS
app.get("/register", async (req, res) => {
  res.render("register.ejs");
});

app.post("/add", async (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const district = req.body.district;
  const state = req.body.state;
  const crop = req.body.crop;
  try {
    await db.query("INSERT INTO farmer (name, age, district, state, crop) VALUES ($1, $2, $3, $4, $5)", 
    [name, age, district, state, crop]);
    res.redirect("/register");
  } catch (err) {
    console.log(err);
  }
});

//SHOW ALL RECORDS - ALLREC.EJS
app.get("/allrec", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM farmer ORDER BY id ASC");
    farmers = result.rows;

    res.render("allrec.ejs", {farmers: farmers});
  } catch (err) {
    console.log(err);
  }
});

//FILTER BY NAME - NAMEREC.EJS
app.get("/namerec", async (req, res) => {
  res.render("namerec.ejs");
});

app.post("/filtername", async (req, res) => {
  const name = req.body.nameInput;
  const nameInput = name.toLowerCase();
  try {
    const result = await db.query("SELECT * FROM farmer WHERE LOWER(name) LIKE '%' || $1 || '%';", [nameInput]);
    farmers = result.rows;
    
    res.render("namerec.ejs", {farmers: farmers});
  } catch (err) {
    console.log(err);
  }
});

//FILTER BY DISTRICT - DISTRICTREC.EJS
app.get("/districtrec", async (req, res) => {
  res.render("districtrec.ejs");
});

app.post("/filterdistrict", async (req, res) => {
  const district = req.body.districtInput;
  const districtInput = district.toLowerCase();
  try {
    const result = await db.query("SELECT * FROM farmer WHERE LOWER(district) LIKE '%' || $1 || '%';", [districtInput]);
    farmers = result.rows;
    
    res.render("districtrec.ejs", {farmers: farmers});
  } catch (err) {
    console.log(err);
  }
});

//FILTER BY STATE - STATEREC.EJS
app.get("/staterec", async (req, res) => {
  res.render("staterec.ejs");
});

app.post("/filterstate", async (req, res) => {
  const state = req.body.stateInput;
  const stateInput = state.toLowerCase();
  try {
    const result = await db.query("SELECT * FROM farmer WHERE LOWER(state) LIKE '%' || $1 || '%';", [stateInput]);
    farmers = result.rows;
    
    res.render("staterec.ejs", {farmers: farmers});
  } catch (err) {
    console.log(err);
  }
});

//FILTER BY CROP - CROPREC.EJS
app.get("/croprec", async (req, res) => {
  res.render("croprec.ejs");
});

app.post("/filtercrop", async (req, res) => {
  const crop = req.body.cropInput;
  const cropInput = crop.toLowerCase();
  try {
    const result = await db.query("SELECT * FROM farmer WHERE LOWER(crop) LIKE '%' || $1 || '%';", [cropInput]);
    farmers = result.rows;
    
    res.render("croprec.ejs", {farmers: farmers});
  } catch (err) {
    console.log(err);
  }
});

//EDIT DETAILS - EDITNAME.EJS
app.get("/editname", async (req, res) => {
  res.render("editname.ejs");
});

app.post("/getIDName", async (req, res) => {
  const id = req.body.getIDName;
  try {
    const result = await db.query("SELECT * FROM farmer WHERE id = $1;", [id]);
    farmers = result.rows;
    
    res.render("editname.ejs", {farmers: farmers});
  } catch (err) {
    console.log(err);
  }
});

app.post("/editname", async (req, res) => {
  const name = req.body.name;
  const id = req.body.id
  try {
    const result = await db.query("UPDATE farmer SET  name = ($1) WHERE id = $2", [name, id]);
    res.render("editname.ejs");
  } catch (err) {
    console.log(err);
  }
});

//EDIT DETAILS - EDITAGE.EJS
app.get("/editage", async (req, res) => {
  res.render("editage.ejs");
});

app.post("/getIDAge", async (req, res) => {
  const id = req.body.getIDAge;
  try {
    const result = await db.query("SELECT * FROM farmer WHERE id = $1;", [id]);
    farmers = result.rows;
    
    res.render("editage.ejs", {farmers: farmers});
  } catch (err) {
    console.log(err);
  }
});

app.post("/editage", async (req, res) => {
  const age = req.body.age;
  const id = req.body.id
  try {
    const result = await db.query("UPDATE farmer SET  age = ($1) WHERE id = $2", [age, id]);
    res.render("editage.ejs");
  } catch (err) {
    console.log(err);
  }
});

//EDIT DETAILS - EDITDISTRICT.EJS
app.get("/editdistrict", async (req, res) => {
  res.render("editdistrict.ejs");
});

app.post("/getIDDistrict", async (req, res) => {
  const id = req.body.getIDDistrict;
  try {
    const result = await db.query("SELECT * FROM farmer WHERE id = $1;", [id]);
    farmers = result.rows;
    
    res.render("editdistrict.ejs", {farmers: farmers});
  } catch (err) {
    console.log(err);
  }
});

app.post("/editdistrict", async (req, res) => {
  const district = req.body.district;
  const id = req.body.id
  try {
    const result = await db.query("UPDATE farmer SET  district = ($1) WHERE id = $2", [district, id]);
    res.render("editdistrict.ejs");
  } catch (err) {
    console.log(err);
  }
});

//EDIT DETAILS - EDITSTATE.EJS
app.get("/editstate", async (req, res) => {
  res.render("editstate.ejs");
});

app.post("/getIDState", async (req, res) => {
  const id = req.body.getIDState;
  try {
    const result = await db.query("SELECT * FROM farmer WHERE id = $1;", [id]);
    farmers = result.rows;
    
    res.render("editstate.ejs", {farmers: farmers});
  } catch (err) {
    console.log(err);
  }
});

app.post("/editstate", async (req, res) => {
  const state = req.body.state;
  const id = req.body.id
  try {
    const result = await db.query("UPDATE farmer SET  state = ($1) WHERE id = $2", [state, id]);
    res.render("editstate.ejs");
  } catch (err) {
    console.log(err);
  }
});

//EDIT DETAILS - EDITCROP.EJS
app.get("/editcrop", async (req, res) => {
  res.render("editcrop.ejs");
});

app.post("/getIDCrop", async (req, res) => {
  const id = req.body.getIDCrop;
  try {
    const result = await db.query("SELECT * FROM farmer WHERE id = $1;", [id]);
    farmers = result.rows;
    
    res.render("editcrop.ejs", {farmers: farmers});
  } catch (err) {
    console.log(err);
  }
});

app.post("/editcrop", async (req, res) => {
  const crop = req.body.crop;
  const id = req.body.id
  try {
    const result = await db.query("UPDATE farmer SET  crop = ($1) WHERE id = $2", [crop, id]);
    res.render("editcrop.ejs");
  } catch (err) {
    console.log(err);
  }
});

//DELETE DETAILS - DELETEREC.EJS
app.get("/deleterec", async (req, res) => {
  res.render("deleterec.ejs");
});

app.post("/delete", async (req, res) => {
  const id = req.body.id
  try {
    const result = await db.query("DELETE FROM farmer WHERE id = $1;", [id]);
    res.render("deleterec.ejs");
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
  
