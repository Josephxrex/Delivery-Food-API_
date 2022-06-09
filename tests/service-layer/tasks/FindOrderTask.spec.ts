import sinon from "sinon";
import DatabaseConnectionMock from "./test-doubles/DatabaseConnectionMock";
import Order from "../../../src/domain-layer/entities/Order";
import FindOrderTask from "../../../src/service-layer/tasks/FindOrderTaks";
import expect from "expect";

describe('FindOrderTask tests', () => {
  let sandbox: sinon.SinonSandbox;
  let databaseConnectionMock: DatabaseConnectionMock;

  const orderId = 1;
  const expectedOrder = new Order(orderId, 'ElPepe', 'Sarten', 'Mediano', 'peperoni,salami', 300, 'Fanta');

  before(() => {
    sandbox = sinon.createSandbox();
  });

  beforeEach(() => {
    databaseConnectionMock = new DatabaseConnectionMock(sandbox);
  })

  afterEach(() => {
    sandbox.restore();
  });

  it('should find a order', async () => {
    databaseConnectionMock.withFindOneByReturningEntity(expectedOrder);

    const task = new FindOrderTask(orderId);
    const order = await task.execute();

    expect(order).toEqual(expectedOrder);
    databaseConnectionMock.expectGotRepositoryOf(Order);
    databaseConnectionMock.expectFindOneByCalledOnceWith({ idOrder: orderId });
  });

  it('should throw "Order not found." if order doesn\'t exist', async () => {
    databaseConnectionMock.withFindOneByReturningEntity(null);

    const task = new FindOrderTask(orderId);
    await expect(task.execute()).rejects.toThrow('Car not found.');

    databaseConnectionMock.expectGotRepositoryOf(Order);
    databaseConnectionMock.expectFindOneByCalledOnceWith({ idOrder: orderId });
  });
});
