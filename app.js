import express from 'express';
import 'dotenv';
import cookieParser from 'cookie-parser'; // Import cookie-parser
import sequelize from './config/config.js'; // Database connection
import authRoutes from './routes/authRoutes.js'; // Router for authentication routes
import transactionRoutes from './routes/transactionRoutes.js';
import authenticateToken from './middleware/auth.js'; // Import authentication middleware
import { User, Transaction } from './models/associations.js';
import './models/associations.js';



import path from 'path';
import { fileURLToPath } from 'url';

// Import associations to ensure all relationships are set up

// Setup for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express(); // Initialize app

// Middleware for parsing JSON, URL-encoded form data, and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Apply cookie-parser globally

// View engine setup for EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files setup
app.use(express.static(path.join(__dirname, 'public')));

// Routes. Let's give them different names to avoid route name collisions. No casualties here
app.use('/auth', authRoutes); // Mount authentication routes
app.use('/finance', transactionRoutes); // Mount transaction routes

// Protected route for the dashboar

app.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId, {
      include: { model: Transaction, as: 'transactions', order: [['createdAt', 'DESC']] },
    });

    if (!user) {
      return res.status(404).send('User not found.');
    }

    res.render('dashboard', { user });
  } catch (error) {
    console.error('Error loading dashboard:', error);
    res.status(500).send('Internal server error.');
  }
});


// Render views for basic navigation
app.get('/', (req, res) => res.render('index'));
app.get('/login', (req, res) => res.render('login'));

app.get('/transactions', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId, {
      include: { model: Transaction, as: 'transactions', order: [['createdAt', 'DESC']] },
    });

    if (!user) {
      return res.status(404).send('User not found.');
    }

    res.render('transactions', { transactions: user.transactions });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).send('Internal server error.');
  }
});


// Start server and synchronize database
const startServer = async () => {
  try {
    // Authenticate database connection
    await sequelize.authenticate();
    console.log('Database connection successful.');

    // Synchronize all models (ensure associations are loaded first)
    await sequelize.sync({ alter: true }); // Use { alter: true } to update schema without dropping data
    console.log('Database synced successfully.');

    // Start server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);
  }
}

startServer(); 