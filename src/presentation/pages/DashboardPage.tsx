import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useAsync } from '../../shared/hooks/useAsync';
import { GetAvailableTestsUseCase } from '../../application/use-cases/test/GetAvailableTestsUseCase';
import { MockTestRepository } from '../../infrastructure/repositories/MockTestRepository';
import { TestCard } from '../components/dashboard/TestCard';
import { Card, CardContent } from '../../shared/components/ui/Card/Card';
import { LoadingSpinner } from '../../shared/components/ui/LoadingSpinner/LoadingSpinner';
import { Button } from '../../shared/components/ui/Button/Button';
import { User } from 'lucide-react';

const testRepository = new MockTestRepository();
const getAvailableTestsUseCase = new GetAvailableTestsUseCase(testRepository);

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  
  const { data: tests, loading, error } = useAsync(
    () => getAvailableTestsUseCase.execute(),
    []
  );

  const handleStartTest = async (testId: string) => {
    try {
      console.log('Iniciando navegación al test:', testId);
      
      // Verificar si el test existe antes de navegar
      const testExists = await testRepository.exists(testId);
      console.log('¿El test existe?:', testExists);
      
      if (!testExists) {
        console.error('El test no existe:', testId);
        return;
      }

      // Navegar al test
      console.log('Navegando a:', `/test/${testId}`);
      navigate(`/test/${testId}`);
    } catch (error) {
      console.error('Error al iniciar el test:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="text-center">
            <p className="text-red-600 mb-4">{error.message}</p>
            <Button onClick={() => window.location.reload()}>
              Reintentar
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <User className="h-8 w-8 text-emerald-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Bienvenido, {user?.name}!
                </h1>
                <p className="text-gray-600">
                  Continúa tu aprendizaje con los exámenes disponibles
                </p>
              </div>
            </div>
            {/* <Button
              variant="outline"
              onClick={handleLogout}
              leftIcon={<LogOut className="h-4 w-4" />}
            >
              Cerrar Sesión
            </Button> */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Exámenes Disponibles
          </h2>
          <p className="text-gray-600">
            Selecciona un examen para comenzar o continuar donde lo dejaste
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests?.map((test) => (
            <TestCard
              key={test.id}
              test={test}
              onStart={handleStartTest}
            />
          ))}
        </div>

        {tests?.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-gray-500 mb-4">
                No hay exámenes disponibles en este momento
              </p>
              <Button onClick={() => window.location.reload()}>
                Actualizar
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};