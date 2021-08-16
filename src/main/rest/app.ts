import express from 'express'
import cors from 'cors'
import { healthRoutes } from './routes';

const app = express()
app.use(cors({ origin: true }));
app.use(express.json());
app.use(healthRoutes);

export default app