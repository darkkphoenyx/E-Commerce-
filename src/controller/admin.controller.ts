import { NextFunction, Request, Response } from 'express'
import * as userService from '../service/auth.service'
import { RequestWithUserObject } from '../types'

//GET user by id - admin access
export const getById = async (
    id: number,
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

//GET all data - admin access
export const getAllData = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await userService.getAllData()
        res.json(response)
    } catch (err) {
        next(err)
    }
}

//DELETE by id - admin access
export const deleteById = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const response = await userService.deleteById(Number(req.params.id))
        res.json(response)
    }
    catch(err)
    {
        next(err)
    }
}
