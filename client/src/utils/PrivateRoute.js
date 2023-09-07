
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
    return(

        localStorage.getItem('userToken') ? <Outlet /> : <Navigate to='/auth/signin' />
        
    );
}

export default PrivateRoute;