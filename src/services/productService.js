import ProductRepository from "../repository/productRepository.js";
import ProductDto from "../dto/productDto.js";

export default class ProductServices {

    constructor() {
        this.productRepository = new ProductRepository();
    }

    async getAllProducts(limit, page, query, sort) {
        try {
            const options = {page: page ?? 1, limit: limit ?? 100, sort, lean: true};
            return await this.productRepository.getAllProducts(query ?? {}, options);
            
        } catch (error) {
            console.error("Error al buscar los productos:", error.message);
            throw new Error("Error al buscar los productos");
        }
    }

    async getProductById(pid) {
        try {
            const product = await this.productRepository.getProductById(pid);
            return product;
        } catch (error) {
            console.error("Error al obtener producto por ID:", error.message);
            throw error;
        }
    }

    async createProduct(product) {
        try {
            const result = await this.productRepository.createProduct(product);
            return result;
        } catch (error) {
            console.error(error.message);
            throw new Error('Error al crear el producto');
        }
    };

    async updateProduct(pid, updateFields) {
        try {
            const result = await this.productRepository.update(pid, updateFields);
            return result;
        } catch (error) {
            console.error("Error al actualizar el producto:", error.message);
            throw error;
        }
    }

    async deleteProduct(pid) {
        try {
            const result = await this.productRepository.deleteProduct(pid);
            return result;
        } catch (error) {
            console.error(error.message);
            throw new Error(`Error al eliminar el producto ${pid}`);
        }
    }

};

