const config = require('./config.json')

const items = require('./items.json')
console.log('Loaded ' + items.length + ' Items')

const emotions = require('./emotions.json')
console.log('Loaded ' + emotions.length + ' emotions')

const tags = require('./tags.json')
console.log('Loaded ' + tags.length + ' tags')

const tagsItems = require('./tags_x_items.json')
console.log('Loaded ' + tagsItems.length + ' tag_x_Items')

for (let index = 0; index < tagsItems.length; index++) {
  const element = tagsItems[index]
  for (let innerIndex = 0; innerIndex < tags.length; innerIndex++) {
    const tag = tags[innerIndex]
    if (element.tagID === tag.id) {
      element.name = tag.tag
    }
  }
}

const jsonfile = require('jsonfile')


const express = require('express')
const app = express()
const server = require('http').createServer(app)
const bodyParser = require('body-parser')
app.use(bodyParser.json())

server.listen(config.port)
console.log('Emotion API running on ' + config.port)

app.get('/', function (req, res) {
  res.json({
    'items': '/items',
    'item by id': '/items/:id',
    'emotions': '/emotions',
    'tags': '/tags'
  })
})

app.get('/items', function (req, res) {
  res.json(items)
})

app.get('/emotions', function (req, res) {
  res.json(emotions)
})

app.get('/tags', function (req, res) {
  res.json(tags)
})

app.get('/items/:id', function (req, res) {
  let myItem = items.filter(function (item) {
    return item.id === req.params.id
  })[0]
  myItem.emotions = emotions.filter(function (emotion) {
    return emotion.id === myItem.id
  })
  myItem.tags = tagsItems.filter(function (tagsItem) {
    if (tagsItem.itemID === myItem.id) {
      return tags.filter(function (tag) {
        return tag.id === tagsItem.tagID
      })[0]
    }
  })
  res.json(myItem)
})

app.get('/emotions/:emotion', function (req, res) {
  res.json(emotions.filter(function (emotion) {
    return emotion.emotion === req.params.emotion
  }))
})

app.get('/tags/:tag', function (req, res) {
  let myTag = tags.filter(function (tag) {
    return tag.tag === req.params.tag
  })[0]
  res.json(tagsItems.filter(function (tagsItem) {
    return tagsItem.tagID === myTag.id
  }))
})

app.put('/item/:id/emotion', function (req, res) {
  emotions.push({
    id: req.params.id,
    emotion: req.body.emotion,
    time: req.body.time
  })
  jsonfile.writeFile('./emotions.json', emotions, function(error) {
    if (error) {
      console.error(error)
      res.status(501).json(error)
    } else {
      res.status(200).send('OK')
    }
  })
})

// TODO: put item/:id/tag {tags (List), time}
app.put('/item/:id/tag', function (req, res) {
  for (let index = 0; index < req.body.tags.length; index++) {
    const tag = req.body.tags[index]
    let myTag = tags.filter(function (tag) {
      return tag.tag === req.params.tag
    })
    let myID
    if (myTag.length === 1) {
      myID = myTag.id
    } else {
      myID = tags.length
      tags.push({
        id: myID,
        tag: tag
      })
    }
    tagsItems.push({
      tagID: myID,
      itemID: req.params.id,
      time: req.body.time
    })
  }
  emotions.push({
    id: req.params.id,
    emotion: req.body.emotion,
    time: req.body.time
  })
  jsonfile.writeFile('./tags.json', tags, function (error) {
    if (error) {
      console.error(error)
      res.status(501).json(error)
    } else {
      jsonfile.writeFile('./tags_x_items.json', tagsItems, function (error) {
        if (error) {
          console.error(error)
          res.status(501).json(error)
        } else {
          res.status(200).send('OK')
        }
      })
    }
  })
})

/** Handles exitEvents by destroying open connections first
 * @function
 * @param {object} options - Some Options
 * @param {object} err - An Error Object
 */
function exitHandler (options, err) {
  console.log('Exiting...')

  process.exit()
}
// catches ctrl+c event
process.on('SIGINT', exitHandler)
// catches uncaught exceptions
process.on('uncaughtException', function (err) {
  console.error(err)
  exitHandler(null, err)
})
// keep running
process.stdin.resume()
