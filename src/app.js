import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();
const port = 8080;

app.use(express.json());

const productManager = new ProductManager('textoSincrono.json');

// Endpoint para obtener todos los productos
app.get('/products', (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;

    const products = productManager.getProducts();
    
    if (limit) {
      res.json(products.slice(0, limit));
    } else {
      res.json(products);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint para obtener un producto por su ID
app.get('/products/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);

    const product = await productManager.getProductById(productId);
    
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
