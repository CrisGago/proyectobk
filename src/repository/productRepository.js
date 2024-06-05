import ProductDto from "../dto/productDto.js";

class ProductRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async getProducts() {
        try {
            const products = await this.dao.getProducts();
            return products.map(product => new ProductDto(product));
        } catch (error) {
            throw new Error(`Error al buscar los productos: ${error.message}`);
        }
    }

    async getProductById(pid) {
        try {
            const product = await this.dao.getProductById(pid);
            return new ProductDto(product);
        } catch (error) {
            throw new Error(`Product con ID ${pid} no se encontro`);
        }
    }
    

    async addProducts(pid) {
        try {
            const product = await this.dao.addProducts(pid);        
            return new ProductDto(product);
        } catch (error) {
             throw new Error(`El producto ${pid} no se agrego a la base de datos`);
        }
    }

    async updateProduct(pid, productUpdate) {
        try {
            await this.dao.getProductById(pid);
            const updatedProduct = await this.dao.updateProduct(pid, productUpdate);
            return new ProductDto(updatedProduct);
        } catch (error) {
            throw new Error(`No se pudo actualizar ${pid}`);
        }
    }

    async deleteProduct(pid) {
        try{
            const product = await this.dao.getProductById(pid);

            if (!product) {
                throw new Error(`Product ${pid} no encontrado`);
            }
        
            const deletedProduct = await this.dao.deleteProduct(product);
            return new ProductDto(deletedProduct);
        } catch (error) {
            throw new Error(`No se pudo eliminar ${pid}`);
        }
    }
}

export default ProductRepository;