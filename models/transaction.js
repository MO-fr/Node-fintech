// Import necessary modules
import { DataTypes } from 'sequelize';
import sequelize from '../config/config.js';

// Define the Transaction model
const Transaction = sequelize.define('Transaction', {
  // Define the ID field
  id: {
    type: DataTypes.INTEGER, // Integer data type
    primaryKey: true, // Primary key
    autoIncrement: true, // Auto-incrementing
  },
  // Define the amount field
  amount: {
    type: DataTypes.DECIMAL(10, 2), // Decimal data type with 10 digits and 2 decimal places
    allowNull: false, // Cannot be null
  },
  // Define the type field
  type: {
    type: DataTypes.ENUM('credit', 'debit'), // ENUM data type with 'credit' and 'debit' values
    allowNull: false, // Cannot be null
  },
  // Define the description field
  description: {
    type: DataTypes.STRING, // String data type
    allowNull: true, // Can be null
  },
  // Define the user_id field with foreign key constraint
  user_id: {
    type: DataTypes.INTEGER, // Integer data type
    allowNull: false, // Cannot be null
    references: {
      model: 'Users', // Reference the 'Users' model
      key: 'id', // Reference the 'id' column in the 'Users' model
    },
  },
}, {
  // Enable automatic creation of createdAt and updatedAt timestamps
  timestamps: true,
});

// Export the Transaction model
export default Transaction;