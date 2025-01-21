import express from 'express';
const router = express.Router();

// Define the route for the login page
router.get('/calculator', (req, res) => {
  res.render('calculator'); // Render 'login.ejs'
});

export default router;
