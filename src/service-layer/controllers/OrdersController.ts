import { Request, Response } from 'express';
import AddOrderTask, { AddOrderData } from '../tasks/AddOrderTask';
import DeleteOrderTask from '../tasks/DeleteOrderTask';
import FindOrderTask from '../tasks/FindOrderTaks';
import GetOrderListTask from '../tasks/GetOrderListTaks';
import UpdateOrderTask, { updatedOrderData } from '../tasks/UpdateOrderTask';
import BaseController from './BaseController';

export default class OrdersController extends BaseController {
  public constructor() {
    super('/orders');
  }

  protected configureRouter(): void {
    this.router.get('/', this.getOrdersList.bind(this));
    this.router.get('/:id', this.findOrder.bind(this));
    this.router.post('/', this.addOrder.bind(this));
    this.router.put('/', this.updateOrder.bind(this));
    this.router.delete('/:id', this.deleteOrder.bind(this));
  }

  private async getOrdersList(req: Request, res: Response): Promise<void> {
    try{
      const getOrderListTask = new GetOrderListTask();
  
      const ordersList = await getOrderListTask.execute();
  
      this.respond(res, 200, ordersList);
    } catch (e) {
      this.respond(res, 500);
    }
  }

  private async findOrder(req: Request, res: Response): Promise<void> {
    try {
      const orderId = parseInt(req.params.id);
      const getOrderListTask = new FindOrderTask(orderId);

      const order = await getOrderListTask.execute();

      this.respond(res, 200, order);
    } catch (e) {
      if ((<Error>e).message === 'Order not found.') {
        this.respond(res, 404);
      } else {
        this.respond(res, 500);
      }
    }
  }

  private async addOrder(req: Request, res: Response): Promise<void> {
    try{
      const orderData = <AddOrderData>req.body;
  
      const addOrderTask = new AddOrderTask(orderData);
  
      const order = await addOrderTask.execute();
  
      this.respond(res, 200, order);
    } catch (e){
      this.respond(res, 500);
    }
  }

  private async updateOrder(req: Request, res: Response): Promise<void> {
    try {
      const orderData = <updatedOrderData>req.body;

      const updateOrderTask = new UpdateOrderTask(orderData);

      const updatedOrder = await updateOrderTask.execute();

      this.respond(res, 200, updatedOrder);
    } catch (e) {
      if ((<Error>e).message === 'Order not found.') {
        this.respond(res, 404);
      } else {
        this.respond(res, 500);
      }
    }
  }

  private async deleteOrder(req: Request, res: Response): Promise<void> {
    try{
      const orderId = parseInt(req.params.id);
  
      const deleteOrderTask = new DeleteOrderTask(orderId);
  
      await deleteOrderTask.execute();
  
      this.respond(res, 200);
    } catch (e) {
      this.respond(res, 500);
    }
  }
}
