import { useState, useEffect } from 'react';
import type { MultipleChoiceQuestion } from '../../../../domain/entities/Question';
import { Button } from '../../../../shared/components/ui/Button/Button';

interface Props {
  question: MultipleChoiceQuestion;
  onAnswer: (answer: string) => void;
  currentAnswer?: string;
  showFeedback?: boolean;
}

export function MultipleChoiceQuestionComponent({
  question,
  onAnswer,
  currentAnswer,
  showFeedback = false,
}: Props) {
  const [selectedOption, setSelectedOption] = useState<string | undefined>(currentAnswer);

  useEffect(() => {
    setSelectedOption(currentAnswer);
  }, [currentAnswer]);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    onAnswer(option);
  };

  const isCorrect = showFeedback && selectedOption === question.correctAnswer;

  return (
    <div className="space-y-6">
      <p className="text-lg font-medium text-gray-900">{question.text}</p>

      <div className="grid gap-3">
        {question.options.map((option, index) => (
          <Button
            key={index}
            variant={selectedOption === option ? 'primary' : 'outline'}
            className={`justify-start text-left ${
              showFeedback &&
              option === question.correctAnswer &&
              'bg-green-100 text-green-800 hover:bg-green-200'
            }`}
            onClick={() => handleOptionSelect(option)}
          >
            <span className="mr-3 font-semibold">
              {String.fromCharCode(65 + index)}.
            </span>
            {option}
          </Button>
        ))}
      </div>

      {showFeedback && selectedOption && question.feedback && (
        <div
          className={`mt-4 rounded-lg p-4 ${
            isCorrect
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {isCorrect
            ? question.feedback.correct
            : question.feedback.incorrect}
        </div>
      )}
    </div>
  );
}