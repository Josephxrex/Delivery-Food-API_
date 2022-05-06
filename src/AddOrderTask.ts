import Order from '../../domain-layer/entities/Order';
import DatabaseConnection from '../../persistence-layer/DatabaseConnection';
import IAsyncTask from './service-layer/tasks/IAsyncTask';

export type AddOrderData = {
  idOrder: string,
  clientName: string,
  pizzaName: string,
  size: string,
  ingredients: string,
  price: number,
  soda: string
  //hora?
};

export default class AddOrderTask implements IAsyncTask<Order> {
  private addOrderData: AddOrderData;

  public constructor(addOrderData: AddOrderData) {
    this.addOrderData = addOrderData;
  }

  public async execute(): Promise<Order> {
    const databaseConnection = await DatabaseConnection.getInstance();
    const orderRepository = databaseConnection.getRepository(Order);

    const order = orderRepository.save(this.addOrderData);

    return order;
  }
}
