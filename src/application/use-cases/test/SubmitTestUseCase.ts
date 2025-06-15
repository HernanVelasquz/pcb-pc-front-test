import type { ITestRepository } from '../../../domain/repositories/ITestRepository';
import type { TestEntity } from '../../../domain/entities/Test';

export class SubmitTestUseCase {
  constructor(private readonly testRepository: ITestRepository) {}

  async execute(test: TestEntity): Promise<void> {
    const completedTest = test.complete();
    await this.testRepository.submitTest(completedTest);
  }
}