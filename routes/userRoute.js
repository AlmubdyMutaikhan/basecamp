const { Router } = require('express')
const router = Router()
const jwt = require('jsonwebtoken')
const { User } = require('../models/User')
const config = require('../config/db')


const createToken = (id) => {
  return jwt.sign({ id }, config.secret, {
      expiresIn: 60*60*60*24
  })
}

const handleErrors = (err) => {
  let errors = {
    email : "",
    password : "",
  }
  console.log(err.message)
  if(err.message.includes('incorrect email')) {
    errors.email = "Oops, invalid email"
  }
  if(err.message.includes('incorrect password')) {
    errors.password = "Wrong password. Don't forget your password :)"
  }
  if(err.message.includes('E11000 duplicate key error collection')) {
    errors.email = "That email is already registered"
  }

  if (err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors
}

router.get('/', (req, res) => {
  res.redirect('/user/signup')
}) 
router.get('/signup', (req, res) => {
    res.send('<h1>Sign up page</h1>')
})

router.get('/signin', (req, res) => {
    res.send('<h1>Sign in page</h1>')
})

router.get('/profile', (req, res) => {
  res.json({user : req.user }).send('<h1>My Profile</h1>')    
})

router.get('/check-user/:token', (req, res) => {
    const token = req.params.token

    if(token) {
        jwt.verify(token, config.secret, async (err, decodedToken) => {
            if(err) {
                console.log(err.message)
                res.status(400).json({err : "user not found"})
            } else {
                try {
                      const user = await User.findById(decodedToken.id)
                      console.log(user)
                      res.status(201).json({user : "user found"})
                } catch(err) {
                      console.log(err.message)
                      res.status(400).json({err : "user not found"})
                }
                
            }
        })
    } else {
        res.status(400).json({err : "user not found"})
    }
})

router.post('/signup', async (req, res) => {
  try {
    const user = await User.create(req.body)
    const token = createToken(user._id)
    res.cookie('jwt', token, { httpOnly : true, maxAge : 60 * 60 * 60 * 24})
    res.status(201).json({msg : "succesfully, user has been created",
                          token : token
    })
  } catch(err) {
    const errors = handleErrors(err)
    console.log(errors)
    res.status(400).json({errors : errors })
  }
})

router.post('/signin', async (req, res, next) => {
  const email = req.body.email
  const password = req.body.password
  try {
      const user = await User.login({ email, password })
      const token = createToken(user._id)
      res.cookie('jwt', token, { httpOnly : true, maxAge : 60 * 60*60})
      res.status(201).json({user : user._id,
                            msg : "succesfully signed in",
                            token : token
      })
  } catch(err) {
      const errors = handleErrors(err)
      res.status(400).json({errors : errors})
  }
})


module.exports = router