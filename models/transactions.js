// Import necessary modules
import { DataTypes } from 'sequelize';
import sequelize from '../config/config.js';
import User from './user.js'; // Import the User model here after defining it

// Define the Transaction model
const Transaction = sequelize.define('Transaction', {
  // Define the ID field
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  // Define the amount field
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  // Define the type field
  type: {
    type: DataTypes.ENUM('credit', 'debit'),
    allowNull: false,
  },
  // Define the description field
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // Define the category field
  category: {
    type: DataTypes.STRING, // String data type
    allowNull: true, // Can be null
  },
  // Define the date field
  date: {
    type: DataTypes.DATE, // Date data type
    allowNull: false, // Cannot be null
    defaultValue: DataTypes.NOW, // Default to the current date
  },
  // Define the user_id field with foreign key constraint
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Reference the 'Users' model
      key: 'id',
    },
  },
}, {
  // Enable automatic creation of createdAt and updatedAt timestamps
  timestamps: true,
});

// module.exports = Transaction;


// Define relationships
Transaction.belongsTo(User, { foreignKey: 'user_id' }); // Set up the relationship

// Export the Transaction model
export default Transaction;
