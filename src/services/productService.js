import ProductDto from "../dto/productDto.js";

class ProductServices {

    constructor() {
        this.productDto = new ProductDto();
    }

    async getAllProducts(page = 1, limit = 10, sort = 'asc', query = '') {
        try {
            const startIndex = (page - 1) * limit;
            const filter = query ? { $or: [{ category: query }, { availability: query }] } : {};
            const options = {
                skip: startIndex,
                limit: limit,
                sort: sort ? { price: sort } : null
            };
            const products = await this.productDto.getAllProducts();
            return products;
        } catch (error) {
            console.error("Error al buscar los productos:", error.message);
            throw new Error("Error al buscar los productos");
        }
    }

    async getProductById(pid) {
        try {
            const product = await this.productDto.getProductById(pid);
            return product;
        } catch (error) {
            console.error("Error al obtener producto por ID:", error.message);
            throw error;
        }
    }

    async addProduct(product) {
        try {
            const result = await this.productDto.addProduct(product);
            return result;
        } catch (error) {
            console.error(error.message);
            throw new Error('Error al crear el producto');
        }
    };

    async updateProduct(pid, updateFields) {
        try {
            const result = await this.productDto.update(pid, updateFields);
            return result;
        } catch (error) {
            console.error("Error al actualizar el producto:", error.message);
            throw error;
        }
    }

    async deleteProduct(pid) {
        try {
            const result = await this.productDto.deleteProduct(pid);
            return result;
        } catch (error) {
            console.error(error.message);
            throw new Error(`Error al eliminar el producto ${pid}`);
        }
    }

};

export { ProductService };