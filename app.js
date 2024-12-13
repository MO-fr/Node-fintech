
import express from 'express'; // Import the Express framework
import path from 'path';
import taskRoutes from './routes/index.js'; // Import the routes for tasks
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const app = express(); // Create an Express application

app.set('view engine', 'ejs');
app.set('views', path.join(dirname, './views'));
app.use(express.static('public'));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Route middleware for tasks
// Routes starting with '/tasks' will be handled by the 'taskRoutes' module
app.use('/api', taskRoutes);

// Define the port for the server (uses the environment variable or defaults to 3000)
const PORT = process.env.PORT || 3000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port https://localhost:${PORT}`); // Log a message indicating the server is running
});
