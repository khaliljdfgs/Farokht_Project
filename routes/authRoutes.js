import express from 'express'
import { register, registerAdmin, login, updateUser, changePassword, getAllUsers} from '../controllers/authController.js'
import adminAuthorization from '../middleware/adminAuthorization.js'
import authenticateUser from '../middleware/auth.js'


const router = express.Router()
router.route('/register').post(register)
router.route('/registerAdmin').post(authenticateUser, adminAuthorization ,registerAdmin)
router.route('/login').post(login)
router.route('/updateUser').patch(authenticateUser, updateUser)
router.route('/changePassword').patch(authenticateUser, changePassword)
router.route('/getAllUsers').get(authenticateUser, adminAuthorization, getAllUsers)

export default router
