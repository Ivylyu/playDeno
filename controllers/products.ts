import { v4 } from 'https://deno.land/std/uuid/mod.ts'
import { Product } from '../types.ts'

export const products: Product[] = [
    {
        id: "1",
        name:"One",
        description: "Product 1",
        price: 1.2
    },
    {
        id: "2",
        name:"Two",
        description: "Product 2",
        price: 1.2
    },
    {
        id: "3",
        name:"Three",
        description: "Product 3",
        price: 1.3
    },
]

/**
 *  @desc Get all products
 *  @route GET /api/v1/products
 */
const getProducts = ({ response }: { response: any }) => {
    response.body = {
        success: true,
        data: products
    }
}

/**
 *  @desc Get single products
 *  @route GET /api/v1/products/:id
 */
const getProduct = ({ params, response }: { params: { id: string}, response: any }) => {
    const product: Product | undefined = products.find(p => p.id === params.id)

    if(product) {
        response.status = 200
        response.body = {
            success: true,
            data: product
        }
    } else {
        response.status = 404
        response.body = {
            success: false,
            msg: 'No product found'
        } 
    }
}

/**
 *  @desc Add products
 *  @route POST /api/v1/products
 */
const addProduct = async ({ request, response }: { request: any, response: any }) => {
    const body = await request.body()
    if(!request.hasBody) {
        response.status = 400
        response.body = {
            success: false,
            msg: 'No data'
        }
    } else {
        // have to write await here since this is a promise
        const product: any = await body.value
        product.id = v4.generate()
        products.push(product)
        response.status = 201
        response.body = {
            success: true,
            data: product
        }
    }
}

/**
 *  @desc Update products
 *  @route PUT /api/v1/products/:id
 */
const updateProduct = async ({ params, request,response }: { params: {id:string}, request:any, response: any }) => {
    const product: Product | undefined = products.find(p => p.id === params.id)

    if(product) {
        const body = await request.body()

        const updateData: { name?: string; description?: string; price?:number } = body.value

        products = products.map(p => p.id === params.id ? { ...p, ...updateData } : p)

        response.status = 200
        response.body = {
            success: true,
            data: products
    }
    } else {
        response.status = 404
        response.body = {
            success: false,
            msg: 'No product found'
        }
    }
}

/**
 *  @desc Delete products
 *  @route DELETE /api/v1/products/:id
 */
const deleteProduct = ({ response }: { response: any }) => {

}

export { getProducts, getProduct, addProduct, updateProduct, deleteProduct }