import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import PublicLayout from './layouts/PublicLayout';
import PrivateLayout from './layouts/PrivateLayout';
import AuthLayout from './layouts/AuthLayout';
import { authRoutes, publicRoutes } from './public_routes';
import { privateRoutes } from './private_routes';
import { HOME } from '@/constants/app_urls';
import SimpleLoader from '@/components/ui/SimpleLoader';
import PrivateRoute from './PrivateRoute';
import { ScrollToTop } from '@/components/common/ScrollToTop';

const AllRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<SimpleLoader />}>
        <ScrollToTop />
        <Routes>
          {/* Public marketing layout */}
          <Route element={<PublicLayout />}>
            {publicRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Route>

          {/* Auth layout (no header/footer) */}
          <Route element={<AuthLayout />}>
            {authRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Route>

          {/* Private/protected layout */}
          <Route element={<PrivateLayout />}>
            {privateRoutes.map(({ path, element, 
            // roles
           }) => (
              <Route
                key={path}
                path={path}
                element={<PrivateRoute 
                  // roles={roles}
                  >{element}</PrivateRoute>}
              />
            ))}
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to={HOME} />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AllRoutes;
