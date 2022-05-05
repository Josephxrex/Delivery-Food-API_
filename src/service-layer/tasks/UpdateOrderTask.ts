import Order from "../../domain-layer/enetities/Order";
import DatabaseConnection from "../../persistence-layer/DatabaseConnection";
import FindOrderTask from "./FindCarTask";
import IAsyncTask from "./IAsyncTask";

export type updatedOrderData = {
    idOrder: number;
    clientName: string;
    pizzaName:string;
    size:string;
    ingredients:string;
    price:number;
    soda:string;
}

export default class UpdateOrderTask implements IAsyncTask<Order>{
    private updatedOrderData: updatedOrderData;

    public constructor (OrderData: updatedOrderData){
        this.updatedOrderData = OrderData;
    }

    public async execute(): Promise<Order>{

        const getOrderTask = new FindOrderTask(this.updatedOrderData.idOrder)

        const order = await getOrderTask.execute();

        order.clientName = this.updatedOrderData.clientName;
        order.pizzaName = this.updatedOrderData.pizzaName;
        order.size = this.updatedOrderData.size;
        order.ingredients = this.updatedOrderData.ingredients;
        order.price = this.updatedOrderData.price;
        order.soda = this.updatedOrderData.soda;

        const databaseConnection = await DatabaseConnection.getInstance();
        const orderRepository = databaseConnection.getRepository(Order);

        orderRepository.save(order);

        return order;
    }
}