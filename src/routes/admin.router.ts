import { Router } from 'express'
import { validateByBody } from '../validators/validate'
import { loginSchema, signupSchema } from '../validators/auth.validator'
import * as adminController from '../controller/admin.controller'
import * as authController from '../controller/auth.controller'
import * as userController from '../controller/user.controller'
import {
    authenticateToken,
    isAdmin,
    isUser,
} from '../middlewares/authentication.middleware'

const router = Router()

router.post('/login', validateByBody(loginSchema), adminController.adminLogin)
router.post('/signup', validateByBody(signupSchema), authController.signup)
//GET all data -- admin only
router.get('/allData', authenticateToken, isAdmin, adminController.getAllData)
//get data of particular user
router.get('/:id', authenticateToken, adminController.getById)
router.post('/refresh', authController.refreshToken)
router.post('/logout', () => {
    console.log(
        'this method should store any session info if stored, or remove cookie from the header'
    )
})
//admin can delete any data from the database
router.delete(
    '/delete/:id',
    authenticateToken,
    isAdmin,
    userController.deleteData
)
//Forgot password
router.post('/forgot-password', () => {
    console.log(
        'this method should send an email using sendgrid to the user with forgot password link'
    )
})

export default router

//how to add date in every request and response ??
