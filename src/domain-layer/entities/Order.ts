import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export default class  Order {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true, zerofill: true })
    public idOrder: number;

    @Column({ type: 'varchar', length: 16, nullable: false })
    public clientName: string;

    @Column({ type: 'varchar', length: 16, nullable: false })
    public pizzaName: string;
     
    @Column({ type: 'varchar', length: 16, nullable: false })
    public size: string;

    @Column({ type: 'varchar', length:200 , nullable: false })
    public ingredients: string;

    @Column({ type: 'int'})
    public price : number;

    @Column({ type: 'varchar', length: 16, nullable: false })
    public soda: string;


    
    public constructor(
        idOrder: number,
        clientName: string,
        pizzaName: string,
        size: string,
        ingredients: string,
        price: number,
        soda: string
      ) {
        this.idOrder = idOrder;
        this.clientName = clientName;
        this.pizzaName = pizzaName;
        this.size = size;
        this.ingredients = ingredients;
        this.price = price;
        this.soda = soda;
      }
    }
  


