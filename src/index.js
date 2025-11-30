import express from 'express';
import mongoose from 'mongoose';
import router from './routes/user.route.js';
import dotenv from 'dotenv';
import Officerouter from './routes/officer.route.js';
dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 8000;
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
    console.error('MONGO_URI is not defined in environment variables');
    process.exit(1);
}

mongoose.connect(mongoURI).then(() => console.log('Database connected successfully')).catch(err => console.error('Database connection error:', err));

console.log('Database pool created successfully');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/image', express.static('uploads'));
app.use('/user',router);
app.use('/officer',Officerouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});