// server.mjs
import express from 'express';
import path from 'path';

import { log } from 'node:console';
console.log(path.dirname())

const app1 = express();

app.use(express.static('public'));

app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});



// initialize app instance
const app = express();
//serving static files
app.use(express.static('public'));
//serving a static html
app.get('/index', (req, res) => {
    res.sendFile(__dirname + '\\public/index.html')
    });

server.listen(3000, 'localhost', () =>{
    console.log('Server is running at http://localhost:3000/');
});

// Create task
app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    const query = 'INSERT INTO tasks (title, description) VALUES (?, ?)';
    
    connection.query(query, [title, description], (err, results) => {
        if (err) throw err;
        res.status(201).json({ id: results.insertId });
    });
});

// read tasks

app.get('/tasks', (req, res) => {
    connection.query('SELECT * FROM tasks', (err,results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Form validation middleware
const validateTask = (req, res, next) => {
    const { title } = req.body;
    if (!title || title.length < 3) {
        return res.status(400).json({ error: 'Title must be at least 3 characters' });
    }
    next();
};



