const user = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req,res)=>{
  const newUser = req.body;

  try{
    const takenUsername = await user.findOne({name: newUser.name});
    const takenUserEmail = await user.findOne({email: newUser.email});
    if(takenUserEmail || takenUsername)
    {
      return res.status(403).send({ message: "Username or Email already registered!" })
    }
    else
    {
      const salt = await bcrypt.genSalt(10)
      newUser.password = await bcrypt.hash(req.body.password, salt)
      const dbUser = new user({
          name: newUser.name, 
          email: newUser.email.toLowerCase(),
          password: newUser.password,
      })

      dbUser.save()
      return res.status(201).send({ message: "Successfully registered new User !!" });
    }
  }
  catch(error)
  {
    console.error(error.message)
    return res.status(400).send({message: 'Error registering User !!'});
  }
}

exports.loginUser = async (req,res)=>{
  try{
    const userLoggingIn = req.body;
    const existingUser = await user.findOne({ name: userLoggingIn.name });
    if(!existingUser)
    {
      return res.status(401).send({ message: "Invalid username or password!" });
    }
    const isPasswordCorrect = await bcrypt.compare(userLoggingIn.password,existingUser.password);
    if (isPasswordCorrect) {
      const payload = {
          id: existingUser._id,
          name: existingUser.name
      }
      jwt.sign(
          payload,
          "my_secret_key_but_it_is_not_secure",
          { expiresIn: 3 * 24 * 60 * 60 },
          (err, token) => {
              if (err) {
                  return res.status(400).send({ message: err.message })
              }
              return res.status(200).send({
                  message: "Success",
                  token: "Bearer " + token
              })
          }
      )
  } else {
      return res.status(401).send({ message: "Invalid username or password" })
    } 
  }
  catch(error)
  {
    console.log(error.message);
    return res.status(400).send({message: "Error logging in user!"})
  }
}

