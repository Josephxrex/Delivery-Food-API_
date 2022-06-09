import { SinonSandbox, SinonStub, SinonStubbedInstance } from "sinon";
import * as getOrderListTaskModule from "../../../../src/service-layer/tasks/GetOrderListTaks";
import Order from "../../../../src/domain-layer/entities/Order";
import expect from "expect";

export default class GetOrderListTaskMock {
  private readonly instanceStub: SinonStubbedInstance<getOrderListTaskModule.default>;

  private readonly constructorStub: SinonStub;

  public constructor(sandbox: SinonSandbox) {
    this.instanceStub = sandbox.createStubInstance(getOrderListTaskModule.default);
    this.constructorStub = sandbox.stub(getOrderListTaskModule, 'default');
    this.constructorStub.returns(this.instanceStub);
  }

  public withExecuteReturning(orders: Order[]): void {
    this.instanceStub.execute.returns(Promise.resolve(orders));
  }

  public withExecuteThrowingError(message: string): void {
    this.instanceStub.execute.throws(new Error(message));
  }

  public expectExecuteWasCalledOnce(): void {
    expect(this.instanceStub.execute.calledOnce).toBe(true);
  }
}
