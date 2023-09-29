import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ ifPrivate, redirect }) => {
  if (!ifPrivate) {
    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
};

ProtectedRoute.propTypes = {
  ifPrivate: PropTypes.bool.isRequired,
  redirect: PropTypes.string.isRequired,
};

export default ProtectedRoute;
