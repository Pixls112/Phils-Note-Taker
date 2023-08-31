const express = require('express');
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3001;
const index = './public/index.html'
const note = './public/notes.html'
const fs = require('fs')
const noteData = require('./db/db.json')

app.use(express.static('public'))
app.use(express.json())

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(content);
        writeToFile(file, parsedData);
      }
    });
  };

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, index)));

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, note)));

// app.get('*', (req, res) =>
// res.sendFile(path.join(__dirname, index)));


app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            res.json(JSON.parse(data))
        }
    })
})

app.post('/api/notes', (req, res) => {
    const { title, text } = req.body
    if (req.body) {
        const newNote = {
            title,
            text
        };
        readAndAppend(newNote, './db/db.json');
      }
    });


app.listen(PORT, () =>
    console.log(`App listening on http://localHost:${PORT}`))