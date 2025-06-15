import type { ITestRepository } from '../../../domain/repositories/ITestRepository';
import type { TestEntity } from '../../../domain/entities/Test';

export class SaveTestProgressUseCase {
  constructor(private readonly testRepository: ITestRepository) {}

  async execute(test: TestEntity): Promise<void> {
    if (test.progress.isCompleted) {
      throw new Error('Cannot save progress for completed test');
    }

    await this.testRepository.saveProgress(test);
  }
}