const router = require('express').Router();
const bcrypt = require('bcryptjs/dist/bcrypt');
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation } = require('../validation');
const { send } = require('express/lib/response');

router.post('/register', async (req, res) => { //async to wait for fetching data from database

    // Let's validate the data before a user
  const{error} = registerValidation(req.body);
   if(error) return res.status(400).send(error.details[0].message);

//    Checking if the user is already in the database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');
   
// Hash the passwords after we checked our database
// we need to generate salt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

   const user = new User ({
    name: req.body.name,
    email:req.body.email,
    password: hashedPassword
   });
   try{
    const savedUser = await user.save();
    res.send({user: user.id});// saving user
   }catch(err){
       res.status(400).send(err);
   }
});



// LOGIN
router.post('/login', async (req, res) => {
    // Let's validate the data before a user
  const{error} = loginValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message);
//    Checking if email exist
const user = await User.findOne({email: req.body.email});
if(!user) return res.status(400).send('Email is not found');

// PASSWORD IS CORRECT
const validPassword = await bcrypt.compare(req.body.password, user.password); // comparing password with hashedpassword
if(!validPassword) return res.status(400).send('Invalid password')

// Create and Assign TOKEN after password validation
const token = jwt.sign({_id:user._id}, process.env.TOKEN_SECRET);
res.header('auth-token', token).send(token);


});



module.exports = router;