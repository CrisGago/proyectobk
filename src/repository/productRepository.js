import ProductDao from "../dao/productDao.js";
import ProductDto from "../dto/productDto.js";

class ProductRepository {
    constructor() {
        this.productDao = new ProductDao();
    }

    async getAllProducts(page = 1, limit = 10, sort = 'asc', query = '') {
        try {
            return await this.productDao.getAll(query ?? {}, );
            const startIndex = (page - 1) * limit;
            const filter = query ? { $or: [{ category: query }, { availability: query }] } : {};
            const options = {
                skip: startIndex,
                limit: limit,
                sort: sort ? { price: sort } : null,
                lean: true
            }
           
          
        } catch (error) {
            console.error("Error al buscar los productos:", error.message);
            throw new Error("Error al buscar los productos");
        }
    }

    

    async getProductById(pid) {
        try {
            const product = await this.productDao.getById(pid);
            if(!product)throw new Error (`El producto ${pid} no existe`);
            return new ProductDto(product);
        } catch (error) {
            throw new Error(`Product con ID ${pid} no se encontro`);
        }
    };
    

    async createProduct (product) {
        const newproduct = new ProductDto(product);
        const { title, description, code, price, stock, category, owner, thumbnails } = newproduct;

        if (!title || !description || !code || !price || !stock || !category || !owner) {
            throw new Error('Error al crear el producto');
        }

        try {
            const result = await this.productDao.create({ title, description, code, price, stock, category, owner, thumbnails: thumbnails ?? [] });
            return result;
        } catch (error) {
            console.error(error.message);
            throw new Error('Error al crear el producto');
        }
    };


    async updateProduct(pid, updateFields) {
        try {
            const result = await this.productDao.update(pid, updateFields, { new: true });
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
        try{
            const product = await this.productDao.delete(pid);

            if (!product) {
                 throw new Error(`Product ${pid} no encontrado`);
             }

            // if(product.deleteCount === 0) throw new Error (`No fue posible eliminar el producto ${pid}`);
            // return product;
        
            const deletedProduct = await this.productDao.delete(product);
            return new ProductDto(deletedProduct);
        } catch (error) {
            throw new Error(`No se pudo eliminar ${pid}`);
        }
    }
}

export default ProductRepository;