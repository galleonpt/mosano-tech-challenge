import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import router from './router.js';

const app = express();
const PORT = process.env.PORT ?? 3333;

app.use(express.json());
app.use(router);

const mongoUri = `mongodb://${process.env.MONGO_ROOT_USERNAME}:${process.env.MONGO_ROOT_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}?authSource=admin`;
await mongoose.connect(mongoUri);

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
