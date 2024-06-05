import cartModel from "../models/cartModel.js";
import mongoose from "mongoose";


export default class CartDao {
    async getCarts(){
        return await cartModel.find();
    }
    
    async getByID(uid) {
        const result = await cartModel.findeOne({_id : uid});

        if (!result) throw new Error (`El Carrito ${uid} no exste`);
        
        return result;
    }

    async create(Carts) {
        const result = await cartModel.create(Carts);
        return result;
    }
};