import { NextFunction, Request, Response } from 'express'
import * as userService from '../service/auth.service'
import { RequestWithUserObject } from '../types'
import { loginBodySchema } from '../validators/auth.validator'

//Login user
export const userLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = loginBodySchema.parse(req.body)

        const { accessToken, refreshToken } = await userService.userLogin(
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
export const retrieveById = async (
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

// //Delete user
// export const deleteData = async (
//     req: RequestWithUserObject,
//     res: Response,
//     next: NextFunction
// ) => {
//     try {
//         const request = loginBodySchema.parse(req.body)
//         const response = await userService.deleteUser(request)
//         res.json(response)
//     } catch (err) {
//         next(err)
//     }
// }

//DELETE user account
export const deleteUser = async(
    req: RequestWithUserObject, res: Response, next: NextFunction
)=>{
    try {
        const response = await userService.deleteUser(Number(req.user.userId))
        res.json(response)
    }
    catch(err){
        next(err)
    }
}

//UPDATE by id - admin only
export const updateData = async (
    req: RequestWithUserObject,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await userService.updateData(
            req.user.userId,
            req.body
        )
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}
