import IAsyncTask from "./IAsyncTask";
import Order from "../../domain-layer/entities/Order";
import DatabaseConnection from '../../persistance-layer/DatabaseConnection'

export default class DeleteCarTask implements IAsyncTask<void> {
    private orderId: number;
  
  public constructor(orderId: number) {
    this.orderId = orderId;
  }

  public async execute(): Promise<void> {
    const databaseConnection = await DatabaseConnection.getInstance();
    const orderRepository = databaseConnection.getRepository(Order);

    await orderRepository.delete(this.orderId);
  }

}