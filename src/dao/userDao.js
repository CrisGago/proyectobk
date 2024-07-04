import { isValidPassword } from "../utils/cryptoUtil.js";
import userModel from "../models/userModel.js";




export default class UserDao {
    async getAllUsers() {
        try {
            const users = await userModel.find({}).populate('cart').populate('cart.products.product');
            return users
        } catch (error) {
            throw error
        }
    }

    async getUserByID(uid) {
        try {
            const result = await userModel.findOne({ _id: uid });

            if (!result) throw new Error(`El Producto ${uid} no exste`);
            return result;
        } catch (error) {
            throw error;
        }
    };


    async register(user) {
        try {
            const result = await userModel.create(user);
            return result;

        } catch (error) {
            throw error;
        }
    };
    async getByEmail(email) {
        try{
            const user = await userModel.findOne({ email });
            return user;
        }catch(error) {
            throw error;
        }
    }

};