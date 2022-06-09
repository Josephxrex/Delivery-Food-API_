import sinon from "sinon";
import DatabaseConnectionMock from "./test-doubles/DatabaseConnectionMock";
import Order from "../../../src/domain-layer/entities/Order";
import UpdateOrderTask, {updatedOrderData} from "../../../src/service-layer/tasks/UpdateOrderTask";
import FindOrderTaskMock from "../controllers/test-doubles/FindOrderTaskMock";
import expect from "expect";

describe('UpdateOrderTask tests', () => {
  let sandbox: sinon.SinonSandbox;
  let databaseConnectionMock: DatabaseConnectionMock;
  let findOrderTaskMock: FindOrderTaskMock;

  const orderData: updatedOrderData = { idOrder: 1, clientName: "pigy", pizzaName:"sarten", size:"mediana", ingredients: "peperoni,panchoas,tocino", price:150.0, soda:"Cocola" };
  const expectedOrder = new Order(orderData.idOrder, orderData.clientName, orderData.pizzaName, orderData.size, orderData.ingredients, orderData.price, orderData.soda);

  before( () => {
    sandbox = sinon.createSandbox();
  });

  beforeEach( () => {
    databaseConnectionMock = new DatabaseConnectionMock(sandbox);
    findOrderTaskMock = new FindOrderTaskMock(sandbox);
  });

  afterEach( () => {
    sandbox.restore();
  })

  it('should update an order', async () => {
    findOrderTaskMock.withExecuteReturning(expectedOrder);
    databaseConnectionMock.withSaveReturningEntity(expectedOrder);

    const task = new UpdateOrderTask(orderData);
    const order = await task.execute();

    expect(order).toEqual(expectedOrder);
  })

});