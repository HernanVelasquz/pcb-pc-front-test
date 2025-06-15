import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card/Card';
import { Shield, ArrowLeft, Home } from 'lucide-react';

export function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <CardTitle className="text-red-600">Access Denied</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            You don't have permission to access this page. Please contact your administrator if you believe this is an error.
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