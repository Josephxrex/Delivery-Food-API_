import request from 'supertest'
import  expect from 'expect';
import sinon from 'sinon';
import app from '../src/app';
import Order from '../src/domain-layer/entities/Order';
import GetOrderListTaskMock from './test-doubles/GetOrderListTaskMock';
import DeleteOrderTaskMock from './test-doubles/DeleteOrderTaskMock';
import UpdateOrderTaskMock from './test-doubles/UpdateOrderTaskMock';
import {updatedOrderData} from "../src/service-layer/tasks/UpdateOrderTask";
import FindOrderTaskMock from './test-doubles/FindOrderTaskMock';
import AddOrderTaskMock from './test-doubles/AddOrderTaskMock';



describe('App Test',() => {
  let sandbox: sinon.SinonSandbox;

  before(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

    context('GetOrderList list endpoint tests', () => {
      
        
        let getOrderListTaskMock:  GetOrderListTaskMock;
    
        const OrdersList: Order[] = [
          new Order (1,"pigy","sarten","mediana","peperoni,anchoas,tocino",150.0,"Cocola"),
          new Order (2,"pigy","sarten","mediana","peperoni,anchoas,tocino",150.0,"Cocole"),
          new Order (3,"pigy","sarten","mediana","peperoni,anchoas,tocino",150.0,"Cocoli")
        ];
        
       beforeEach(() => {
      getOrderListTaskMock = new GetOrderListTaskMock(sandbox);
      });

      
      it('should respond 200 OK and respond with a list of Orders', async () => {
            getOrderListTaskMock.withExecuteReturning(OrdersList);
    
          const response = await request(app)
            .get('/orders')
            .expect(200);
    
          expect(response.body).toEqual(OrdersList);
          getOrderListTaskMock.expectExecuteWasCalledOnce();
        });
    
        it('should handle unknown errors and respond with 500 Internal Server Error', async () => {
         getOrderListTaskMock.withExecuteThrowingError('iuuuughhhhhhhhh.. says pigy');
          await request(app)
            .get('/orders')
            .expect(500);
            getOrderListTaskMock.expectExecuteWasCalledOnce();
        });

      });
    context('Update Order endpoint tests', () => {
      let updateOrderTaskMock: UpdateOrderTaskMock;

      const OrderData: updatedOrderData = {idOrder:1,clientName:
      "pigy",pizzaName:"sarten",size:"mediana",ingredients:"peperoni,panchoas,tocino",price:150.0,soda:"Cocola"} 
      const order = new Order(OrderData.idOrder, OrderData.clientName, OrderData.pizzaName,OrderData.size,OrderData.ingredients,OrderData.price,OrderData.soda);
      beforeEach(() => {
        updateOrderTaskMock = new UpdateOrderTaskMock(sandbox);
      });
  
      it('should respond 200 OK with an Order', async () => {
        updateOrderTaskMock.withExecuteReturning(order);
  
        const response = await request(app)
          .put('/orders')
          .set('Content-Type', 'application/json')
          .send(OrderData)
          .expect(200);
  
        expect(response.body).toEqual(order);
        updateOrderTaskMock.expectExecuteWasCalledOnceWithOrderData(OrderData);
      });
  
      it('should respond 404 NotFound if Order does not exist', async () => {
        updateOrderTaskMock.withExecuteThrowingNotFoundError();
  
        await request(app)
          .put('/orders')
          .set('Content-Type', 'application/json')
          .send(OrderData)
          .expect(404);
  
        updateOrderTaskMock.expectExecuteWasCalledOnceWithOrderData(OrderData);
      });
  
      it('should handle unknown errors and respond 500 Internal Server Error', async () => {
        updateOrderTaskMock.withExecuteThrowingError('You shall not pass!');
  
        await request(app)
          .put('/orders')
          .set('Content-Type', 'application/json')
          .send(OrderData)
          .expect(500);
  
        updateOrderTaskMock.expectExecuteWasCalledOnceWithOrderData(OrderData);
      });
      }); 
    context('Delete Order endpoint tests', () => {
 
      let deleteOrderTaskMock:  DeleteOrderTaskMock;
      
     beforeEach(() => {
       deleteOrderTaskMock = new DeleteOrderTaskMock(sandbox);
    });

    const idOrder = 1

    it('should respond 200 OK and respond with a list of Orders', async () => {
          deleteOrderTaskMock.withExecuteReturning();
          const response = await request(app)
            .delete(`/orders/${idOrder}`)
            .expect(200);
        
        deleteOrderTaskMock.expectExecuteWasCalledOnce();
      });
  
      it('should handle unknown errors and respond with 500 Internal Server Error', async () => {

       deleteOrderTaskMock.withExecuteThrowingError('iuuuughhhhhhhhh.. says pigy');
        await request(app)
         .delete(`/orders/${idOrder}`)
          .expect(500);
          deleteOrderTaskMock.expectExecuteWasCalledOnce();
      });
      });
    context('Add Order endpoint tests', () => {
        let addOrderTaskMock: AddOrderTaskMock;
  
        const OrderData: updatedOrderData = {idOrder:1,clientName:
          "pigy",pizzaName:"sarten",size:"mediana",ingredients:"peperoni,panchoas,tocino",price:150.0,soda:"Cocola"} 
          const order = new Order(OrderData.idOrder, OrderData.clientName, OrderData.pizzaName,OrderData.size,OrderData.ingredients,OrderData.price,OrderData.soda);
  
      beforeEach(() => {
        addOrderTaskMock = new AddOrderTaskMock(sandbox);
      });
  
      it('should respond 200 OK with a newly created order', async () => {
        addOrderTaskMock.withExecuteReturning(order);
  
        const response = await request(app)
          .post('/orders')
          .set('Content-Type', 'application/json')
          .send(OrderData)
          .expect(200);
  
        expect(response.body).toEqual(order);
        addOrderTaskMock.expectExecuteWasCalledOnceWithOrderData(OrderData);
      });
  
      it('should handle unknown errors and respond with 500 Internal Server Error', async () => {
        addOrderTaskMock.withExecuteThrowingError('A new order was not added');
  
        await request(app)
          .post('/orders')
          .set('Content-Type', 'application/json')
          .send(OrderData)
          .expect(500);
  
        addOrderTaskMock.expectExecuteWasCalledOnceWithOrderData(OrderData);
      }); 
    
    context('Find Order endpoint tests', () => {
        
        let findOrderTaskMock: FindOrderTaskMock;
        
        const orderId = 1;
        const order = new Order(orderId, 'Cocho','Queso','Mediana','Caca',5,'spuerk')

        beforeEach(() => {
          findOrderTaskMock = new FindOrderTaskMock(sandbox);
        });

        it('should respond 200 OK with a car', async () => {
          findOrderTaskMock.withExecuteReturning(order);

          const response = await request(app)
            .get(`/orders/${orderId}`)
            .expect(200)

            expect(response.body).toEqual(order);
            findOrderTaskMock.expectExecuteWasCalledOnceForOrder(orderId);
        });

        it('should respond 404 NotFound if order does not exist', async () => {
          findOrderTaskMock.withExecuteThrowingNotFoundError();
    
          await request(app)
            .get(`/orders/${orderId}`)
            .expect(404);
    
          findOrderTaskMock.expectExecuteWasCalledOnceForOrder(orderId);
        });
    
        it('should handle unknown errors and respond 500 Internal Server Error', async () => {
          findOrderTaskMock.withExecuteThrowingError('You shall not pass!');
    
          await request(app)
            .get(`/orders/${orderId}`)
            .expect(500);
    
          findOrderTaskMock.expectExecuteWasCalledOnceForOrder(orderId);
        });

      });
  
    });
    