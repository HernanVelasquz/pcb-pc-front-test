import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card/Card';
import { FileQuestion, ArrowLeft, Home } from 'lucide-react';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <FileQuestion className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <CardTitle className="text-gray-600">Page Not Found</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              leftIcon={<ArrowLeft className="h-4 w-4" />}
              fullWidth
            >
              Go Back
            </Button>
            <Button
              onClick={() => navigate('/')}
              leftIcon={<Home className="h-4 w-4" />}
              fullWidth
            >
              Go Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}