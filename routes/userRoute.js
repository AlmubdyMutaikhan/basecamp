const { Router } = require('express')
const router = Router()
const jwt = require('jsonwebtoken')
const { User } = require('../models/User')
const config = require('../config/db')
const { token } = require('morgan')
const  mongoose = require('mongoose')
const Project = require('../models/Project')

const createToken = (id, is_admin) => {
  return jwt.sign({ id, is_admin }, config.secret, {
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

const prepareUserData = (user) =>{
  user["password"] = null
  return user
}

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

router.get('/all-users', async (req, res) => {
  try {
    const users = await User.find({}) // empty to retrieve all docs
    res.status(200).json({users : users})
  } catch(err) {
    console.log(err.message)
    res.status(400).json({err : err.message})
  }
})

router.post('/signup', async (req, res) => {
  /*
  const user = new User({ 
      _id : new mongoose.Schema.Types.ObjectId(),
      email : req.body.email,
      password : req.body.password,
      is_admin : false,
      is_user : true, 
   })

   user.save((err) => {
     if(err) {
       const errors = handleErrors(err)
       res.status(400).json({errors : errors})
     } else {
       const project = new Project({
         owner : user._id 
       })
       project.save(err => {
          
       })
     }
   })
  */
  try {
    const user = await User.create(req.body)
    const token = createToken(user._id, user.is_admin)
    console.log(user)
    res.cookie('jwt', token, { httpOnly : true, maxAge : 60 * 60 * 60 * 24})
    res.status(201).json({msg : "succesfully, user has been created",
                          token : token,
                          user : prepareUserData(user)
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
      console.log(user)
      const token = createToken(user._id, user.is_admin)
      res.cookie('jwt', token, { httpOnly : true, maxAge : 60 * 60*60})
      res.status(201).json({user : prepareUserData(user),
                            msg : "succesfully signed in",
                            token : token
      })
  } catch(err) {
      const errors = handleErrors(err)
      res.status(400).json({errors : errors})
  }
})

router.get('/get-token/:token', (req, res)=>{
  jwt.verify(req.params.token, config.secret, (err, decodedToken) => {
    console.log(decodedToken)
  })
})

router.get('/update/:id/:isAdmin/:name/', async (req, res) => {
  const id =  req.params.id
  const isAdmin = req.params.isAdmin
  const name = req.params.name

  try {
    const user = await User.findByIdAndUpdate({_id : id}, {
      is_admin : isAdmin,
      name : name, 
    })
    console.log(user)
    res.status(201).json({ msg : "Succesfully updated" })

  } catch(err) {
    console.log(err.message)
    res.status(400).json({msg : "Smth went wrong"})
  }

})

router.delete('/delete/:id', async (req, res) => {
  const id = req.params.id
  try {
    const usr = await User.deleteOne({ _id : id})
    console.log(usr)
    res.status(201).json({msg : "Succesfully removed"})
  } catch(err) {
    console.log(err.message)
    res.status(400).json({msg : "Smth went wrong"})
  }
})

router.post('/projects/add/:id', async (req, res) => {
  try {
    const title = req.body.title
    const user = await User.findById(req.params.id)
    const project = new Project({
        title : title  
    })
    project.owners.push(req.params.id)
    user.projects.push(project._id)
    user.save((err)=>{
      if(!err) {
        project.save()
      }
    })
  } catch(err) {
    console.log(err)
  }
})

router.get('/projects/all/:id', async (req, res) => {
  const id = req.params.id
  User
    .findOne({ _id : id})
    .populate('projects')
    .exec((err, doc) => {
      if(err) {
        const errors = handleErrors(err)
        res.status(400).json( { errors : errors })
      } else {
        res.status(200).json({ projects : doc["projects"] })
      }
    })
})


module.exports = router