import { Router, response } from 'express'
import { validateByBody } from '../validators/validate'
import {
    loginBodySchema,
    loginSchema,
    signupBodySchema,
    signupSchema,
} from '../validators/user.validator'
import * as userController from '../controller/user.controller'
import {
    authenticateToken,
    isAdmin,
} from '../middlewares/authentication.middleware'

const router = Router()

//login user
router.post('/login', validateByBody(loginSchema), userController.loginUser)

//Register user
router.post('/signup', validateByBody(signupSchema), userController.signupUser)

//Refresh access token
router.post('/refresh', userController.refreshToken)

//Logout user
router.post('/logout', () => {
    console.log(
        'this method should store any session info if stored, or remove cookie from the header'
    )
})

//delete user only
router.delete('/delete', authenticateToken, userController.deleteUser)

//delete all data from admin
router.delete('/admin/delete',authenticateToken,isAdmin,userController.deleteUser)

//Forgot password
router.post('/forgot-password', () => {
    console.log(
        'this method should send an email using sendgrid to the user with forgot password link'
    )
})

//get user own details
router.get('/:id', authenticateToken, userController.getById)

//GET all data -- 
router.get('/allData',authenticateToken,isAdmin, userController.getAllData)

export default router

//how to add date in every request and response ??
