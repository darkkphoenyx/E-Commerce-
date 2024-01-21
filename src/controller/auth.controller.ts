import { NextFunction, Request, Response } from 'express'
import { loginBodySchema, signupBodySchema } from '../validators/user.validator'
import * as authService from '../service/auth.service'
import { RequestWithUserObject } from '../types'

//Register new user
export const signup = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const createdUser = await authService.signup(
            signupBodySchema.parse(req.body)
        )
        res.status(201).json(createdUser)
    } catch (err) {
        next(err)
    }
}

//Login user
export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = loginBodySchema.parse(req.body)

        const { accessToken, refreshToken } = await authService.login(
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


//Refresh access token
export const refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { refreshToken } = req.cookies
    try {
        const token = await authService.refresh(refreshToken)
        res.json({ accessToken: token })
    } catch (error) {
        next(error)
    }
}

//UPDATE by id
export const updateData = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await authService.updateData(req.params.id, req.body)
        res.json(response)
    } catch (error) {
        next(error)
    }
}