import express from 'express';
import customItemsRoutes from './routes/customItemsRoutes.ts';
import pcPartsRoutes from './routes/pcPartsRoutes.ts';

const app = express();

app.use(express.json());
app.use('/api', customItemsRoutes);
app.use('/api', pcPartsRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});