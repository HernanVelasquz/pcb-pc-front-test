import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { DynamicRouter } from './shared/components/routing/DynamicRouter';
import { useRouteConfig } from './shared/hooks/useRouteConfig';
import { NotFoundPage } from './shared/components/pages/NotFoundPage';

function App() {
  const routes = useRouteConfig();

  return (
    <Router>
      <DynamicRouter 
        routes={routes} 
        fallbackComponent={NotFoundPage}
      />
    </Router>
  );
}

export default App;