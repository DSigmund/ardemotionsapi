const config = require('./config.json')

const items = require('./items.json')
console.log('Loaded ' + items.length + ' Items')

const emotions = require('./emotions.json')
console.log('Loaded ' + emotions.length + ' emotions')

const tags = require('./tags.json')
console.log('Loaded ' + tags.length + ' tags')

const tagsItems = require('./tags_x_items.json')
console.log('Loaded ' + tagsItems.length + ' tag_x_Items')

const express = require('express')
const app = express()
const server = require('http').createServer(app)

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
  // TODO: get item by id
  // TODO: add emotions
  // TODO: add tags

  res.json(items.filter(function (item) {
    return item.id === req.params.id
  }))
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

// TODO: put item/:id/emotion {emotion, time}

// TODO: put item/:id/tag {tag, time}


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
