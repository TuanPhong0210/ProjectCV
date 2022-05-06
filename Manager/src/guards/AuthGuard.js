import { Navigate, useLocation } from 'react-router-dom';

// hooks
import useAuth from '../hooks/useAuth';
// path
import { PATH_AUTHENTICATION } from '../routes/path';

const AuthGuard = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const { pathname } = useLocation();
    return isAuthenticated
        ? <>{children}</>
        : <Navigate
            to={PATH_AUTHENTICATION.login}
            state={{
                from: pathname
            }}
        />
};

export default AuthGuard;
