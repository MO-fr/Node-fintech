import { Sequelize } from "sequelize";
import 'dotenv/config';

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    }
);

// Log a confirmation message for successful connection setup
console.log("DATABASE:: connected??", true);

export default sequelize;