export interface TestMetadata {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly imageUrl: string;
  readonly difficulty: 'easy' | 'medium' | 'hard';
  readonly duration: number; // in minutes
  readonly totalQuestions: number;
}

export interface TestProgress {
  readonly testId: string;
  readonly currentQuestion: number;
  readonly responses: Map<string, QuestionResponse>;
  readonly timeRemaining: number;
  readonly lastSaved: Date;
  readonly isCompleted: boolean;
}

export interface QuestionResponse {
  readonly questionId: string;
  readonly answer: unknown;
  readonly timestamp: Date;
}

export class TestEntity {
  constructor(
    public readonly metadata: TestMetadata,
    public readonly progress: TestProgress
  ) {}

  static create(metadata: TestMetadata): TestEntity {
    const progress: TestProgress = {
      testId: metadata.id,
      currentQuestion: 0,
      responses: new Map(),
      timeRemaining: metadata.duration * 60, // Convert to seconds
      lastSaved: new Date(),
      isCompleted: false
    };

    return new TestEntity(metadata, progress);
  }

  updateProgress(
    currentQuestion: number,
    responses: Map<string, QuestionResponse>,
    timeRemaining: number
  ): TestEntity {
    const updatedProgress: TestProgress = {
      ...this.progress,
      currentQuestion,
      responses,
      timeRemaining,
      lastSaved: new Date()
    };

    return new TestEntity(this.metadata, updatedProgress);
  }

  addResponse(questionId: string, answer: unknown): TestEntity {
    const response: QuestionResponse = {
      questionId,
      answer,
      timestamp: new Date()
    };

    const newResponses = new Map(this.progress.responses);
    newResponses.set(questionId, response);

    return this.updateProgress(
      this.progress.currentQuestion,
      newResponses,
      this.progress.timeRemaining
    );
  }

  complete(): TestEntity {
    const completedProgress: TestProgress = {
      ...this.progress,
      isCompleted: true,
      lastSaved: new Date()
    };

    return new TestEntity(this.metadata, completedProgress);
  }

  getCompletionPercentage(): number {
    return (this.progress.responses.size / this.metadata.totalQuestions) * 100;
  }

  isTimeExpired(): boolean {
    return this.progress.timeRemaining <= 0;
  }

  shouldShowWarning(): boolean {
    return this.progress.timeRemaining <= 300; // 5 minutes
  }
}