const express = require('express')
const router = express.Router()
const { validationResult } = require('express-validator')
const { dateFormat, dateFormatNoDate } = require('../helpers/date_format.js')
const categoryIcon = require('../helpers/category.js')
const uniqueMonth = require('../helpers/uniqueMonth.js')
const setSelected = require('../helpers/setSelected.js')
const { authenticated } = require('../config/auth.js')
const { recordValidator } = require('../lib/validator.js')
const db = require('../models')
const User = db.User
const Record = db.Record



// 篩選 record
router.get('/', authenticated, (req, res) => {
  const month = req.query.month
  const category = req.query.category
  const regExp = new RegExp(category, 'i')
  const dateStart = new Date(req.query.month)
  const dateEnd = new Date(req.query.month)
  dateEnd.setMonth(dateEnd.getMonth() + 1)
  Record.findAll(
    { where: { UserId: req.user.id } })
    .then((fullRecords) => {
      fullRecords.map(record => { record.date = new Date(record.date) })
      const records = fullRecords.filter(record => {
        if (req.query.month) { return (record.date >= dateStart) && (record.date < dateEnd) && (regExp.test(record.category)) }
        else { return (regExp.test(record.category)) }
      })
        .sort((a, b) => {
          return a.date - b.date
        })

      let totalAmount = 0
      records.forEach(record => {
        record.amount = Number(record.amount)
        totalAmount += record.amount
      })
      const months = fullRecords.map(record => {
        return record.date
      }).sort((a, b) => {
        return a - b
      }).map(date => {
        return dateFormatNoDate(date)
      }).filter(uniqueMonth)
      return res.render('index', { records, totalAmount, months, month, category, helpers: { setSelected, categoryIcon, dateFormat } })
    })
})

// 新增一筆支出頁面
router.get('/new', authenticated, (req, res) => {
  res.render('new', { helpers: { setSelected } })
})

// 新增一筆支出動作
router.post('/', authenticated, recordValidator, (req, res) => {
  const record = new Record({
    name: req.body.name,
    date: req.body.date,
    category: req.body.category,
    amount: req.body.amount,
    UserId: req.user.id
  })
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    let errorsMessages = []
    errors.array().forEach(error => {
      errorsMessages.push({ message: error.msg })
    })

    return res.render('new', { errors: errorsMessages, helpers: { dateFormat, setSelected } })
  }
  else {
    record.save()
      .then((record) => {
        req.flash('success_msg', '成功新增一筆支出')
        res.redirect('/')
      })
      .catch((error) => {
        console.log(error)
        return res.status(422).json(error)
      })
  }
})

// 複製支出的頁面
router.get('/:id/copy', authenticated, (req, res) => {
  let reqParamsId = req.params.id
  Record.findOne({ where: { UserId: req.user.id, id: req.params.id } })
    .then((record) => {
      record.date = new Date(record.date)
      return res.render('new', { reqParamsId, record, helpers: { dateFormat, setSelected } })
    })
    .catch((error) => {
      console.log(error)
      return res.status(422).json(error)
    })
})

// 編輯支出的頁面
router.get('/:id/edit', authenticated, (req, res) => {
  let reqParamsId = req.params.id
  Record.findOne({ where: { UserId: req.user.id, id: req.params.id } })
    .then((record) => {
      record.date = new Date(record.date)
      return res.render('edit', { reqParamsId, record, helpers: { dateFormat, setSelected } })
    })
    .catch((error) => {
      console.log(error)
      return res.status(422).json(error)
    })
})

// 儲存變更支出動作
router.put('/:id', authenticated, recordValidator, (req, res) => {
  Record.findOne({ where: { UserId: req.user.id, id: req.params.id } })
    .then((record) => {
      record.name = req.body.name
      record.date = req.body.date
      record.category = req.body.category
      record.amount = req.body.amount
      record.UserId = req.user.id
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        let errorsMessages = []
        errors.array().forEach(error => {
          errorsMessages.push({ message: error.msg })
        })

        return res.render('edit', { errors: errorsMessages, reqParamsId, record, helpers: { setSelected, dateFormat } })
      }
      else {
        record.save()
          .then((record) => {
            req.flash('success_msg', '成功修改一筆支出')
            res.redirect('/')
          })
          .catch((error) => {
            console.log(err)
            return res.status(422).json(error)
          })
      }
    })
    .catch((error) => {
      console.log(error)
      return res.status(422).json(error)
    })
})

// 刪除支出動作
router.delete('/:id', authenticated, (req, res) => {
  Record.findOne({ where: { UserId: req.user.id, id: req.params.id } })
    .then((record) => {
      return record.destroy()
    })
    .then((record) => {
      res.redirect('/')
    })
    .catch(err => res.status(422).json(err))
})

module.exports = router