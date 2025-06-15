import type { Question } from '../../domain/entities/Question';

export const testQuestions: Question[] = [
  {
    id: '1',
    type: 'image',
    text: 'Observa la siguiente imagen y selecciona la opción que mejor describe la situación.',
    required: true,
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb',
    options: [
      'Un triángulo isósceles',
      'Un triángulo rectángulo',
      'Un triángulo equilátero',
      'Un triángulo escaleno',
      'Un triángulo obtusángulo'
    ],
    correctAnswer: 'Un triángulo rectángulo'
  },
  {
    id: '2',
    type: 'multiInput',
    text: 'Analiza la imagen y completa los siguientes campos.',
    required: true,
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
    fields: [
      {
        id: 'field1',
        label: 'Describe la forma geométrica principal',
        placeholder: 'Ingresa tu respuesta',
        required: true
      },
      {
        id: 'field2',
        label: 'Identifica los ángulos visibles',
        placeholder: 'Ingresa tu respuesta',
        required: true
      },
      {
        id: 'field3',
        label: 'Observaciones adicionales',
        placeholder: 'Opcional',
        required: false
      }
    ]
  },
  {
    id: '3',
    type: 'multipleChoice',
    text: '¿Cuál es el resultado de la siguiente operación: (3 × 4) + (5 × 2)?',
    required: true,
    options: ['22', '26', '24', '28', '20'],
    correctAnswer: '22',
    feedback: {
      correct: '¡Correcto! Has calculado bien la operación.',
      incorrect: 'Revisa el orden de las operaciones y vuelve a intentarlo.'
    }
  },
  {
    id: '4',
    type: 'matching',
    text: 'Relaciona cada concepto con su definición correcta.',
    required: true,
    columnA: [
      { id: 'a1', text: 'Perímetro' },
      { id: 'a2', text: 'Área' },
      { id: 'a3', text: 'Volumen' }
    ],
    columnB: [
      { id: 'b1', text: 'Suma de todos los lados' },
      { id: 'b2', text: 'Espacio que ocupa un cuerpo' },
      { id: 'b3', text: 'Superficie que ocupa una figura' }
    ],
    correctPairs: {
      a1: 'b1',
      a2: 'b3',
      a3: 'b2'
    }
  }
];