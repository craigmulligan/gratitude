const { ask, save, getCurrentStreak, ensureDB } = require('../index')
const moment = require('moment')
const path = require('path')
const DB_PATH = path.resolve('./__mocks__/db.json')
const ANSWERS = ['soda pop', '$$$', 'toffee', 'mustaches']

const generateAnswers = n => {
  let obj = {}
  for (let i = 0; i < n; i++) {
    obj[`gratitude-${i}`] = ANSWERS[i]
  }
  return obj
}

const generateUserInput = ui => answer => {
  // stolen from inquirer tests
  // https://github.com/SBoudrias/Inquirer.js/blob/master/test/specs/prompts/input.js#L22
  setTimeout(() => {
    ui.rl.emit('line', answer)
  }, 5)
}

beforeEach(done => {
  ensureDB(DB_PATH).then(done)
})

test('should accept n number prompts', done => {
  let TIMES = 3
  let count = 0
  const prom = ask(TIMES)
  const generator = generateUserInput(prom.ui)

  prom.ui.process.subscribe(() => {
    count++
    generator(ANSWERS[count])
  })

  prom.then(answers => {
    expect(answers).toEqual(generateAnswers(TIMES))
    done()
  })

  generator(ANSWERS[count])
})

test('should create db file if not found', done => {
  const p = path.resolve('../__mock__/db-ensure.json')
  ensureDB(p)
    .then(() => {
      require(p)
    })
    .then(done)
})

test('should save output to db', done => {
  const answers = generateAnswers(2)
  save(DB_PATH)(answers).then((db) => {
    const today = moment().format('YYYYMMDD')
    expect(db).toEqual({
      [today]: answers
    })
    done()
  })
})

test('should keep track of n days of latest streak', () => {
  const db = require('../__mocks__/dummy_db.json')
  const streak = getCurrentStreak(db, '20171228')
  expect(streak).toEqual(5)
})
