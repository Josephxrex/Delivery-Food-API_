import sinon from "sinon";
import DatabaseConnectionMock from "./test-doubles/DatabaseConnectionMock";
import Order from "../../../src/domain-layer/entities/Order";
import GetOrderListTask from "../../../src/service-layer/tasks/GetOrderListTaks";
import expect from "expect";

describe('GetCarListTask tests', () => {
  let sandbox: sinon.SinonSandbox;
  let databaseConnectionMock: DatabaseConnectionMock;

  const expectedOrdersList: Order[] = [
    new Order(1, 'ElPepe', 'Sarten', 'Mediano', 'peperoni,salami', 300, 'Fanta'),
    new Order(2, 'ElPepe', 'Sarten', 'Grande', 'peperoni,salami', 350, 'Fanta'),
    new Order(3, 'ElPepe', 'Sarten', 'Chico', 'peperoni,salami', 280, 'Fanta'),
  ];

  before(() => {
    sandbox = sinon.createSandbox();
  });

  beforeEach(() => {
    databaseConnectionMock = new DatabaseConnectionMock(sandbox);
  })

  afterEach(() => {
    sandbox.restore();
  });

  it('should return a list of orders', async () => {
    databaseConnectionMock.withFindReturningListOfEntities(expectedOrdersList);

    const task = new GetOrderListTask();
    const ordersList = await task.execute();

    expect(ordersList).toEqual(expectedOrdersList);
    databaseConnectionMock.expectGotRepositoryOf(Order);
    databaseConnectionMock.expectFindCalledOnce();
  });
});
