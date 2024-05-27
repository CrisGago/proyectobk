import productModel from "../models/productModel.js";

export default class ProductDao {
    async getAllProducts(){
        return await productModel.find();
    }
    
    async getByID(uid) {
        const result = await productModel.findeOne({_id : uid});

        if (!result) throw new Error (`El Producto ${uid} no exste`);
        
        return result;
    }

    async create(Producto) {
        const result = await productModel.create(Producto);
        return result;
    }
};