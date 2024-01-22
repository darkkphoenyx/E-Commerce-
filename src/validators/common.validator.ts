import { z } from "zod";

export const userAddressValidator =  z
.object({
    id: z.number().optional(),
    address_line1: z.string({
        required_error: 'address_line1 1 is required',
    }),
    address_line2: z.string().optional(),
    city: z.string({ required_error: 'city is required' }),
    province: z.string({ required_error: 'province is required' }),
})
.array()
.optional()
