const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');
const admin = require("firebase-admin")
const serviceAccount = require("apis-5f94e-firebase-adminsdk-k6xl1-ba6b941195.json")


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://apis-5f94e-default-rtdb.firebaseio.com/",
});

const app = express();
app.use(bodyparser.json());

app.set('view engine', 'ejs');

router.get('/login', (req, res) => {
  res.render('login'); // Renders login.ejs
});


app.post('/signup',async (req,res)=>{
  const { email, password,name } = req.body;
  try{
    const userrecord = await admin.auth().createUser({
      email,
      password,
      name
    });
    res.status(201).send({uid : userrecord.uid});
  }catch(err){
    res.status(500).send({error:err});
  }
})




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
