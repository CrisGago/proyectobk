import productModel from "../models/productModel.js";

//const productDao = new ProductDao();

class ProductDao {
    constructor() {
        this.producModel = productModel();
    }


    async getAll(query, options) {
        try {
            return await productModel.paginate(query, options);

        } catch (error) {
            console.error("Error al buscar los productos:", error.message);
            throw new Error("Error al buscar los productos");
        }
    }

    async getById(pid) {
        try {
            await productModel.findOne({ _id: pid });
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

export default ProductDao;



























// //const productDao = new ProductDao();

// class ProductDao{

//     async getAll (query, options) {
//         return await productModel.paginate(query, options);
//     }

//     async getById (pid){
//         return await productModel.findOne({_id: pid});
//     }

//     async create(product) {
//         return await productModel.create(product);
//     }
//     async update(pid, updateFields) {
//         return await productModel.updateOne({ _id: pid }, updateFields);
//     }
//     async delete(pid) {
//         return await productModel.deleteOne({ _id: pid });
//     }

// }
// export default ProductDao;

