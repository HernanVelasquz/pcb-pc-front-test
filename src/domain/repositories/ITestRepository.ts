import type { TestEntity, TestMetadata } from '../entities/Test';
import type { Question } from '../entities/Question';

export interface ITestRepository {
  getAvailableTests(): Promise<TestMetadata[]>;
  getTestById(id: string): Promise<TestEntity | null>;
  getQuestions(testId: string): Promise<Question[]>;
  saveProgress(test: TestEntity): Promise<void>;
  submitTest(test: TestEntity): Promise<void>;
  exists(testId: string): Promise<boolean>;
}