import { SinonSandbox, SinonStub, SinonStubbedInstance } from "sinon";
import * as deleteOrderTaskModule from "../../src/service-layer/tasks/DeleteOrderTask";
import Order from "../../src/domain-layer/entities/Order";
import expect from "expect";


export default class DeleteOrderTaskMock {
    private readonly instanceStub: SinonStubbedInstance<deleteOrderTaskModule.default>;
  
    private readonly constructorStub: SinonStub;
  
    public constructor(sandbox: SinonSandbox) {
      this.instanceStub = sandbox.createStubInstance(deleteOrderTaskModule.default);
      this.constructorStub = sandbox.stub(deleteOrderTaskModule, 'default');
      this.constructorStub.returns(this.instanceStub);
    }
  
    public withExecuteReturning(): void {
    this.instanceStub.execute();
    }
  
    public withExecuteThrowingError(message: string): void {
      this.instanceStub.execute.throws(new Error(message));
    }
  
    public expectExecuteWasCalledOnce(): void {
      expect(this.instanceStub.execute.calledOnce).toBe(true);
    }
  }
  