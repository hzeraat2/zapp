import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Product } from "../entity/Product"

export class ProductController {

    private productRepository = AppDataSource.getRepository(Product)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.productRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const product = await this.productRepository.findOne({
            where: { id }
        })

        if (!product) {
            return "unregistered product"
        }
        return product
    }

    async save(request: Request, response: Response, next: NextFunction) {

        if (!request.body) response.status(404).send("You need to provide a body!") // TODO

        const { quantity, sku, description, store } = request.body;

        console.log(request.body);
        request.body.forEach(csvRow => {
            console.log(csvRow);
            const product = Object.assign(new Product(), {
                quantity: csvRow.quantity,
                sku: csvRow.sku,
                description: csvRow.description,
                store: csvRow.store,
            })
            return this.productRepository.save(product)
        });



    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let productToRemove = await this.productRepository.findOneBy({ id })

        if (!productToRemove) {
            return "this product not exist"
        }

        await this.productRepository.remove(productToRemove)

        return "product has been removed"
    }

}