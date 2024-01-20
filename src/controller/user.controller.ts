import { NextFunction, Request, Response } from 'express'
import { loginBodySchema, signupBodySchema } from '../validators/user.validator'
import * as AuthService from '../service/user.service'

//Register new user
export const signupUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const createdUser = await AuthService.signup(
            signupBodySchema.parse(req.body)
        )
        res.status(201).json(createdUser)
    } catch (err) {
        next(err)
    }
}

//Login user
export const loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = loginBodySchema.parse(req.body)

        const { accessToken, refreshToken } = await AuthService.login(
            email,
            password
        )
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            path: '/api/auth/refresh',
        }).json({ accessToken })
    } catch (error) {
        next(error)
    }
}

// //Delete user
export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const request = loginBodySchema.parse(req.body)
        const response = await AuthService.deleteUser(request)
        res.json(response)
    } catch (err) {
        next(err)
    }
}

//Refresh access token
export const refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { refreshToken } = req.cookies
    try {
        const token = await AuthService.refresh(refreshToken)
        res.json({ accessToken: token })
    } catch (error) {
        next(error)
    }
}
