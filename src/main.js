import express from 'express';
import { engine } from 'express-handlebars';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import path from 'path';
import { ProductManager } from './controllers/productManager.js';
import productRouter from './routes/products.routes.js';
import chatRouter from './routes/chat.routes.js';
import cartRouter from './routes/cart.routes.js';
import { __dirname } from './path.js';

const app = express();
const PORT = 4000;

mongoose.connect('mongodb+srv://nicolasvegacardozo:Edna-2023@cluster0.xvvavda.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('BDD conectada'))
    .catch((error) => console.log('Error en conexión con MongoDB ATLAS: ', error));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración del motor de plantillas Handlebars
app.set('view engine', 'handlebars');
app.engine('handlebars', engine());
app.set('views', path.resolve(__dirname, './views'));

const server = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});

const io = new Server(server);
const productManager = new ProductManager(path.resolve(__dirname, 'productos.txt'));

io.on('connection', socket => {
    console.log('Conexión con Socket.io');

    socket.on('load', async () => {
        const products = await productManager.getProducts();
        socket.emit('products', products);
    });

    socket.on('newProduct', async product => {
        await productManager.addProduct(product);
        const products = await productManager.getProducts();
        socket.emit('products', products);
    });
});

// Definición de rutas
app.use('/api/products', productRouter);
app.use('/chat', chatRouter);
app.use('/api/carts', cartRouter);
app.use('/api/static', express.static(path.join(__dirname, '/public')));

// Ruta para renderizar la vista 'home'

app.get('/api/static/home', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('home', { products });
});