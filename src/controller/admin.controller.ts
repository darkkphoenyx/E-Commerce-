import { NextFunction, Request, Response } from 'express'
import * as authService from '../service/auth.service'
import { RequestWithUserObject } from '../types'
import { loginBodySchema } from '../validators/auth.validator'

//Login user
export const adminLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = loginBodySchema.parse(req.body)

        const { accessToken, refreshToken } = await authService.adminLogin(
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

//GET user by id - admin access
export const getById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        console.log()
        const response = await authService.getById(Number(req.params.id))
        console.log(response)
        res.json(response)
    } catch (err) {
        next(err)
    }
}

//GET all data - admin access
export const getAllData = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await authService.getAllData()
        res.json(response)
    } catch (err) {
        next(err)
    }
}

//DELETE by id - admin access
export const deleteById = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const response = await authService.deleteById(Number(req.params.id))
        res.json(response)
    }
    catch(err)
    {
        next(err)
    }
}
