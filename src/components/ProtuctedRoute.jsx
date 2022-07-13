import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = (WrappedComponent) => {
  const user = useSelector((state) => state.user.currentUser);

  return (props) => {
    if (typeof window !== 'undefined') {
      const navigate = useNavigate();

      if (!user) {
        navigate('/login');
        return null;
      }

      return <WrappedComponent {...props} />;
    }

    return null;
  };
};

export default ProtectedRoute;