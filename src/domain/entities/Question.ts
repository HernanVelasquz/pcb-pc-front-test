export type QuestionType = 'image' | 'multiInput' | 'multipleChoice' | 'matching';

export interface BaseQuestion {
  readonly id: string;
  readonly type: QuestionType;
  readonly text: string;
  readonly required: boolean;
}

export interface ImageQuestion extends BaseQuestion {
  readonly type: 'image';
  readonly imageUrl: string;
  readonly options: readonly string[];
  readonly correctAnswer?: string;
}

export interface MultiInputQuestion extends BaseQuestion {
  readonly type: 'multiInput';
  readonly imageUrl: string;
  readonly fields: readonly InputField[];
}

export interface InputField {
  readonly id: string;
  readonly label: string;
  readonly placeholder: string;
  readonly required: boolean;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  readonly type: 'multipleChoice';
  readonly options: readonly string[];
  readonly correctAnswer?: string;
  readonly feedback?: QuestionFeedback;
}

export interface QuestionFeedback {
  readonly correct: string;
  readonly incorrect: string;
}

export interface MatchingQuestion extends BaseQuestion {
  readonly type: 'matching';
  readonly columnA: readonly MatchingItem[];
  readonly columnB: readonly MatchingItem[];
  readonly correctPairs?: Record<string, string>;
}

export interface MatchingItem {
  readonly id: string;
  readonly text: string;
}

export type Question = 
  | ImageQuestion 
  | MultiInputQuestion 
  | MultipleChoiceQuestion 
  | MatchingQuestion;

export class QuestionValidator {
  static validateResponse(question: Question, answer: unknown): boolean {
    switch (question.type) {
      case 'image':
      case 'multipleChoice':
        return typeof answer === 'string' && answer.length > 0;
      
      case 'multiInput':
        if (typeof answer !== 'object' || answer === null) return false;
        const answers = answer as Record<string, string>;
        return question.fields
          .filter(field => field.required)
          .every(field => answers[field.id]?.trim().length > 0);
      
      case 'matching':
        if (typeof answer !== 'object' || answer === null) return false;
        const pairs = answer as Record<string, string>;
        return question.columnA.length === Object.keys(pairs).length;
      
      default:
        return false;
    }
  }

  static isCorrect(question: Question, answer: unknown): boolean {
    switch (question.type) {
      case 'image':
      case 'multipleChoice':
        return question.correctAnswer === answer;
      
      case 'matching':
        if (!question.correctPairs || typeof answer !== 'object') return false;
        const pairs = answer as Record<string, string>;
        return Object.entries(question.correctPairs)
          .every(([key, value]) => pairs[key] === value);
      
      default:
        return true; // For multiInput, we don't have automatic validation
    }
  }
}