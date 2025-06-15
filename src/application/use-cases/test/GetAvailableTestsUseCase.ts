import type { ITestRepository } from '../../../domain/repositories/ITestRepository';
import type { TestMetadata } from '../../../domain/entities/Test';

export class GetAvailableTestsUseCase {
  constructor(private readonly testRepository: ITestRepository) {}

  async execute(): Promise<TestMetadata[]> {
    return await this.testRepository.getAvailableTests();
  }
}