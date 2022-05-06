import Order from '../../domain-layer/entities/Order';
import DatabaseConnection from '../../persistance-layer/DatabaseConnection'
import IAsyncTask from './IAsyncTask';

export default class GetOrderListTask implements IAsyncTask<Order[]> {
  public async execute(): Promise<Order[]> {
    const databaseConnection = await DatabaseConnection.getInstance();
    const orderRepository = databaseConnection.getRepository(Order);
    return orderRepository.find();
  }
}
