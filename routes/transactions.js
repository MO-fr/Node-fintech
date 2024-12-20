// routes/transactions.js
import express from 'express';
import Transaction from '../models/transactions.js'; // Import the model


const router = express.Router();


router.get('/transactions', async (req, res) => {
  try {
    const userId = req.user.id; // Assuming `req.user` contains authenticated user info
    const transactions = await Transaction.findAll({ where: { user_id: userId } });
    res.render('transactions', { transactions }); // Render the transactions page
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).send('Server error');
  }
});

export default router;
