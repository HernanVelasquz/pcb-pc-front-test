import { useState, useEffect, useCallback } from 'react';
import { TestEntity } from '../../domain/entities/Test';
import { Question } from '../../domain/entities/Question';
import { StartTestUseCase } from '../../application/use-cases/test/StartTestUseCase';
import { SaveTestProgressUseCase } from '../../application/use-cases/test/SaveTestProgressUseCase';
import { SubmitTestUseCase } from '../../application/use-cases/test/SubmitTestUseCase';
import { AnswerQuestionUseCase } from '../../application/use-cases/test/AnswerQuestionUseCase';
import { MockTestRepository } from '../../infrastructure/repositories/MockTestRepository';
import { TimerService } from '../../infrastructure/services/TimerService';

const testRepository = new MockTestRepository();
const timerService = new TimerService();

const startTestUseCase = new StartTestUseCase(testRepository);
const saveProgressUseCase = new SaveTestProgressUseCase(testRepository);
const submitTestUseCase = new SubmitTestUseCase(testRepository);
const answerQuestionUseCase = new AnswerQuestionUseCase();

export function useTestController(testId: string) {
  const [test, setTest] = useState<TestEntity | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize test
  useEffect(() => {
    let isMounted = true;

    const initializeTest = async () => {
      if (!testId) {
        setError('ID del test no válido');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Verificar si el test existe
        const testExists = await testRepository.exists(testId);
        if (!testExists) {
          throw new Error('El test no existe o no está disponible');
        }

        const testEntity = await startTestUseCase.execute(testId);
        const testQuestions = await testRepository.getQuestions(testId);
        
        if (!isMounted) return;

        if (!testEntity || !testQuestions.length) {
          throw new Error('No se pudo cargar el test correctamente');
        }

        setTest(testEntity);
        setQuestions(testQuestions);
        setCurrentQuestionIndex(testEntity.progress.currentQuestion);
        setTimeRemaining(testEntity.progress.timeRemaining);
        
        // Start timer
        timerService.start(
          testEntity.progress.timeRemaining,
          setTimeRemaining,
          () => {
            // Time expired - auto submit
            submitTest();
          }
        );
      } catch (err) {
        if (!isMounted) return;
        console.error('Error initializing test:', err);
        setError(err instanceof Error ? err.message : 'Error al cargar el test');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    initializeTest();

    return () => {
      isMounted = false;
      timerService.stop();
    };
  }, [testId]);

  const saveProgress = useCallback(async () => {
    if (!test) return;

    try {
      setSaving(true);
      const updatedTest = test.updateProgress(
        currentQuestionIndex,
        test.progress.responses,
        timeRemaining
      );
      await saveProgressUseCase.execute(updatedTest);
      setTest(updatedTest);
    } catch (err) {
      console.error('Error saving progress:', err);
    } finally {
      setSaving(false);
    }
  }, [test, currentQuestionIndex, timeRemaining]);

  const answerQuestion = useCallback((question: Question, answer: unknown) => {
    if (!test) return;

    try {
      const updatedTest = answerQuestionUseCase.execute(test, question, answer);
      setTest(updatedTest);
    } catch (err) {
      console.error('Error answering question:', err);
    }
  }, [test]);

  const submitTest = useCallback(async () => {
    if (!test) return;

    try {
      timerService.stop();
      await submitTestUseCase.execute(test);
    } catch (err) {
      console.error('Error submitting test:', err);
    }
  }, [test]);

  return {
    test,
    questions,
    currentQuestionIndex,
    timeRemaining,
    loading,
    saving,
    error,
    setCurrentQuestionIndex,
    saveProgress,
    answerQuestion,
    submitTest,
  };
}