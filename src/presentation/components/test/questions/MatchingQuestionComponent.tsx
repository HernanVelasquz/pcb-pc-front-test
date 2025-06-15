import { useState, useEffect } from 'react';
import type { MatchingQuestion } from '../../../../domain/entities/Question';
import { Button } from '../../../../shared/components/ui/Button/Button';
import { X } from 'lucide-react';

interface Props {
  question: MatchingQuestion;
  onAnswer: (pairs: Record<string, string>) => void;
  currentPairs?: Record<string, string>;
}

export function MatchingQuestionComponent({
  question,
  onAnswer,
  currentPairs = {},
}: Props) {
  const [pairs, setPairs] = useState<Record<string, string>>(currentPairs);
  const [selectedA, setSelectedA] = useState<string | null>(null);

  useEffect(() => {
    setPairs(currentPairs);
  }, [currentPairs]);

  const handleSelectA = (id: string) => {
    setSelectedA(selectedA === id ? null : id);
  };

  const handleSelectB = (id: string) => {
    if (!selectedA) return;

    // Remove any existing pairs for both items
    const newPairs = { ...pairs };
    Object.entries(newPairs).forEach(([key, value]) => {
      if (key === selectedA || value === id) {
        delete newPairs[key];
      }
    });

    // Add new pair
    newPairs[selectedA] = id;
    setPairs(newPairs);
    onAnswer(newPairs);
    setSelectedA(null);
  };

  const removePair = (idA: string) => {
    const newPairs = { ...pairs };
    delete newPairs[idA];
    setPairs(newPairs);
    onAnswer(newPairs);
  };

  const isItemAPaired = (id: string) => id in pairs;
  const isItemBPaired = (id: string) => Object.values(pairs).includes(id);

  return (
    <div className="space-y-6">
      <p className="text-lg font-medium text-gray-900">{question.text}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Column A */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-700">Columna A</h3>
          {question.columnA.map((item) => (
            <Button
              key={item.id}
              onClick={() => handleSelectA(item.id)}
              variant={
                selectedA === item.id
                  ? 'primary'
                  : isItemAPaired(item.id)
                  ? 'secondary'
                  : 'outline'
              }
              className="w-full justify-start text-left"
            >
              {item.text}
            </Button>
          ))}
        </div>

        {/* Column B */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-700">Columna B</h3>
          {question.columnB.map((item) => (
            <Button
              key={item.id}
              onClick={() => handleSelectB(item.id)}
              variant={
                isItemBPaired(item.id)
                  ? 'secondary'
                  : selectedA
                  ? 'outline'
                  : 'ghost'
              }
              disabled={isItemBPaired(item.id) && !selectedA}
              className="w-full justify-start text-left"
            >
              {item.text}
            </Button>
          ))}
        </div>
      </div>

      {/* Paired items display */}
      {Object.keys(pairs).length > 0 && (
        <div className="mt-8">
          <h3 className="mb-4 font-medium text-gray-700">
            Relaciones establecidas:
          </h3>
          <div className="space-y-2">
            {Object.entries(pairs).map(([idA, idB]) => (
              <div
                key={idA}
                className="flex items-center justify-between rounded-lg bg-gray-50 p-4"
              >
                <div className="flex items-center flex-1">
                  <span className="flex-1">
                    {question.columnA.find((item) => item.id === idA)?.text}
                  </span>
                  <span className="mx-4 text-gray-400">→</span>
                  <span className="flex-1">
                    {question.columnB.find((item) => item.id === idB)?.text}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removePair(idA)}
                  leftIcon={<X className="h-4 w-4" />}
                  className="ml-4 text-red-500 hover:text-red-700"
                >
                  <span className="sr-only">Eliminar relación</span>
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedA && (
        <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
          Seleccionaste "{question.columnA.find(item => item.id === selectedA)?.text}". 
          Ahora selecciona un elemento de la Columna B para crear la relación.
        </div>
      )}
    </div>
  );
}