import request from 'supertest'
import  expect from 'expect';
import sinon from 'sinon';
import app from '../src/app';
import Order from '../src/domain-layer/entities/Order';
import GetOrderListTaskMock from './test-doubles/GetOrderListTaskMock';
//import DeleteOrderTaskMock from './test-doubles/DeleteOrderTaskMock';
import UpdateOrderTaskMock from './test-doubles/UpdateOrderTaskMock';
import {updatedOrderData} from "../src/service-layer/tasks/UpdateOrderTask";



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
  
      it('should respond 200 OK with a car', async () => {
        updateOrderTaskMock.withExecuteReturning(order);
  
        const response = await request(app)
          .put('/orders')
          .set('Content-Type', 'application/json')
          .send(OrderData)
          .expect(200);
  
        expect(response.body).toEqual(order);
        updateOrderTaskMock.expectExecuteWasCalledOnceWithCarData(OrderData);
      });
  
      it('should respond 404 NotFound if car does not exist', async () => {
        updateOrderTaskMock.withExecuteThrowingNotFoundError();
  
        await request(app)
          .put('/orders')
          .set('Content-Type', 'application/json')
          .send(OrderData)
          .expect(404);
  
        updateOrderTaskMock.expectExecuteWasCalledOnceWithCarData(OrderData);
      });
  
      it('should handle unknown errors and respond 500 Internal Server Error', async () => {
        updateOrderTaskMock.withExecuteThrowingError('You shall not pass!');
  
        await request(app)
          .put('/orders')
          .set('Content-Type', 'application/json')
          .send(OrderData)
          .expect(500);
  
        updateOrderTaskMock.expectExecuteWasCalledOnceWithCarData(OrderData);
      });
      }); 
    context('Delete Order endpoint tests', () => {
    
      });
    context('Add Order endpoint tests', () => {
      });
    context('Find car endpoint tests', () => {
      });
  
    });
    