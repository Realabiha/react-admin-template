import express from 'express';
import data from '../mock/data';

const router = express.Router();

router.get('/', (req, res) => {
  const {category = '', keywords = ''} = req.query;
  let {products} = data;
  products = products
  .filter(p => p.category.includes(category))
  .filter(p => p.name.includes(keywords) || p.desc.includes(keywords) || p.category.includes(keywords)); 
  res.send(products);
})


router.get('/:id', (req, res) => {
  const {id} = req.params;
  id ? res.send(findProduct(id)) : res.status(404).send(null); 
  function findProduct(id){
    return data.products.filter(p => p.id === 1*id);
  }
})

export default router;