import { Entity, PrimaryGeneratedColumn, Column, IntegerType } from "typeorm"

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    quantity: number

    @Column()
    sku: string

    @Column()
    description: string

    @Column()
    store: string

}
