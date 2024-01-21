import { Router } from 'express'
import { validateByBody, validateByid } from '../validators/validate'
import { loginSchema, signupSchema, updateById } from '../validators/auth.validator'
import * as userController from '../controller/user.controller'
import * as authController from '../controller/auth.controller'
import {
    authenticateToken,
    isAdmin,
    isUser,
} from '../middlewares/authentication.middleware'

const router = Router()

router.post('/login', validateByBody(loginSchema), userController.userLogin)
router.post('/signup', validateByBody(signupSchema), authController.signup)
//get user own details
router.get('/:id', authenticateToken, isUser,userController.retrieveById)
router.post('/refresh', authController.refreshToken)
router.post('/logout', () => {
    console.log(
        'this method should store any session info if stored, or remove cookie from the header'
    )
})
//only user can delete own data
router.delete('/delete', authenticateToken, isUser, userController.deleteData)
router.post('/forgot-password', () => {
    console.log(
        'this method should send an email using sendgrid to the user with forgot password link'
    )
})

//update data
router.put(
    '/update/:id',
    validateByid(updateById),
    validateByBody(signupSchema),
    authenticateToken,
    authController.updateData
)
export default router

//how to add date in every request and response ??
