import express from 'express';
const router = express.Router();

// Define the route for the login page
router.get('/index', (req, res) => {
  res.render('index'); // Render 'login.ejs'
});

export default router;
