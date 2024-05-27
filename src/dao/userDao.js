import userModel from "../models/userModel.js";

export default class UserDao {
    async getAll(){
        return await UserDao.find();
    }
    
    async getByID(uid) {
        const result = await UserDao.findeOne({_id : uid});

        if (!result) throw new Error (`El Producto ${uid} no exste`);
        
        return result;
    }

    async crearte(User) {
        const result = await UserDao.crearte(User);
        return result;
    }
};