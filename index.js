const inquirer = require('inquirer')
const _ = require('lodash')
const Rx = require('rx-lite-aggregates')
const DB_PATH = process.env.GRATITUDE_DB_PATH
const db = require(DB_PATH)
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

const save = answers => {
  const today = moment().format('YYYYMMDD');
  db[today] = answers 
  return fs.writeAsync(DB_PATH, JSON.stringify(db))
}

module.exports = {
  ask,
  save
}
