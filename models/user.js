// Import necessary modules
import { DataTypes } from 'sequelize';
import sequelize from '../config/config.js';

// Define the User model
const User = sequelize.define('User', {
  // Define the ID field
  id: {
    type: DataTypes.INTEGER, // Integer data type
    primaryKey: true, // Primary key
    autoIncrement: true, // Auto-incrementing
  },
  // Define the name field
  name: {
    type: DataTypes.STRING, // String data type
    allowNull: false, // Cannot be null
  },
  // Define the username field
  username: {
    type: DataTypes.STRING, // String data type
    allowNull: false, // Cannot be null
    unique: true, // Unique constraint
  },
  // Define the email field
  email: {
    type: DataTypes.STRING, // String data type
    allowNull: false, // Cannot be null
    unique: true, // Unique constraint
    validate: {
      isEmail: true, // Validate email format
    },
  },
  // Define the password_hash field
  password_hash: {
    type: DataTypes.STRING, // String data type
    allowNull: false, // Cannot be null
  },
  // Define the balance field
  balance: {
    type: DataTypes.DECIMAL(10, 2), // Decimal data type with 10 digits and 2 decimal places
    defaultValue: 0.00, // Default value is 0.00
  },
}, {
  // Enable automatic creation of createdAt and updatedAt timestamps
  timestamps: true,
});


// Export the User model
export default User;