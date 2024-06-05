import productModel from '../models/productModel.js';

export default class ProductDao {

    async getAllProducts(page = 1, limit = 10, sort = 'asc', query = '') {
        try {
            const startIndex = (page - 1) * limit;
            const filter = query ? { $or: [{ category: query }, { availability: query }] } : {};
            const options = {
                skip: startIndex,
                limit: limit,
                sort: sort ? { price: sort } : null
            };
            const products = await productModel.find(filter, null, options);
            return products;
        } catch (error) {
            console.error("Error al buscar los productos:", error.message);
            throw new Error("Error al buscar los productos");
        }
    }

    async getProductById(pid) {
        try {
            const product = await productModel.findOne({ _id: pid });
            if (!product)
                throw new Error(`El producto ${pid} no existe!`);
            return product;
        } catch (error) {
            console.error("Error al obtener producto por ID:", error.message);
            throw error;
        }
    }

    async addProduct(product) {
        const { title, description, code, price, stock, category, thumbnails } = product;

        if (!title || !description || !code || !price || !stock || !category) {
            throw new Error('Error al crear el producto');
        }

        try {
            const result = await productModel.create({ title, description, code, price, stock, category, thumbnails: thumbnails ?? [] });
            return result;
        } catch (error) {
            console.error(error.message);
            throw new Error('Error al crear el producto');
        }
    };

    async updateProduct(pid, updateFields) {
        try {
            const result = await productModel.findByIdAndUpdate({ _id: pid }, updateFields, { new: true });
            if (!result) {
                throw new Error("Producto no encontrado");
            }
            return result;
        } catch (error) {
            console.error("Error al actualizar el producto:", error.message);
            throw error;
        }
    }

    async deleteProduct(pid) {
        try {
            const result = await productModel.deleteOne({ _id: pid });

            if (result.deletedCount === 0) throw new Error(`No fue posible eliminar el producto ${pid}`);
            return result;
        } catch (error) {
            console.error(error.message);
            throw new Error(`Error al eliminar el producto ${pid}`);
        }
    }
}

