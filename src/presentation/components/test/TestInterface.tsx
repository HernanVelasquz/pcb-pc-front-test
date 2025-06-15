import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, AlertTriangle, Save, Clock } from 'lucide-react';

import { Button } from '../../../shared/components/ui/Button/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/components/ui/Card/Card';
import { Modal } from '../../../shared/components/ui/Modal/Modal';
import { ProgressBar } from '../../../shared/components/ui/ProgressBar/ProgressBar';
import { formatTime } from '../../../shared/utils/formatTime';
import { QuestionRenderer } from './QuestionRenderer';
import { useTestController } from '../../hooks/useTestController';

const WARNING_TIME = 300; // 5 minutes in seconds
const AUTO_SAVE_INTERVAL = 30000; // Auto-save every 30 seconds

export const TestInterface = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  const {
    test,
    questions,
    currentQuestionIndex,
    loading,
    error,
    saving,
    timeRemaining,
    setCurrentQuestionIndex,
    answerQuestion,
    saveProgress,
    submitTest,
  } = useTestController(id!);

  // Show warning when time is running low
  useEffect(() => {
    if (timeRemaining === WARNING_TIME) {
      setShowWarning(true);
    }
  }, [timeRemaining]);

  // Auto-save progress
  useEffect(() => {
    if (!test) return;

    const autoSaveTimer = setInterval(() => {
      saveProgress();
    }, AUTO_SAVE_INTERVAL);

    return () => clearInterval(autoSaveTimer);
  }, [test, saveProgress]);

  // Handle time expiration
  useEffect(() => {
    if (timeRemaining <= 0) {
      handleSubmit(true);
    }
  }, [timeRemaining]);

  const handleNext = useCallback(async () => {
    if (!questions || currentQuestionIndex >= questions.length - 1) return;
    await saveProgress();
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }, [questions, currentQuestionIndex, saveProgress, setCurrentQuestionIndex]);

  const handlePrevious = useCallback(async () => {
    if (currentQuestionIndex <= 0) return;
    await saveProgress();
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  }, [currentQuestionIndex, saveProgress, setCurrentQuestionIndex]);

  const handleSubmit = useCallback(async (isAutoSubmit = false) => {
    const message = isAutoSubmit 
      ? 'El tiempo ha terminado. Tu examen será enviado automáticamente.'
      : '¿Estás seguro de que deseas enviar el examen?';
    
    if (isAutoSubmit || window.confirm(message)) {
      await submitTest();
      navigate('/dashboard');
    }
  }, [submitTest, navigate]);

  const getCurrentResponse = useCallback(() => {
    if (!test || !questions) return undefined;
    const currentQuestion = questions[currentQuestionIndex];
    return test.progress.responses.get(currentQuestion.id);
  }, [test, questions, currentQuestionIndex]);

  const getProgress = useCallback(() => {
    if (!test) return 0;
    return (test.progress.responses.size / test.metadata.totalQuestions) * 100;
  }, [test]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent mx-auto mb-4" />
          <p className="text-gray-600">Cargando examen...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={() => navigate('/dashboard')}>
              Volver al Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!test || !questions) return null;

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Warning Modal */}
      <Modal
        isOpen={showWarning}
        onClose={() => setShowWarning(false)}
        title="¡Tiempo limitado!"
        size="sm"
      >
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
          <p className="text-gray-600 mb-6">
            Quedan menos de 5 minutos para completar el examen.
          </p>
          <Button onClick={() => setShowWarning(false)} fullWidth>
            Entendido
          </Button>
        </div>
      </Modal>

      {/* Submit Confirmation Modal */}
      <Modal
        isOpen={showSubmitConfirm}
        onClose={() => setShowSubmitConfirm(false)}
        title="Confirmar envío"
        size="sm"
      >
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            ¿Estás seguro de que deseas enviar el examen? Esta acción no se puede deshacer.
          </p>
          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={() => setShowSubmitConfirm(false)}
              fullWidth
            >
              Cancelar
            </Button>
            <Button
              onClick={() => handleSubmit(false)}
              fullWidth
            >
              Enviar examen
            </Button>
          </div>
        </div>
      </Modal>

      <div className="container mx-auto max-w-4xl py-8 px-4">
        {/* Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>
                  Pregunta {currentQuestionIndex + 1} de {questions.length}
                </CardTitle>
                <div className="flex items-center mt-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  Tiempo restante: {formatTime(timeRemaining)}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={saveProgress}
                  disabled={saving}
                  leftIcon={<Save className="h-4 w-4" />}
                >
                  {saving ? 'Guardando...' : 'Guardar'}
                </Button>
                <Button
                  onClick={() => setShowSubmitConfirm(true)}
                  size="sm"
                  variant="destructive"
                >
                  Finalizar examen
                </Button>
              </div>
            </div>
            <div className="mt-4">
              <ProgressBar
                value={getProgress()}
                showLabel
                className="w-full"
              />
            </div>
          </CardHeader>
        </Card>

        {/* Question */}
        <Card className="mb-8">
          <CardContent>
            <QuestionRenderer
              question={currentQuestion}
              onAnswer={(answer) => answerQuestion(currentQuestion, answer)}
              currentResponse={getCurrentResponse()}
            />
          </CardContent>
        </Card>

        {/* Navigation */}
        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <Button
                onClick={handlePrevious}
                disabled={isFirstQuestion}
                variant="outline"
                leftIcon={<ChevronLeft className="h-4 w-4" />}
              >
                Anterior
              </Button>

              {/* Progress indicators */}
              <div className="flex items-center space-x-2">
                {questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestionIndex(index)}
                    className={`h-3 w-3 rounded-full transition-colors ${
                      index === currentQuestionIndex
                        ? 'bg-emerald-600'
                        : test.progress.responses.has(questions[index].id)
                        ? 'bg-emerald-200'
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={handleNext}
                disabled={isLastQuestion}
                rightIcon={<ChevronRight className="h-4 w-4" />}
              >
                Siguiente
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}