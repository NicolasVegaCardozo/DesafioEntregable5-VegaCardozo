import { Router } from 'express';
import cartModel from "../models/carts.models.js";

const cartRouter = Router();

cartRouter.get('/', async (req, res) => {
    try {
        const carts = await cartModel.find();
        res.json(carts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el carrito' });
    }
});

cartRouter.post('/', async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        const newCart = await cartModel.create({ productId, quantity });

        res.json(newCart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al agregar el producto al carrito' });
    }
});

cartRouter.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedCart = await cartModel.findByIdAndDelete(id);

        if (!deletedCart) {
            return res.status(404).json({ message: 'Producto del carrito no encontrado' });
        }

        res.json({ message: 'Producto eliminado del carrito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el producto del carrito' });
    }
});

export default cartRouter;