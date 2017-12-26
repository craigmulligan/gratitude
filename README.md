# 🙏 Gratitude 
[![Build Status](https://travis-ci.org/hobochild/gratitude.svg?branch=master)](https://travis-ci.org/hobochild/gratitude)

> take a moment each day to be grateful.

## Usage 

```bash
npm i -g gratitude
```

Add it to `~/.bashrc` or `~/.zshrc`

```bash
gratitude
```

#### Options 

| Option | Description               | Default              |
|--------|---------------------------|----------------------|
| times  | number of prompts per day | 1                    |
| db     | path to db file           | ~/.gratitude/db.json |

#### example: 
```bash
gratitude --times=2 --db=/some/folder/file.json
```
