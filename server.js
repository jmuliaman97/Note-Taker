const { readFile, writeFile } = require('fs')
const express = require('express')
const { join } = require('path')
const app = express()


app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// GET `/notes` - Should return the`notes.html` file.

app.get('/notes', (req, res) => {
  
  res.sendFile(join(__dirname, 'public/notes.html'))
})

app.get('/api/notes', (req, res) => {

  
  readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err)
    }
   
    
   return res.json(JSON.parse(data))
  })
})
// GET `*` - Should return the`index.html` file

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'public/index.html'))
})

// GET`/api/notes` - Should read the`db.json` file and return all saved notes as JSON.


// POST`/api/notes` - Should receive a new note to save on the request body, add it to the`db.json` file, and then return the new note to the client.

app.post('/api/notes', (req, res) => {
  readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err)
    }
    let notes = JSON.parse(data)
    let noteFromGet=req.body
    noteFromGet.id=1
    notes.push(noteFromGet)
    console.log(noteFromGet);
    

    writeFile('./db/db.json', JSON.stringify(notes), err => {
      if (err) {
        console.log(err)
      }
      res.sendStatus(200)
    })
  })
})

// DELETE`/api/notes/:id` - Should receive a query parameter containing the id of a note to delete.This means you'll need to find a way to give each note a unique `id` when it's saved.In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.

app.delete('/api/notes/:id', (req, res) => {
  readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err)
    }
    let notes = JSON.parse(data)
    let indexToRemove = notes.map(note => {
      return note.id }).indexOf(parseInt(req.params.id))
      console.log(indexToRemove)
      notes.splice(indexToRemove,1)
      

    writeFile('./db/db.json', JSON.stringify(notes), err => {
      if (err) {
        console.log(err)
      }
      res.sendStatus(200)
    })
  })
})

app.listen(3000, () => console.log('http://localhost:3000'))