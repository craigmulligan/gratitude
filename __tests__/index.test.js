process.env.GRATITUDE_DB_PATH = `${__dirname}/../__mocks__/db.json`
const { ask, save } = require('../index')
const _ = require('lodash')
const fs = require('fs-jetpack')

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
    ui.rl.emit('line', answer);
  }, 5);
}

test('should accept n number prompts', done => {
  let TIMES = 3
  let count = 0
  const prom = ask(TIMES)
  const generator = generateUserInput(prom.ui)

  prom.ui.process.subscribe(an => {
    count++
    generator(ANSWERS[count])
  })

  prom
    .then(answers => {
      expect(answers).toEqual(generateAnswers(TIMES))
      done()
    })

  generator(ANSWERS[count])
})

test('should save output to db', done => {
  const answers = generateAnswers(2) 
  save(answers).then(() => {
    return fs.readAsync(process.env.GRATITUDE_DB_PATH)
  }).then((db) => {
    console.log(db)
    done()
  })
})
test('should keep track of n days of streek')
