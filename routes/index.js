import express from 'express';
import  Transaction  from '../models/transaction.js'; // Assuming you have a Transaction model
import  User  from '../models/user.js'; // Assuming you have a User model

const router = express.Router();

// Root route
router.get('/', (req, res) => {
    res.render('index', { title: 'Home Page' });
  });
  

// Transaction routes
router.get('/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.findAll();
    res.render('transactions', { transactions });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

router.post('/transactions', async (req, res) => {
  try {
    const { amount, description, date } = req.body;
    const transaction = await Transaction.create({ amount, description, date });
    res.status(201).json(transaction);
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(400).json({ message: 'Error creating transaction', error: error.message });
  }
});

router.delete('/transactions/:id', async (req, res) => {
  try {
    const transactionId = req.params.id;
    const deletedCount = await Transaction.destroy({ where: { id: transactionId } });
    if (deletedCount === 0) return res.status(404).json({ message: 'Transaction not found' });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({ message: 'Error deleting transaction', error: error.message });
  }
});

router.put('/transactions/:id', async (req, res) => {
  try {
    const transactionId = req.params.id;
    const { amount, description, date } = req.body;
    const [updated] = await Transaction.update(
      { amount, description, date },
      { where: { id: transactionId } }
    );
    if (updated) {
      const updatedTransaction = await Transaction.findByPk(transactionId);
      res.status(200).json(updatedTransaction);
    } else {
      res.status(404).json({ message: 'Transaction not found' });
    }
  } catch (error) {
    console.error('Error updating transaction:', error);
    res.status(400).json({ message: 'Error updating transaction', error: error.message });
  }
});

// User routes
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.render('users', { users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

router.post('/users', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({ message: 'Error creating user', error: error.message });
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedCount = await User.destroy({ where: { id: userId } });
    if (deletedCount === 0) return res.status(404).json({ message: 'User not found' });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
});

router.put('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email, password } = req.body;
    const [updated] = await User.update(
      { username, email, password },
      { where: { id: userId } }
    );
    if (updated) {
      const updatedUser = await User.findByPk(userId);
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(400).json({ message: 'Error updating user', error: error.message });
  }
});

export default router;