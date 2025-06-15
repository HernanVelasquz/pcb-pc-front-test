import type { ITestRepository } from '../../domain/repositories/ITestRepository';
import type { TestEntity, TestMetadata } from '../../domain/entities/Test';
import type { Question } from '../../domain/entities/Question';
import { testQuestions } from '../data/mockQuestions';

const mockTests: TestMetadata[] = [
  {
    id: '1',
    title: 'Mathematical Reasoning',
    description: 'Test your problem-solving abilities with advanced math concepts',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    difficulty: 'medium',
    duration: 60,
    totalQuestions: 30,
  },
  {
    id: '2',
    title: 'Critical Thinking',
    description: 'Evaluate arguments and make logical conclusions',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    difficulty: 'hard',
    duration: 90,
    totalQuestions: 40,
  },
  {
    id: '3',
    title: 'Reading Comprehension',
    description: 'Analyze and understand complex written materials',
    imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    difficulty: 'easy',
    duration: 45,
    totalQuestions: 20,
  },
];

export class MockTestRepository implements ITestRepository {
  private savedTests = new Map<string, TestEntity>();

  async getAvailableTests(): Promise<TestMetadata[]> {
    await this.delay(500);
    return [...mockTests];
  }

  async getTestById(id: string): Promise<TestEntity | null> {
    await this.delay(300);
    return this.savedTests.get(id) || null;
  }

  async getQuestions(testId: string): Promise<Question[]> {
    await this.delay(400);
    // In a real app, this would filter questions by testId
    return [...testQuestions];
  }

  async saveProgress(test: TestEntity): Promise<void> {
    await this.delay(200);
    this.savedTests.set(test.metadata.id, test);
  }

  async submitTest(test: TestEntity): Promise<void> {
    await this.delay(1000);
    this.savedTests.set(test.metadata.id, test);
    console.log('Test submitted:', test);
  }

  async exists(testId: string): Promise<boolean> {
    await this.delay(200);
    return mockTests.some(test => test.id === testId);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}