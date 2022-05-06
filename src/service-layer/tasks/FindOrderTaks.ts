import Order from "../../domain-layer/entities/Order";
import DatabaseConnection from '../../persistence-layer/DatabaseConnection';
import IAsyncTask from "./IAsyncTask";

export default class FindOrderTask implements IAsyncTask<Order>{

    private orderId: number;

    public constructor(orderId: number){
        this.orderId = orderId
    }

    public async execute(): Promise<Order> {
        const databaseConnection = await DatabaseConnection.getInstance();
        const orderRepository = databaseConnection.getRepository(Order);

        const order = await orderRepository.findOneBy({ id: this.orderId });

        if (!order) {
          throw new Error('Car not found.');
        }
    
        return order;

    }
}