import type { Question } from '../../../domain/entities/Question';
import { ImageQuestionComponent } from './questions/ImageQuestionComponent';
import { MultiInputQuestionComponent } from './questions/MultiInputQuestionComponent';
import { MultipleChoiceQuestionComponent } from './questions/MultipleChoiceQuestionComponent';
import { MatchingQuestionComponent } from './questions/MatchingQuestionComponent';

interface Props {
  question: Question;
  onAnswer: (answer: unknown) => void;
  currentResponse?: { answer: unknown };
  showFeedback?: boolean;
}

export function QuestionRenderer({
  question,
  onAnswer,
  currentResponse,
  showFeedback = false,
}: Props) {
  switch (question.type) {
    case 'image':
      return (
        <ImageQuestionComponent
          question={question}
          onAnswer={onAnswer}
          currentAnswer={currentResponse?.answer as string}
          showFeedback={showFeedback}
        />
      );

    case 'multiInput':
      return (
        <MultiInputQuestionComponent
          question={question}
          onAnswer={onAnswer}
          currentAnswers={currentResponse?.answer as Record<string, string>}
        />
      );

    case 'multipleChoice':
      return (
        <MultipleChoiceQuestionComponent
          question={question}
          onAnswer={onAnswer}
          currentAnswer={currentResponse?.answer as string}
          showFeedback={showFeedback}
        />
      );

    case 'matching':
      return (
        <MatchingQuestionComponent
          question={question}
          onAnswer={onAnswer}
          currentPairs={currentResponse?.answer as Record<string, string>}
        />
      );

    default:
      return (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
          Tipo de pregunta no soportado: {(question as any).type}
        </div>
      );
  }
}