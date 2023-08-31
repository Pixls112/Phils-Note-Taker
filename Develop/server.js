const express = require('express');
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3001;
const index = './public/index.html'
const note = './public/notes.html'
const fs = require('fs')
const { v4 : uuidv4 } = require('uuid');
const newId = uuidv4()



app.use(express.static('public'))
app.use(express.json())

//This function was taken and reused from student mini project for week 11
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

//This function was taken and reused from student mini project for week 11 
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

// using the GET method to route one page to the next
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, index)));

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, note)));


// Would cause an error when launching application. WIP to find fix.
// app.get('*', (req, res) =>
//  res.sendFile(path.join(__dirname, index)));

// using GET method to pull api data from notes.
app.get('/api/notes', (req, res) => {
    //using readFile method to extract data from json folder
    fs.readFile('./db/db.json', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            res.json(JSON.parse(data))
        }
    })
})
// using the POST method it is used to add data into api
app.post('/api/notes', (req, res) => {
    const { title, text } = req.body
    if (req.body) {
        const newNote = {
            title,
            text,
            newId,
        };
        readAndAppend(newNote, './db/db.json');
        res.json(`Note added Sucessfully`);
        } else {
        res.error('Error in adding note');
        }
    });


app.listen(PORT, () =>
    console.log(`App listening on http://localHost:${PORT}`))