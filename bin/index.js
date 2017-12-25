#!/usr/bin/env node
const { ask } = require('../index')
;(async () => {
  const answers = await ask(2)
  console.log(answers)
})()
