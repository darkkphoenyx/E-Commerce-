import { Router } from 'express'
import { validateByBody } from '../validators/validate'
import {
    loginBodySchema,
    loginSchema,
    signupBodySchema,
    signupSchema,
} from '../validators/user.validator'
import * as AuthController from '../controller/user.controller'
import { authenticateToken } from '../middlewares/authentication.middleware'

const router = Router()

//login user
router.post('/login', validateByBody(loginSchema), AuthController.loginUser)

//Register user
router.post('/signup', validateByBody(signupSchema), AuthController.signupUser)

//Refresh access token
router.post('/refresh', AuthController.refreshToken)

//Logout user
router.post('/logout', () => {
    console.log(
        'this method should store any session info if stored, or remove cookie from the header'
    )
})

//delete user not working
router.delete('/delete', authenticateToken, AuthController.deleteUser)

//Forgot password
router.post('/forgot-password', () => {
    console.log(
        'this method should send an email using sendgrid to the user with forgot password link'
    )
})

export default router

//how to add date in every request and response ??
