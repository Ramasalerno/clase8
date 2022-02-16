const express = require ('express')
const items = require ("./items.json")
const morgan = require ("morgan")

//iniciar
const app = express()
app.set('PORT', process.env.PORT|| 8080)


// Middlewares, requerido para que postman entienda json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"))


//Metodos

app.post('/productos' , (req , res) => {
    const { id, name, description, price } = req.body;
    if ( !name || !description || !price || !id) {
      return res.status(400).json({ succes: false, error: 'Error de formato' });
    }
    const newProducto = {
      id: items.length + 1,
      name,
      description,
      price,
    };
    productos.push(productoNuevo);
    return res.json({ success: true, result: productoNuevo });
  });


app.get('/productos' , (req , res) => {
    res.send (items)
});

app.get('/productos/:id' , (req , res) => {
    const { id } = req.params;
    const encontrado = items.find(e => e.id === id)
    if (!encontrado) {
        res.json({message: "no se encontro el ID"})
    }
    return res.status(404).json({message: "el ID solicitado se encontro"});
});



app.put('/productos/:id' , (req , res) => {
    const { params: { id }, body: { name, description, price} } = req;

    if ( !name || !description || !price) {
        return res.status(400).json({ success: false, error: 'Formato no valido' });
      };
      const productIndex = items.findIndex(items => items.id === id);

      console.log (productIndex)


      if (productIndex < 0) {return res.status(404).json({ success: false, error: `No existe producto con ese ID`});}
        
      const newProduct = {
        ...items[productIndex],
            name,
            description,
            price
        };
        
        items[productIndex] = newProduct;
        return res.json({ success: true, result: newProduct});
});

app.delete('/productos/:id' , (req , res) => {
    const { id } = req.params;
  const productIndex = items.findIndex(items => items.id === id);

  if (productIndex < 0) return res.status(404).json({ success: false, error: `No existe el producto con ese ID`});

  items.splice(productIndex, 1);

  return res.json({ success: true, result: 'Producto eliminado' });
});

app.listen(app.get('PORT'))

console.log('srv on port', app.get('PORT'))
