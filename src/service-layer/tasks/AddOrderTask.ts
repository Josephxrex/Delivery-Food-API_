import Order from '../../domain-layer/entities/Order';
import DatabaseConnection from '../../persistance-layer/DatabaseConnection'
import IAsyncTask from './IAsyncTask';

export type AddOrderData = {
  idOrder: number,
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
