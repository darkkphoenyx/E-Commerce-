import { z } from 'zod'

//signup
export const signupBodySchema = z.object({
    email: z.string({
        required_error: 'Email is required',
    }),
    password: z.string({
        required_error: 'Password is required',
    }),
    phone_number: z.string({
        required_error: 'Phone_number is required',
    }),
    is_admin: z.boolean({
        required_error: 'User is Admin or not',
    }),
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
