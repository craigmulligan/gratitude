const inquirer = require('inquirer')
const _ = require('lodash')
const Rx = require('rx-lite-aggregates')
const fs = require('fs-jetpack')
const moment = require('moment')

const q = i => ({
  type: 'input',
  name: `gratitude-${i}`,
  message: 'I am grateful for'
})

const ask = n => {
  const observable = Rx.Observable.fromArray(_.times(n, q))
  return inquirer.prompt(observable)
}

const save = db_path => answers => {
  const db = require(db_path)
  const today = moment().format('YYYYMMDD')
  db[today] = answers
  return fs.writeAsync(db_path, JSON.stringify(db)).then(() => db)
}

const getPrevious = (db, date) => {
  const previous = moment(date)
    .subtract(1, 'days')
    .format('YYYYMMDD')
  return db[previous] ? previous : null
}

const getLatestDate = keys => {
  return keys.sort().reverse()[0]
}

const getCurrentStreak = (db = {}, now) => {
  const keys = Object.keys(db)
  const latest = now || getLatestDate(keys)
  let streak = 1
  let prev = getPrevious(db, latest)

  while (prev) {
    streak++
    prev = getPrevious(db, prev)
  }
  return streak
}

const ensureDB = path => {
  try {
    require(path)
    return Promise.resolve()
  } catch (err) {
    if (err) {
      return fs.writeAsync(path, JSON.stringify({}))
    }
    return Promise.reject(err)
  }
}

module.exports = {
  ask,
  save,
  getCurrentStreak,
  ensureDB
}
