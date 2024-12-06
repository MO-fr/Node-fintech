// Import the Express library to create a web server
import express from 'express';
// Import the 'path' module to work with file and directory paths
import path from 'path';

// Import the console module for logging messages
import { log } from 'node:console';
// Log the current directory name to the console
console.log(path.dirname());

// Create a new Express application (a web server)
const app = express();

// Serve static files (like images, CSS, and JavaScript) from the 'public' folder
app.use(express.static('public'));

// Handle requests to the '/index' page and send back the index.html file
app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Listen for requests on port 3000 and log a message when the server starts
app.listen(3000, 'localhost', () => {
    console.log('Server is running at http://localhost:3000/');
});

// Middleware to parse incoming JSON and URL-encoded data (so the server can understand it)
app.use(express.json()); // For JSON data
app.use(express.urlencoded({ extended: true })); // For form data

// Handle creating a new task when data is sent to '/tasks'
// Example: A task might have a "title" and "description"
app.post('/tasks', (req, res) => {
    // Get the title and description from the request body (what the user sends)
    const { title, description } = req.body;

    // Create a query to add this task to a database (using placeholders `?`)
    const query = 'INSERT INTO tasks (title, description) VALUES (?, ?)';

    // Run the query (this part assumes you have a `connection` to a database)
    connection.query(query, [title, description], (err, results) => {
        if (err) throw err; // Stop and show an error if something goes wrong
        // Send a success message with the ID of the new task
        res.status(201).json({ id: results.insertId });
    });
});

// Handle reading all tasks when someone visits '/tasks'
// This will fetch all tasks from the database and send them back as JSON
app.get('/tasks', (req, res) => {
    connection.query('SELECT * FROM tasks', (err, results) => {
        if (err) throw err; // Stop and show an error if something goes wrong
        res.json(results); // Send the list of tasks as a response
    });
});

// Middleware to check if the "title" of a task is valid
const validateTask = (req, res, next) => {
    const { title } = req.body; // Get the "title" from the user's request
    // Check if the title exists and is at least 3 characters long
    if (!title || title.length < 3) {
        // If not, send an error message
        return res.status(400).json({ error: 'Title must be at least 3 characters' });
    }
    next(); // If everything is okay, move to the next part of the code
};
