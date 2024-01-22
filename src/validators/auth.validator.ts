import { z } from 'zod'
import { userAddressValidator } from './common.validator'

//signup
export const signupBodySchema = z.object({
    email: z.string({
        required_error: 'Email is required',
    }),
    password: z.string({
        required_error: 'Password is required',
    }),
    is_admin: z.boolean().default(false),
    phone_number: z.optional(z.string())
})

export const signupSchema = z.object({
    body: signupBodySchema,
})

//login
export const loginBodySchema = z.object({
    email: z.string({
        required_error: 'Email is required',
    }),
    password: z.string({
        required_error: 'Password is required',
    }),
})

export const loginSchema = z.object({
    body: loginBodySchema,
})

export const updateUserBodySchema = z
    .object({
        email: z
            .string({
                required_error: 'Email is required',
            })
            .email('Should be a valid email address')
            .optional(),
        password: z
            .string({
                required_error: 'Password is required',
            })
            .optional(),
        // Sometimes you may want custom validators, like this in case
        phone_number: z.string().optional(),
        addresses: userAddressValidator,
        is_admin: z.boolean().optional()
    })
    .strict()


export const updateUserSchema = z.object({
    body: updateUserBodySchema
})

//checking id is number
export const updateById = z.object({
    params: z.object({
        id: z.string().refine((value) => !isNaN(Number(value)), {
            message: 'ID must be a number',
        }),
    }),
})
