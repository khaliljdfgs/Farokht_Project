import UnAuthenticatedError from "../errors/unauthenticated.js";
import User from "../models/User.js";

const adminAuthorization = async (req, res, next) => {

    try {
        const user = await User.findOne( { _id : req.user.userId } )
        if (user.role !== 'admin') {
            throw new UnAuthenticatedError('Authorization Invalid!')
        }
        next()
    } catch (error) {
        throw new UnAuthenticatedError('Authorization Invalid!')
    }
    
}

export default adminAuthorization