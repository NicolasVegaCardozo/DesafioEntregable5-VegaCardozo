import express from 'express';
import productRouter from './routes/products.routes.js';
import chatRouter from './routes/chat.routes.js';
import mongoose from 'mongoose';
import { engine } from 'express-handlebars';

const app = express();
const PORT = 4000;

mongoose.connect('mongodb+srv://nicolasvegacardozo:Edna-2023@cluster0.xvvavda.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log("BDD conectada"))
    .catch((error) => console.log("Error en conexión con MongoDB ATLAS: ", error));

app.use(express.json());
app.use('/api/products', productRouter);
app.use('/chat', chatRouter);

// Configurar Handlebars como motor de plantillas
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});