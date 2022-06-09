import sinon from "sinon";
import DatabaseConnectionMock from "./test-doubles/DatabaseConnectionMock";
import DeleteOrderTask from "../../../src/service-layer/tasks/DeleteOrderTask";
import Order from "../../../src/domain-layer/entities/Order";

describe('DeleteOrderTask tests', () => {
  let sandbox: sinon.SinonSandbox;
  let databaseConnectionMock: DatabaseConnectionMock;

  const orderId = 1;

  before(() => {
    sandbox = sinon.createSandbox();
  });

  beforeEach(() => {
    databaseConnectionMock = new DatabaseConnectionMock(sandbox);
  })

  afterEach(() => {
    sandbox.restore();
  });

  it('should delete an order', async () => {
    databaseConnectionMock.withDeleteSucceeding();

    const task = new DeleteOrderTask(orderId);
    await task.execute();

    databaseConnectionMock.expectGotRepositoryOf(Order);
    databaseConnectionMock.expectDeleteCalledOnceWith(orderId);
  });
});
