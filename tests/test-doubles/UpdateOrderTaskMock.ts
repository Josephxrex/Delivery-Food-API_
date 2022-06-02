import { SinonSandbox, SinonStub, SinonStubbedInstance } from "sinon";
import * as updateOrderTaskModule from "../../src/service-layer/tasks/UpdateOrderTask";
import Order from "../../src/domain-layer/entities/Order";
import expect from "expect";
import {updatedOrderData} from "../../src/service-layer/tasks/UpdateOrderTask";

export default class UpdateCarTaskMock {
  private readonly instanceStub: SinonStubbedInstance<updateOrderTaskModule.default>;

  private readonly constructorStub: SinonStub;

  public constructor(sandbox: SinonSandbox) {
    this.instanceStub = sandbox.createStubInstance(updateOrderTaskModule.default);
    this.constructorStub = sandbox.stub(updateOrderTaskModule, 'default');
    this.constructorStub.returns(this.instanceStub);
  }

  public withExecuteReturning(Order: Order): void {
    this.instanceStub.execute.returns(Promise.resolve(Order));
  }

  public withExecuteThrowingNotFoundError(): void {
    this.instanceStub.execute.throws(new Error('Order not found.'));
  }

  public withExecuteThrowingError(message: string): void {
    this.instanceStub.execute.throws(new Error(message));
  }

  public expectExecuteWasCalledOnceWithCarData(OrderData:updatedOrderData): void {
    expect(this.constructorStub.calledOnce).toBe(true);
    const call = this.constructorStub.getCall(0);
    expect(call.args[0]).toEqual(OrderData);
    expect(this.instanceStub.execute.calledOnce).toBe(true);
  }
}