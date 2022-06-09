import { SinonSandbox, SinonStub, SinonStubbedInstance } from "sinon";
import * as findOrderTaskModule from "../../../../src/service-layer/tasks/FindOrderTaks"
import Order from "../../../../src/domain-layer/entities/Order";
import expect from "expect";

export default class FindOrderTaskMock {
    private readonly instanceStub: SinonStubbedInstance<findOrderTaskModule.default>;

    private readonly constructorStub: SinonStub;

    public constructor (sandbox: SinonSandbox){
        this.instanceStub = sandbox.createStubInstance(findOrderTaskModule.default);
        this.constructorStub = sandbox.stub(findOrderTaskModule, 'default');
        this.constructorStub.returns(this.instanceStub);
    }

    public withExecuteReturning(order: Order): void{
        this.instanceStub.execute.returns(Promise.resolve(order));
    }

    public withExecuteThrowingNotFoundError(): void{
        this.instanceStub.execute.throws(new Error('Order not found.'))
    }

    public withExecuteThrowingError(message: string): void{
        this.instanceStub.execute.throws(new Error(message));
    }

    public expectExecuteWasCalledOnceForOrder(orderId: number): void {
        expect(this.constructorStub.calledOnce).toBe(true);
        const call = this.constructorStub.getCall(0);
        expect(call.args[0]).toBe(orderId);
        expect(this.instanceStub.execute.calledOnce).toBe(true);
      }
}