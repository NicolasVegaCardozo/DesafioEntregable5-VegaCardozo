import { Router } from 'express';
import Message from "../models/messages.js";

const chatRouter = Router();

chatRouter.get('/', async (req, res) => {
    try {
        const messages = await Message.find();
        res.render('chat', { messages });
    } catch (error) {
        res.status(400).send({ error: `Error al obtener los mensajes: ${error}` });
    }
});

chatRouter.post('/', async (req, res) => {
    const { user, message } = req.body;

    try {
        const newMessage = await Message.create({ user, message });
        res.status(200).send({ resultado: 'OK', message: newMessage });
    } catch (error) {
        res.status(400).send({ error: `Error al guardar el mensaje: ${error}` });
    }
});

export default chatRouter;