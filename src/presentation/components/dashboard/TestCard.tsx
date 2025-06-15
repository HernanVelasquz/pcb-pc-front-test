import { Clock, Users, BarChart3 } from 'lucide-react';
import { Button } from '../../../shared/components/ui/Button/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/components/ui/Card/Card';
import { ProgressBar } from '../../../shared/components/ui/ProgressBar/ProgressBar';
import type { TestMetadata } from '../../../domain/entities/Test';

interface Props {
  test: TestMetadata;
  progress?: number;
  onStart: (testId: string) => void;
}

export function TestCard({ test, progress = 0, onStart }: Props) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={test.imageUrl}
          alt={test.title}
          className="h-full w-full object-cover"
        />
      </div>
      
      <CardHeader>
        <CardTitle className="line-clamp-2">{test.title}</CardTitle>
        <p className="text-sm text-gray-600 line-clamp-3">{test.description}</p>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getDifficultyColor(
                  test.difficulty
                )}`}
              >
                {test.difficulty}
              </span>
              
              <div className="flex items-center text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                {test.duration} min
              </div>
              
              <div className="flex items-center text-gray-500">
                <BarChart3 className="h-4 w-4 mr-1" />
                {test.totalQuestions} preguntas
              </div>
            </div>
          </div>

          {progress > 0 && (
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">Progreso</span>
                <span className="font-medium">{Math.round(progress)}%</span>
              </div>
              <ProgressBar value={progress} />
            </div>
          )}

          <Button
            onClick={() => onStart(test.id)}
            fullWidth
            className="mt-4"
          >
            {progress > 0 ? 'Continuar' : 'Comenzar'} Test
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}