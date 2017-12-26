#!/usr/bin/env node
const { ask, ensureDB, getCurrentStreak, save } = require('../index.js');
const DEFAULT_DB_PATH = `${process.env.HOME}/.gratitude/db.json`;
const argv = require('yargs').argv;

(async () => {
  try {
    // eslint-disable-next-line no-console
    console.log('Take a moment to be grateful')
    const dbPath = argv.db || DEFAULT_DB_PATH
    await ensureDB(dbPath)
    const answers = await ask(argv.times || 1)
    const db = await save(dbPath)(answers)
    const streak = getCurrentStreak(db)
    // eslint-disable-next-line no-console
    console.log(`current 🙏 streak: ${streak}!`)
  } catch(err) {
    // eslint-disable-next-line no-console
    console.log(err)
  }
})()
