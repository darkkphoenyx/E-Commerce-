import { NextFunction, Request, Response } from 'express'
import { loginBodySchema, signupBodySchema } from '../validators/user.validator'
import * as userService from '../service/user.service'
import { RequestWithUserObject } from '../types'
import { serverUnavailable } from '@hapi/boom'

//Register new user
export const signupUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const createdUser = await userService.signup(
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

        const { accessToken, refreshToken } = await userService.login(
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

//GET user own data - user only 
export const getById = async (
    req: RequestWithUserObject,
    res: Response,
    next: NextFunction
) => {
    try {
        console.log()
        const response = await userService.getById(req.user.userId)
        console.log(response)
        res.json(response)
    } catch (err) {
        next(err)
    }
}

//GET all data - admin only
export const getAllData= async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try{
        const response = await userService.getAllData()
        res.json(response)
    }
    catch(err){
        next(err)
    }
}

// //Delete user
export const deleteUser = async (
    req: RequestWithUserObject,
    res: Response,
    next: NextFunction
) => {
    try {
        const request = loginBodySchema.parse(req.body)
        const response = await userService.deleteUser(request)
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
        const token = await userService.refresh(refreshToken)
        res.json({ accessToken: token })
    } catch (error) {
        next(error)
    }
}
