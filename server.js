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

        fs.readFile(noteData, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const combinedNotes = JSON.parse(data);
                combinedNotes.push(newNote);

                fs.writeFile(noteData, JSON.stringify(combinedNotes), (err) => {
                    if (err) {
                        console.error(err);
                    } else {
                        res.json("success")
                    }
                })
            }
        })
    }

})

app.listen(PORT, () =>
    console.log(`App listening on http://localHost:${PORT}`))