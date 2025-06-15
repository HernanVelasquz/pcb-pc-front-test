import { useState, useEffect } from 'react';
import type { MultiInputQuestion } from '../../../../domain/entities/Question';
import { Input } from '../../../../shared/components/ui/Input/Input';
import { LoadingSpinner } from '../../../../shared/components/ui/LoadingSpinner/LoadingSpinner';

interface Props {
  question: MultiInputQuestion;
  onAnswer: (answers: Record<string, string>) => void;
  currentAnswers?: Record<string, string>;
}

export function MultiInputQuestionComponent({
  question,
  onAnswer,
  currentAnswers = {},
}: Props) {
  const [answers, setAnswers] = useState<Record<string, string>>(currentAnswers);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    setAnswers(currentAnswers);
  }, [currentAnswers]);

  const handleInputChange = (fieldId: string, value: string) => {
    const newAnswers = { ...answers, [fieldId]: value };
    setAnswers(newAnswers);
    onAnswer(newAnswers);
  };

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
        <div className="grid gap-4">
          {question.fields.map((field) => (
            <Input
              key={field.id}
              label={field.label}
              placeholder={field.placeholder}
              value={answers[field.id] || ''}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              error={field.required && !answers[field.id] ? 'Este campo es requerido' : undefined}
              isRequired={field.required}
            />
          ))}
        </div>
      </div>
    </div>
  );
}