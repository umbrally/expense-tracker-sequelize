const express = require('express')
const router = express.Router()
const passport = require('passport')
const { validationResult } = require('express-validator')
const { registerValidator } = require('../lib/validator.js')
const bcrypt = require('bcryptjs')

const db = require('../models')
const User = db.User
const Record = db.Record


router.get('/', (req, res) => {
  res.send('列出所有支出')
})

// 登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})

// 登入檢查
router.post('/login', (req, res) => {
  res.send('login')
})

// 註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})


// 註冊檢查
router.post('/register', registerValidator, (req, res) => {
  const { name, email, password, password2 } = req.body
  const errors = validationResult(req)
  let errorsMessages = []
  if (!errors.isEmpty()) {

    errors.array().forEach(error => {
      errorsMessages.push({ message: error.msg })
    })
    return res.render('register', { name, email, password, password2, errors: errorsMessages })
  }

  else {
    // const { name, email, password, password2 } = req.body
    User.findOne({ where: { email: email } }).then(user => {
      if (user) {
        console.log('this email already exists')
        errorsMessages.push({ message: '這個 Email 已經註冊過了' })
        res.render('register', { name, email, password, password2, errors: errorsMessages })
      }
      else {
        const newUser = new User({ name, email, password })
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash
            newUser
              .save()
              .then(user => res.redirect('/'))
              .catch(err => console.log(err))
          })
        })
      }
    })
  }
})


// 登出
router.get('/logout', (req, res) => {
  res.redirect('/users/login')
})


module.exports = router