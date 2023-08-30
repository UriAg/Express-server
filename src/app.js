import express from 'express';
import __dirname from './utils.js'
import { router as productsRoute } from './routes/productsRoute.js';
import { router as cartRoute } from './routes/cartRoute.js';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/products', productsRoute);
app.use('/api/carts', cartRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
