import sinon from 'sinon';
import DatabaseConnectionMock from "./test-doubles/DatabaseConnectionMock";
import AddOrderTask, {AddOrderData} from '../../../src/service-layer/tasks/AddOrderTask';
import Order from "../../../src/domain-layer/entities/Order";
import expect from "expect";

describe('AddOrderTask tests', () => {
  let sandbox: sinon.SinonSandbox;
  let databaseConnectionMock: DatabaseConnectionMock;

  const orderData: AddOrderData = {idOrder:1,clientName:
    "pigy",pizzaName:"sarten",size:"mediana",ingredients:"peperoni,panchoas,tocino",price:150.0,soda:"Cocola"} 
    const expectedOrder = new Order(orderData.idOrder, orderData.clientName, orderData.pizzaName,orderData.size,orderData.ingredients,orderData.price,orderData.soda);

  before(() => {
    sandbox = sinon.createSandbox();
  });

  beforeEach(() => {
    databaseConnectionMock = new DatabaseConnectionMock(sandbox);
  })

  afterEach(() => {
    sandbox.restore();
  });

  it('should add an order to the database', async () => {
    databaseConnectionMock.withSaveReturningEntity(expectedOrder);

    const task = new AddOrderTask(orderData);
    const order = await task.execute();

    expect(order).toEqual(expectedOrder);
    databaseConnectionMock.expectGotRepositoryOf(Order);
    databaseConnectionMock.expectSaveCalledOnceWith(orderData);
  });
});
