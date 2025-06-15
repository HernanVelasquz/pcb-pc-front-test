import { useState, useEffect } from 'react';
import type { ImageQuestion } from '../../../../domain/entities/Question';
import { Button } from '../../../../shared/components/ui/Button/Button';
import { LoadingSpinner } from '../../../../shared/components/ui/LoadingSpinner/LoadingSpinner';

interface Props {
  question: ImageQuestion;
  onAnswer: (answer: string) => void;
  currentAnswer?: string;
  showFeedback?: boolean;
}

export function ImageQuestionComponent({
  question,
  onAnswer,
  currentAnswer,
  showFeedback = false,
}: Props) {
  const [selectedOption, setSelectedOption] = useState<string | undefined>(currentAnswer);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

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
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <LoadingSpinner />
          </div>
        )}
        <img
          src={question.imageUrl}
          alt="Pregunta"
          className={`h-full w-full object-contain transition-opacity duration-300 ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsImageLoaded(true)}
          onError={() => setIsImageLoaded(true)}
        />
      </div>

      <div className="space-y-4">
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
      </div>

      {showFeedback && selectedOption && (
        <div
          className={`mt-4 rounded-lg p-4 ${
            isCorrect
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {isCorrect ? '¡Respuesta correcta!' : 'Respuesta incorrecta'}
        </div>
      )}
    </div>
  );
}