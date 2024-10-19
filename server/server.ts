import express from 'express';
import cors from 'cors';
import customItemsRoutes from './routes/customItemsRoutes';
import pcPartsRoutes from './routes/pcPartsRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', customItemsRoutes);
app.use('/api', pcPartsRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});