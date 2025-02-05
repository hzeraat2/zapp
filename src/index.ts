import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
import { Product } from "./entity/Product"
import * as cors from "cors";

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(bodyParser.json())
    app.use(cors())

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })

    // setup express app here
    // ...

    // start express server
    app.listen(3000)

    // insert new Products for test
    await AppDataSource.manager.save(
        AppDataSource.manager.create(Product, {
            quantity: 1,
            sku: "sku",
            description: "description",
            store: "GB"
        })
    )

    await AppDataSource.manager.save(
        AppDataSource.manager.create(Product, {
            quantity: 2,
            sku: "sku2",
            description: "description2",
            store: "GB"
        })
    )

    console.log("Express server has started on port 3000. Open http://localhost:3000/Products to see results")

}).catch(error => console.log(error))
