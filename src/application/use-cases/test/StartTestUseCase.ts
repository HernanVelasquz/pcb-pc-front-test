import type { ITestRepository } from '../../../domain/repositories/ITestRepository';
import { TestEntity } from '../../../domain/entities/Test';

export class StartTestUseCase {
  constructor(private readonly testRepository: ITestRepository) {}

  async execute(testId: string): Promise<TestEntity> {
    const existingTest = await this.testRepository.getTestById(testId);
    
    if (existingTest && !existingTest.progress.isCompleted) {
      return existingTest;
    }

    // Create new test if none exists or previous was completed
    const availableTests = await this.testRepository.getAvailableTests();
    const testMetadata = availableTests.find(test => test.id === testId);
    
    if (!testMetadata) {
      throw new Error(`Test with id ${testId} not found`);
    }

    return TestEntity.create(testMetadata);
  }
}