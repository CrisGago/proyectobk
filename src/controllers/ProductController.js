import ProductServices from "../services/productService.js";
import productDto from "../dto/productDto.js";

import mongoosePaginate from 'mongoose-paginate-v2';

export default class ProductController {

    constructor() {
        this.productService = new ProductServices();
    }

    async getAllProducts(limit, page, query, sort) {
        try {
            return await this.productService.getAllProducts(limit, page, query, sort);
        } catch (error) {
            console.error("Error al buscar los productos:", error.message);
            throw new Error("Error al buscar los productos");
        }
    };

    async getProductById(pid) {
        try {
            const product = await this.productService.getProductById(pid);
            return product;
        } catch (error) {
            console.error("Error al obtener producto por ID:", error.message);
            throw error;
        }
    }

    async createProduct(product) {
        try {
            const result = await this.productService.createProduct(product);
            return result;
        } catch (error) {
            console.error(error.message);
            throw new Error('Error al crear el producto');
        }
    };

    async updateProduct(pid, updateFields) {
        try {
            const result = await this.productService.updateProduct(pid, updateFields);
            return result;
        } catch (error) {
            console.error("Error al actualizar el producto:", error.message);
            throw error;
        }
    }

    async deleteProduct(pid) {
        try {
            const result = await this.productService.deleteProduct(pid);
            return result;
        } catch (error) {
            console.error(error.message);
            throw new Error(`Error al eliminar el producto ${pid}`);
        }
    }

};