import type { TestEntity } from '../../../domain/entities/Test';
import type { Question } from '../../../domain/entities/Question';
import { QuestionValidator } from '../../../domain/entities/Question';

export class AnswerQuestionUseCase {
  execute(test: TestEntity, question: Question, answer: unknown): TestEntity {
    if (!QuestionValidator.validateResponse(question, answer)) {
      throw new Error('Invalid answer format for question type');
    }

    return test.addResponse(question.id, answer);
  }
}