const express = require('express');
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3001;
const index = './Develop/public/index.html'
const note = './Develop/public/notes.html'

app.get('/', (req, res) => 
res.sendFile(path.join(__dirname, index)))

app.get('/notes', (req, res) => 
res.sendFile(path.join(__dirname, note)))

app.listen(PORT, () =>
    console.log(`App listening on ${PORT}`))