import prisma from '../utils/prisma'
import * as jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { loginBodySchema, signupBodySchema } from '../validators/user.validator'
import { number, string, z } from 'zod'
import Boom from '@hapi/boom'
import {
    createAccessToken,
    createRefreshToken,
    verifyRefreshToken,
} from '../utils/token.util'

//signup
export const signup = async (user: z.infer<typeof signupBodySchema>) => {
    const { email, password, phone_number } = user
    try {
        return await prisma.user.create({
            data: {
                email,
                password: await bcrypt.hash(password, 10),
                phone_number,
            },
            select: {
                id: true,
                email: true,
                phone_number: true,
                is_admin: true,
            },
        })
    } catch (e: any) {
        if (
            e.code === 'P2002' &&
            e.meta?.target &&
            e.meta?.target[0] === 'email'
        ) {
            throw Boom.conflict('User with this email already exists')
        } else {
            throw e
        }
    }
}

//GET user own data - user only
export const getById = async (id: number) => {
    try {
        // const result = await prisma.user.findFirstOrThrow({
        //     where: {
        //         id: Number(id),
        //     },
        //     include: {
        //         addresses: true,
        //     },
        // })

        //writing a raw sql query instead of include
        const result = await prisma.$queryRaw`
            select * from "User" u join "Address" a on a.user_id = u.id`

        return result
        // if (result.length > 0) {
        //     console.log('Data found')
        //     return result
        // } else {
        //     console.log('Data not found')
        //     return 'Data not found'
        //     // how to pass the JSON instead??
        // }
    } catch (err) {
        console.error('Error retrieving data:', err)
        throw err // You might want to handle or log the error appropriately
    }
}

//GET all data - admin only
export const getAllData = async () => {
    try{
    const result = await prisma.user.findMany({
        include:{addresses:true}  //to get data from address table as well
    }
    )
    
    if (result.length > 0) {
        console.log('Data found')
        return result
    } else {
        console.log('Data not found')
        return 'Data not found'
        // how to pass the JSON instead??
    }
}
catch(err)
{
    console.error("error while retriveing data")
    throw(err)
}
}

//login
export async function login(email: string, password: string) {
    //why not passing is_Admin
    const user = await prisma.user.findFirst({ where: { email } })
    if (!user) {
        throw Boom.badRequest('Username or password is incorrect.')
    } else {
        console.log(user.password)
    }
    console.log(user.password)

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
        throw Boom.badRequest('Username or password is incorrect.')
    }

    const accessToken = createAccessToken(user.id, user.is_admin)

    //accessToken = expires after certain period of time --- every request authentication

    const refreshToken = createRefreshToken(user.id, user.is_admin)
    //refreshToke = http only --- more secured

    return { accessToken, refreshToken }
}

export async function refresh(refreshToken: string) {
    try {
        const decodedToken: any = verifyRefreshToken(refreshToken)
        return createAccessToken(decodedToken.userId, decodedToken.isAdmin)
    } catch (error) {
        throw Boom.unauthorized('User is not logged in')
    }
}

//DELETE user
export async function deleteUser(data: z.infer<typeof loginBodySchema>) {
    const { email, password } = data
    try {
        const user = await prisma.user.findFirst({
            where: { email: email },
            include:{
                addresses:true
            }
        })
        console.log('here is delete')
        if (!user) {
            throw Boom.badRequest('Username not found.')
        } else {
            console.log(user.password)
        }
        console.log(user.password)

        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch) {
            throw Boom.badRequest('Username or password is incorrect.')
        }

        return await prisma.user.delete({
            where: {
                email: email,
            },
        })
    } catch (err) {
        throw err
    }
}
