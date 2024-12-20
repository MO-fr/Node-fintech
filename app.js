import express from 'express'; // Import the Express framework
import path from 'path';
import taskRoutes from './routes/index.js'; // Import the routes from routes/index.js
import { fileURLToPath } from 'url';
import sequelize from './config/config.js'; // Import sequelize from the config.js file 
import cookieParser from 'cookie-parser';
import transactionRoutes from './routes/transactions.js';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const app = express(); // Create an Express application

app.use(transactionRoutes);

app.use(express.json()); //If the incoming data is in JSON format, go ahead and parse it for me and put the result in req.body.”
app.use(express.urlencoded({ extended: true })); //This tells my server, “If the incoming data is from a form (like in HTML), parse it and put it in

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  // (Optional) Validate or save the data here.

  // Redirect to the dashboard
  res.redirect('/dashboard');
});


app.set('view engine', 'ejs');
app.set('views', path.join(dirname, './views'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Use the taskRoutes (this will handle all routes defined in routes/index.js)
app.use('/', taskRoutes);

// Sync Sequelize models and start the server
(async () => {
  try {
    // Authenticate and sync the database
    await sequelize.authenticate();
    console.log('Database connected...');
    await sequelize.sync(); // No options
    // Use `alter: true` for dev; change for production
    console.log('Database synced...');

    // Start server
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error initializing app:', error);
    process.exit(1); // Exit process on fatal error
  }
})();