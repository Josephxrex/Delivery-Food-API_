
import { SinonSandbox, SinonStub, SinonStubbedInstance } from "sinon";
import * as addOrderTaskModule from "../../src/service-layer/tasks/AddOrderTask";
import Order from "../../src/domain-layer/entities/Order";
import expect from "expect";
import {AddOrderData} from "../../src/service-layer/tasks/AddOrderTask";

export default class AddOrderTaskMock {
  private readonly instanceStub: SinonStubbedInstance<addOrderTaskModule.default>;

  private readonly constructorStub: SinonStub;

  public constructor(sandbox: SinonSandbox) {
    this.instanceStub = sandbox.createStubInstance(addOrderTaskModule.default);
    this.constructorStub = sandbox.stub(addOrderTaskModule, 'default');
    this.constructorStub.returns(this.instanceStub);
  }

  public withExecuteReturning(order: Order): void {
    this.instanceStub.execute.returns(Promise.resolve(order));
  }

  public withExecuteThrowingError(message: string): void {
    this.instanceStub.execute.throws(new Error(message));
  }

  public expectExecuteWasCalledOnceWithOrderData(orderData: AddOrderData): void {
    expect(this.constructorStub.calledOnce).toBe(true);
    const call = this.constructorStub.getCall(0);
    expect(call.args[0]).toEqual(orderData);
    expect(this.instanceStub.execute.calledOnce).toBe(true);
  }
}