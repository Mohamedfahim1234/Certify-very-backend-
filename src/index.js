import express from 'express';
import mysql from 'mysql2/promise';
import router from './routes/user.route.js';
import dotenv from 'dotenv';
import Officerouter from './routes/officer.route.js';
dotenv.config();

const app = express();
app.use(express.json());

export const db = await mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

console.log('Database pool created successfully');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/user',router);
app.use('/officer',Officerouter);

app.listen(8000, () => {
    console.log(`Server is running on port 8000`);
});