const express = require('express')
const router = express.Router()
const categoryIcon = require('../helpers/category.js')
const { dateFormat, dateFormatNoDate } = require('../helpers/date_format.js')
const uniqueMonth = require('../helpers/uniqueMonth.js')
const { authenticated } = require('../config/auth')
const setSelected = require('../helpers/setSelected.js')
const db = require('../models')
const User = db.User
const Record = db.Record

// router.get('/', authenticated, (req, res) => {
//   Record.find({ userId: req.user.id }, (err, records) => {
//     if (err) return log.error(err)
//   })
//     .sort({ date: 'asc' })
//     .exec((err, records) => {
//       if (err) return log.error(err)
//       let totalAmount = 0
//       records.forEach(record => {
//         totalAmount += record.amount
//       })
//       const months = records.map(record => {
//         return record.date
//       }).sort((a, b) => {
//         return a - b
//       }).map(date => {
//         return dateFormatNoDate(date)
//       }).filter(uniqueMonth)
//       return res.render('index', { records, totalAmount, months, helpers: { categoryIcon, dateFormat, setSelected } })
//     })
// })

// router.get('/', authenticated, (req, res) => {
//   const month = req.query.month
//   const category = req.query.category
//   const regExp = new RegExp(category, 'i')
//   const dateStart = new Date(req.query.month)
//   const dateEnd = new Date(req.query.month)
//   dateEnd.setMonth(dateEnd.getMonth() + 1)
//   Record.findAll(
//     { where: { UserId: req.user.id } },
//     { order: [['date', 'ASC']] })
//     .then((fullRecords) => {
//       const records = fullRecords.filter(record => {
//         if (req.query.month) { return (record.date >= dateStart) && (record.date < dateEnd) && (regExp.test(record.category)) }
//         else { return (regExp.test(record.category)) }
//       })
//       let totalAmount = 0
//       records.forEach(record => {
//         totalAmount += record.amount
//       })
//       const months = fullRecords.map(record => {
//         return record.date
//       }).sort((a, b) => {
//         return a - b
//       }).map(date => {
//         return dateFormatNoDate(date)
//       }).filter(uniqueMonth)
//       return res.render('index', { records, totalAmount, months, month, category, helpers: { setSelected, categoryIcon, dateFormat } })
//     })
// })

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

module.exports = router
