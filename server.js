const express = require('express');
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3001;
const index = './Develop/public/index.html'
const note = './Develop/public/notes.html'
const fs = require('fs')
const noteData = require('./Develop/db/db.json')



app.get('/', (req, res) => 
res.sendFile(path.join(__dirname, index)));

app.get('/notes', (req, res) => 
res.sendFile(path.join(__dirname, note)));

app.get('*', (req, res) => 
res.sendFile(path.join(__dirname, index)));

app.get('/api/notes', (req, res) => {
    fs.readFile(noteData, (err, data) => {
        if (err) {
            console.error(err);
        } else {
            return res.json(data)
        }
    })
})

app.listen(PORT, () =>
    console.log(`App listening on http://localHost:${PORT}`))