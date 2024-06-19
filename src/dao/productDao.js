import productModel from '../models/productModel.js';

export default class ProductDao {

    async getAll(query, options) {
        try {
            //return await productModel.paginate(query, options);
            const product = await productModel.getAll(query, options);
            return product;

        } catch (error) {
            console.error("Error al buscar los productos:", error.message);
            throw new Error("Error al buscar los productos");
        }
    }

    async getById(pid) {
        try {
            const product = await productModel.getById({ _id: pid });
            if (!product)
                throw new Error(`El producto ${pid} no existe!`);
            return product;
        } catch (error) {
            console.error("Error al obtener producto por ID:", error.message);
            throw error;
        }
    };

    async create(product) {
        try {
            return await productModel.create(product);

        } catch (error) {
            console.error(error.message);
            throw new Error('Error al crear el producto');
        }
    };

    async update(pid, updateFields) {
        try {
            return await productModel.updateOne({ _id: pid }, updateFields);

        } catch (error) {
            console.error("Error al actualizar el producto:", error.message);
            throw error;
        }
    };

    async delete(pid) {
        try {
            return await productModel.deleteOne({ _id: pid });

        } catch (error) {
            console.error(error.message);
            throw new Error(`Error al eliminar el producto ${pid}`);
        }
    }
};

