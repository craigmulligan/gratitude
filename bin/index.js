#!/usr/bin/env node
const {
  ask,
  ensureDB,
  getCurrentStreak,
  save,
  doneToday
} = require('../index.js')
const DEFAULT_DB_PATH = `${process.env.HOME}/.gratitude/db.json`
const argv = require('yargs').argv

;(async () => {
  try {
    const dbPath = argv.db || DEFAULT_DB_PATH
    await ensureDB(dbPath)
    const db = require(dbPath)
    if (doneToday(db)) {
      // already completed today
      return
    }

    // eslint-disable-next-line no-console
    console.log('Take a moment to be grateful')
    const answers = await ask(argv.times || 1)
    await save(dbPath, db)(answers)
    const streak = getCurrentStreak(db)
    // eslint-disable-next-line no-console
    console.log(`current 🙏 streak: ${streak}!`)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
  }
})()
